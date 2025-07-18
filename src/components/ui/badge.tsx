
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/format"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-gray-200",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-foreground hover:bg-accent hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        primary:
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        danger:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        info:
          "border-transparent bg-sky-500 text-white hover:bg-sky-600",
        light:
          "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
        dark:
          "border-transparent bg-gray-800 text-white hover:bg-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
