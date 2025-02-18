import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Check({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-check w-4 h-4", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
