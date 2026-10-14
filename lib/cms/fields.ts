/**
 * Field definitions drive both validation and the auto-generated edit forms.
 * Shared by server (validation) and client (forms) — keep this file free of
 * server-only imports.
 */
export type ScalarFieldType = "text" | "textarea" | "richtext" | "url" | "image" | "icon" | "number" | "boolean" | "date" | "color";

export type Field =
  | { name: string; label: string; type: ScalarFieldType; required?: boolean; help?: string; placeholder?: string }
  | { name: string; label: string; type: "select"; options: { value: string; label: string }[]; required?: boolean; help?: string }
  | { name: string; label: string; type: "strings"; help?: string; placeholder?: string }
  | { name: string; label: string; type: "list"; fields: Field[]; itemLabel?: string; help?: string };

export interface CollectionDef {
  name: string;
  label: string;
  singular: string;
  /** `single` = one fixed entry (e.g. site settings); `list` = many entries. */
  kind: "list" | "single";
  /** Field used as the item's display title in lists. */
  titleField: string;
  /** Field the URL slug is generated from for new items. */
  slugField?: string;
  /** Whether items have their own public page (slug matters). */
  routable?: boolean;
  fields: Field[];
  description?: string;
  /** Fixed set of entries: editors can edit and reorder, but not add or delete. */
  fixed?: boolean;
  /** Public URL of an item, for "View page" links. */
  pathPrefix?: string;
}

export const ICON_OPTIONS = [
  "boxes", "brain", "code", "globe", "smartphone", "workflow", "shopping-cart", "calculator", "users", "wallet", "kanban",
  "scan-barcode", "package", "truck", "monitor-cog", "shopping-bag", "badge-check", "id-card", "shield-check", "stethoscope",
  "bar-chart", "palette", "plug", "cloud", "test-tube", "life-buoy", "graduation-cap", "heart-handshake", "landmark", "factory",
  "briefcase", "file-text", "message-square", "trending-up", "sparkles", "lock", "headset", "search", "compass", "pen-tool",
  "rocket", "layers",
] as const;

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Empty value for a field, used when adding new items. */
export function emptyValue(f: Field): unknown {
  switch (f.type) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "strings":
    case "list":
      return [];
    case "select":
      return f.options[0]?.value ?? "";
    default:
      return "";
  }
}

export function emptyRecord(fields: Field[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)]));
}

/**
 * Validates and normalises a record against field definitions.
 * Returns cleaned data plus a map of errors keyed by field path.
 */
export function validateRecord(fields: Field[], input: Record<string, unknown>, path = ""): { data: Record<string, unknown>; errors: Record<string, string> } {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const key = path ? `${path}.${f.name}` : f.name;
    const v = input?.[f.name];
    switch (f.type) {
      case "boolean":
        data[f.name] = Boolean(v);
        break;
      case "number": {
        const n = v === "" || v === null || v === undefined ? null : Number(v);
        if (n !== null && Number.isNaN(n)) errors[key] = "Must be a number";
        data[f.name] = n;
        break;
      }
      case "strings":
        data[f.name] = Array.isArray(v) ? v.map((s) => String(s ?? "").trim()).filter(Boolean) : [];
        break;
      case "list": {
        const arr = Array.isArray(v) ? v : [];
        data[f.name] = arr.map((row, i) => {
          const r = validateRecord(f.fields, (row ?? {}) as Record<string, unknown>, `${key}.${i}`);
          Object.assign(errors, r.errors);
          return r.data;
        });
        break;
      }
      case "select": {
        const s = v === null || v === undefined ? "" : String(v);
        if (s && !f.options.some((o) => o.value === s)) errors[key] = "Invalid option";
        data[f.name] = s;
        break;
      }
      default: {
        const s = v === null || v === undefined ? "" : String(v);
        if (s.length > 50000) errors[key] = "Too long";
        if (f.type === "url" && s && !/^(https?:\/\/|\/|mailto:|tel:|#)/.test(s)) errors[key] = "Use a full URL (https://…) or a site path (/…)";
        data[f.name] = s.trim() === "" ? null : s;
      }
    }
    if ("required" in f && f.required) {
      const val = data[f.name];
      if (val === null || val === "" || (Array.isArray(val) && val.length === 0)) errors[key] = `${f.label} is required`;
    }
  }
  return { data, errors };
}
