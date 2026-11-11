import Link from "next/link";

export function PreviewBanner() {
  return (
    <div className="bg-[#141B29] px-5 py-2.5 text-center text-[0.8125rem] leading-normal text-[#D9D3C4] sm:text-small">
      <span className="sm:hidden">
        Early preview &mdash; content is still being verified.
      </span>
      <span className="hidden sm:inline">
        Early preview &mdash; content is still being gathered and verified.
      </span>{" "}
      <Link
        href="/#support"
        className="font-medium text-[#E3C17F] underline underline-offset-2 hover:text-[#F0D6A0]"
      >
        <span className="sm:hidden">Suggest a correction</span>
        <span className="hidden sm:inline">
          Spot an error? Suggest a correction
        </span>
      </Link>
    </div>
  );
}
