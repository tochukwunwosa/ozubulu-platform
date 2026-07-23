import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  verified: {
    label: "Verified",
    className: "border-cassava-leaf/30 bg-cassava-leaf/10 text-cassava-leaf",
  },
  multipleSources: {
    label: "Multiple Sources",
    className: "border-cassava-leaf/30 bg-cassava-leaf/10 text-cassava-leaf",
  },
  singleSource: {
    label: "Single Source",
    className: "border-palm-gold/40 bg-palm-gold/10 text-bronze-heritage",
  },
  oralTradition: {
    label: "Oral Tradition",
    className:
      "border-bronze-heritage/30 bg-bronze-heritage/10 text-bronze-heritage",
  },
  underReview: {
    label: "Under Review",
    className: "border-riverstone/30 bg-riverstone/10 text-riverstone",
  },
  disputed: {
    label: "Disputed",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
};

export function VerificationBadge({ status }: { status?: string }) {
  const config = status ? STATUS_CONFIG[status] : undefined;
  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto px-2.5 py-1 text-caption tracking-label uppercase",
        config.className
      )}
    >
      {config.label}
    </Badge>
  );
}
