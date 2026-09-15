import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  /** "solid" = filled brand pill, "ghost" = borderless brand-on-light link pill. */
  variant?: "solid" | "ghost";
  title?: string;
  srHint?: string;
  className?: string;
};

/**
 * The single call-to-action shape used across the landing page:
 * uppercase bold label followed by a circled arrow.
 */
const PillButton = ({
  href,
  children,
  variant = "solid",
  title,
  srHint,
  className,
}: PillButtonProps) => {
  const isSolid = variant === "solid";
  const isInternalHash = href.startsWith("#") || href.startsWith("/");

  const content = (
    <>
      <span>{children}</span>
      {srHint ? <span className="sr-only"> {srHint}</span> : null}
      <span
        aria-hidden
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
          isSolid && "bg-brand-bright"
        )}
      >
        <ArrowRight
          className={cn("size-5", isSolid ? "text-white" : "text-brand")}
        />
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full px-6 text-sm font-bold tracking-[0.02em] uppercase transition-colors duration-300 no-underline",
    isSolid
      ? "bg-brand text-white hover:bg-brand-deep"
      : "bg-transparent text-brand hover:text-brand-deep",
    "sm:text-base",
    className
  );

  if (isInternalHash) {
    return (
      <Link href={href} title={title} data-magnetic className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={classes}
    >
      {content}
    </a>
  );
};

export default PillButton;
