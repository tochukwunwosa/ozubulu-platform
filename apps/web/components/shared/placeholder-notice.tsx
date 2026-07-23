export function PlaceholderNotice({
  subject,
  label = "This section",
}: {
  subject?: string;
  label?: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-small text-muted-foreground">
      <p>
        {label} {subject ? `for ${subject} ` : ""}is currently being researched
        in collaboration with community elders and historical sources.
      </p>
      <p className="mt-1">
        If you have verified information, photographs, or historical records to
        contribute, we welcome your help.
      </p>
    </div>
  );
}
