import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WorkWithUsButtonProps {
  variant?: "default" | "hero";
  className?: string;
}

const WorkWithUsButton = ({ variant = "default", className }: WorkWithUsButtonProps) => {
  if (variant === "hero") {
    return (
      <Button
        variant="outline"
        className={cn(
          "border-white text-white hover:bg-white/10 hover:text-white rounded-none px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest cursor-pointer underline",
          className
        )}
      >
        WORK WITH US
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
        className={cn(
          "border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-none px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-widest cursor-pointer underline",
          className
        )}
    >
      WORK WITH US
    </Button>
  );
};

export default WorkWithUsButton;

