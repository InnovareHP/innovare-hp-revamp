import { cn } from "@/lib/utils";

/**
 * Soft joint between two sections. The landing page's surfaces are only a few
 * values apart, but a hard edge between them still reads as a seam; this
 * gradient carries the previous section's colour a little way into this one so
 * the change of ground happens gradually as the reader scrolls.
 *
 * Decorative and non-interactive. The parent section must be positioned.
 */
const SectionSeam = ({
  /** Tailwind colour token of the section above, e.g. "from-surface-2". */
  from,
  className,
}: {
  from: string;
  className?: string;
}) => (
  <span
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent lg:h-32",
      from,
      className
    )}
  />
);

export default SectionSeam;
