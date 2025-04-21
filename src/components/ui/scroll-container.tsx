
import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const ScrollContainer = React.forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ScrollContainer.displayName = "ScrollContainer"
