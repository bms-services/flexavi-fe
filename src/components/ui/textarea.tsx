import * as React from "react"

import { cn } from "@/utils/format"
import { Label } from "./label"
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form"

interface TextareaC<T> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  icon?: React.ReactNode
  rules?: {
    register: UseFormRegister<T>
    name: string
    options: RegisterOptions<T>
    errors: FieldErrors<T>
  }
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaC<T>>(
  ({ className, label, icon, rules, ...props }, ref) => {
    return (
      <div className="relative space-y-1">
        {label && (
          <Label htmlFor={props.id} className="text-right">
            {label}
          </Label>
        )}
        <div className="relative flex items-start">
          {icon && (
            <span className="absolute left-3 top-3 text-muted-foreground">
              {icon}
            </span>
          )}
          <textarea
            className={cn(
              "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon ? "pl-10" : "pl-4",
              className
            )}
            ref={ref}
            {...rules?.register && rules.register(rules.name, rules.options)}
            {...props}
          />
        </div>
        {rules?.errors[rules.name] && (
          <div className="text-red-500 text-sm mt-1">
            {rules.errors[rules.name].message as string}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
