import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Colours from the homepage design: each label's text passes 4.5:1 contrast
// on its own tinted background, and colour is never the only signal (the
// label is always spelled out).
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  verified: {
    label: "Verified",
    className: "border-[#BCCBB8] bg-[#E9EEE4] text-[#3D5C3E]",
  },
  multipleSources: {
    label: "Multiple Sources",
    className: "border-[#BCCBB8] bg-[#E9EEE4] text-[#3D5C3E]",
  },
  singleSource: {
    label: "Single Source",
    className: "border-[#DCC59A] bg-[#F4EBD6] text-[#6E5128]",
  },
  oralTradition: {
    label: "Oral Tradition",
    className: "border-[#CDB79A] bg-[#EFE6DA] text-[#6E5128]",
  },
  underReview: {
    label: "Under Review",
    className: "border-[#CFCBC0] bg-[#EDEAE2] text-[#55554E]",
  },
  disputed: {
    label: "Disputed",
    className: "border-[#E2B6AC] bg-[#F6E4DF] text-[#8E2F22]",
  },
};

export function verificationLabel(status?: string) {
  return status ? STATUS_CONFIG[status]?.label : undefined;
}

export function VerificationBadge({ status }: { status?: string }) {
  const config = status ? STATUS_CONFIG[status] : undefined;
  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto rounded-full px-2.5 py-1 text-[0.6875rem] leading-[1.3] font-medium tracking-label uppercase",
        config.className
      )}
    >
      {config.label}
    </Badge>
  );
}
