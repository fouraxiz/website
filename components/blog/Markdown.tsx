import { Fragment } from "react";

/**
 * Minimal, safe Markdown renderer. Produces React elements only (no raw HTML),
 * so editor content can never inject scripts. Supports headings, paragraphs,
 * lists, quotes, code blocks, rules, images, links, bold, italic and code.
 */

const safeUrl = (u: string) => (/^(https?:\/\/|\/|#|mailto:)/i.test(u.trim()) ? u.trim() : "#");

function inline(text: string, key = "i"): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(!\[([^\]]*)\]\(([^)\s]+)\))|(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[1]) {
      // eslint-disable-next-line @next/next/no-img-element
      out.push(<img key={k} src={safeUrl(m[3])} alt={m[2]} className="my-6 w-full rounded-xl" loading="lazy" />);
    } else if (m[4]) {
      const href = safeUrl(m[6]);
      const external = /^https?:/i.test(href);
      out.push(
        <a key={k} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inline(m[5], k)}
        </a>,
      );
    } else if (m[7]) out.push(<strong key={k}>{inline(m[8], k)}</strong>);
    else if (m[9]) out.push(<em key={k}>{inline(m[10], k)}</em>);
    else if (m[11]) out.push(<code key={k} className="rounded bg-ink-100 px-1.5 py-0.5 text-[0.9em]">{m[12]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let k = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const key = `b${k++}`;
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key} className="overflow-x-auto rounded-xl bg-ink-950 p-4 text-sm text-ink-100">
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = Math.min(h[1].length + 1, 5);
      const Tag = `h${level}` as "h2";
      blocks.push(<Tag key={key}>{inline(h[2], key)}</Tag>);
      i++;
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={key} />);
      i++;
      continue;
    }
    if (line.startsWith(">")) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) q.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push(<blockquote key={key}>{inline(q.join(" "), key)}</blockquote>);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/).test(lines[i])) items.push(lines[i++].replace(/^\s*([-*]|\d+\.)\s+/, ""));
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List key={key}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${key}-${j}`)}</li>
          ))}
        </List>,
      );
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\s*[-*]\s+|\s*\d+\.\s+)/.test(lines[i])) para.push(lines[i++]);
    blocks.push(<p key={key}>{inline(para.join(" "), key)}</p>);
  }
  return <div className={className ?? "article-body"}>{blocks.map((b, j) => <Fragment key={j}>{b}</Fragment>)}</div>;
}
