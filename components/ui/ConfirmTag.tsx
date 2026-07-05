/**
 * Visible placeholder marker for every business fact the client has not yet
 * confirmed. Deliberately untranslated and loud — it must be impossible to
 * publish a page that still contains one. Grep for "CONFIRM WITH CLIENT".
 */
export function ConfirmTag() {
  return (
    <span className="mx-1 inline-block whitespace-nowrap rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.5 align-middle font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-900">
      [confirm with client]
    </span>
  );
}
