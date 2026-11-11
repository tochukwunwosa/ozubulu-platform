import {
  Portrait,
  honorificFor,
  splitTitle,
} from "@/components/sections/leadership-card";
import type { HomeInstitution } from "@/lib/sanity/types";

const LINE = "bg-[#B08A3E]";

// Family-tree chart of the council: the paramount ruler on top, a solid
// stem down to a bar, and one drop to each Obi. Lines are drawn with
// pseudo-elements so each drop lands on the centre of its card; on phones
// the lines hide and the cards stack.
export function CouncilChart({
  institution,
}: {
  institution: HomeInstitution;
}) {
  const entries = institution.leadership;
  if (entries.length === 0) return null;

  const paramountIndex = Math.max(
    0,
    entries.findIndex((entry) => /igwe/i.test(entry.title))
  );
  const paramount = entries[paramountIndex];
  const others = entries.filter((_, index) => index !== paramountIndex);

  return (
    <figure
      aria-label={`How the ${institution.name} is formed`}
      className="group flex flex-col rounded-[18px] bg-uli-ink p-[clamp(24px,3.5vw,44px)] text-linen-white"
    >
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <p className="text-caption font-medium tracking-label text-[#E3C17F] uppercase">
          How the council is formed
        </p>
        <p className="text-[0.8125rem] text-[#B9B3A6]">
          {entries.length} members
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-2 rounded-2xl border-[1.5px] border-palm-gold bg-palm-gold/12 px-6 pt-5.5 pb-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <Portrait entry={paramount} large />
        <span className="mt-1 font-serif text-[1.5rem] leading-[1.15] font-semibold">
          {splitTitle(paramount.title).role}
        </span>
        {paramount.name && (
          <span className="text-small text-[#D9D3C4]">{paramount.name}</span>
        )}
        {honorificFor(paramount) && (
          <span className="font-serif text-small text-[#E3C17F] italic">
            {honorificFor(paramount)}
          </span>
        )}
      </div>

      {others.length > 0 && (
        <>
          <span
            aria-hidden="true"
            className={`mx-auto block h-6 w-0.5 max-sm:hidden ${LINE}`}
          />
          <ul className="relative grid grid-cols-1 gap-3.5 pt-4 sm:grid-cols-3 sm:pt-6 sm:before:absolute sm:before:top-0 sm:before:right-[calc((100%-28px)/6)] sm:before:left-[calc((100%-28px)/6)] sm:before:h-0.5 sm:before:bg-[#B08A3E] sm:before:content-['']">
            {others.map((entry) => {
              const honorific = honorificFor(entry);
              return (
                <li
                  key={entry._key}
                  className="relative flex flex-col items-center gap-1.5 rounded-[14px] border border-linen-white/18 bg-linen-white/4 p-4.5 text-center transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-linen-white/8 sm:before:absolute sm:before:-top-6 sm:before:left-1/2 sm:before:-ml-px sm:before:h-6 sm:before:w-0.5 sm:before:bg-[#B08A3E] sm:before:content-['']"
                >
                  <Portrait entry={entry} />
                  {entry.community && (
                    <span className="mt-1 rounded-full bg-[#E3C17F] px-2.5 py-1 text-[0.6875rem] leading-none font-medium tracking-[0.1em] text-uli-ink uppercase">
                      {entry.community}
                    </span>
                  )}
                  <span className="mt-1 font-serif text-[1.25rem] font-semibold">
                    {splitTitle(entry.title).role}
                  </span>
                  {entry.name && (
                    <span className="text-[0.8125rem] text-[#D9D3C4]">
                      {entry.name}
                    </span>
                  )}
                  {honorific && (
                    <span className="font-serif text-body text-[#E3C17F] italic">
                      {honorific}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </figure>
  );
}
