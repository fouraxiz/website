import { getSession } from "@/lib/auth/session";
import { Editable, type EditAction } from "./Editable";

/**
 * Server wrapper: for signed-in editors, makes its children editable from the
 * page. For everyone else it renders the children unchanged (no extra JS).
 */
export async function Edit({ actions, children, className, inline }: { actions: EditAction[]; children: React.ReactNode; className?: string; inline?: boolean }) {
  const session = await getSession();
  if (!session) return <>{children}</>;
  return (
    <Editable actions={actions} className={className} inline={inline}>
      {children}
    </Editable>
  );
}
