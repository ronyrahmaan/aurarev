import { cn } from '@/lib/utils'

interface GlowBoxProps {
  children: React.ReactNode
  className?: string
  enableHover?: boolean
}

export function GlowBox({ children, className, enableHover = true }: GlowBoxProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        "bg-gradient-to-b from-white/[0.06] to-white/[0.02]",
        "border-2 border-white/[0.15]",
        "backdrop-blur-sm",
        "p-12",
        "ring-2 ring-white/20",
        "shadow-[0_0_50px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.08)]",
        enableHover && "hover:shadow-[0_0_80px_rgba(59,130,246,0.35),inset_0_0_40px_rgba(59,130,246,0.12)]",
        "transition-all duration-500",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Enhanced corner glow effects */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 blur-3xl" />
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}