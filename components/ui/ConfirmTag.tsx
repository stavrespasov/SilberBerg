/**
 * Visible placeholder marker for every business fact the client has not yet
 * confirmed. Deliberately untranslated and loud — it must be impossible to
 * publish a page that still contains one. Grep for "CONFIRM WITH CLIENT".
 */
export function ConfirmTag() {
  return (
    <span className="mx-1 inline-block whitespace-nowrap border border-amber-500/60 bg-amber-500/10 px-1.5 py-0.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-600">
      [confirm with client]
    </span>
  );
}
