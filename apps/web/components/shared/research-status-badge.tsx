import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  comingSoon: {
    label: "Coming Soon",
    className: "border-riverstone/30 bg-riverstone/10 text-riverstone",
  },
  underResearch: {
    label: "Under Research",
    className: "border-palm-gold/40 bg-palm-gold/10 text-bronze-heritage",
  },
  verified: {
    label: "Verified",
    className: "border-cassava-leaf/30 bg-cassava-leaf/10 text-cassava-leaf",
  },
};

export function ResearchStatusBadge({ status }: { status?: string }) {
  const config = status ? STATUS_CONFIG[status] : undefined;
  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto gap-1.5 px-2.5 py-1 text-caption tracking-label uppercase",
        config.className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "comingSoon" && "bg-riverstone",
          status === "underResearch" && "bg-palm-gold",
          status === "verified" && "bg-cassava-leaf"
        )}
      />
      {config.label}
    </Badge>
  );
}
