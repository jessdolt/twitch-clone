import { cn } from "@/lib/utils"

interface LiveBadgeProps {
  className?: string
}

export const LiveBadge: React.FC<LiveBadgeProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] tracking-wide border border-background font-semibold",
        className
      )}
    >
      Live
    </div>
  )
}
