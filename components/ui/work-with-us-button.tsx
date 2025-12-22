import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WorkWithUsButtonProps {
  variant?: "default" | "hero" | "service";
  className?: string;
}

const WorkWithUsButton = ({
  variant = "default",
  className,
}: WorkWithUsButtonProps) => {
  if (variant === "hero") {
    return (
      <Link href="#contact" title="Work With Us">
        <Button
          variant="outline"
          className={cn(
            "border-white text-white hover:bg-white/10 hover:text-white rounded-none px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-lg font-semibold uppercase tracking-widest cursor-pointer",
            className
          )}
        >
          WORK WITH US
        </Button>
      </Link>
    );
  }

  if (variant === "service") {
    return (
      <Link href="#contact" title="Work With Us">
        <Button
          variant="outline"
          className={cn(
            "border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-none px-8 py-6 text-sm font-semibold uppercase tracking-widest cursor-pointer",
            className
          )}
        >
          WORK WITH US
        </Button>
      </Link>
    );
  }

  return (
    <Link href="#contact" title="Work With Us">
      <Button
        variant="outline"
        className={cn(
          "border-blue-400 text-blue-400 hover:bg-blue-50 hover:text-blue-500 rounded-none px-6 py-3 text-sm font-normal uppercase tracking-wide cursor-pointer",
          className
        )}
      >
        WORK WITH US
      </Button>
    </Link>
  );
};

export default WorkWithUsButton;
