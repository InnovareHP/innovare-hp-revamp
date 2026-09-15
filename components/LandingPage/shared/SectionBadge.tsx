import { cn } from "@/lib/utils";

/**
 * Editorial index label that opens each section — brand-blue numeral, short
 * rule, then the section name. Echoes the numbered service rows and the
 * oversized stat figures rather than sitting in a chip.
 */
const SectionBadge = ({
  number,
  children,
  className,
}: {
  /** Per-page section index, e.g. "01". Omit for an unnumbered label. */
  number?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex w-fit shrink-0 grow-0 items-center gap-3 self-start sm:gap-4",
      className
    )}
  >
    {number ? (
      <span className="text-sm font-bold text-brand tabular-nums sm:text-base">
        {number}
      </span>
    ) : null}
    <span aria-hidden className="h-px w-8 bg-brand/35 sm:w-10" />
    <span className="text-[13px] tracking-[0.18em] text-ink uppercase sm:text-sm">
      {children}
    </span>
  </span>
);

export default SectionBadge;
