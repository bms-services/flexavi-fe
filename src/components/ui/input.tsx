import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputC extends React.ComponentProps<"input"> {
  label?: string
  icon?: React.ReactNode
  rules?: {
    register: UseFormRegister<FieldValues>,
    name: string,
    options: RegisterOptions<FieldValues>,
    errors: FieldErrors<FieldValues>
  }
}

const Input = React.forwardRef<HTMLInputElement, InputC>(
  ({ className, type, label, icon, rules, ...props }, ref) => {
    return (
      <div className="relative space-y-1">
        {label && (
          <Label htmlFor={props.id} className="text-right">
            {label}
          </Label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3 text-muted-foreground">
              {icon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon ? "pl-10" : "pl-4",
              className
            )}
            ref={ref}
            {...rules?.register && rules.register(rules.name, rules.options)}
            {...props}
          />
        </div>
        {rules?.errors[rules.name] && (
          <div className="text-red-500 text-sm mt-1">{rules.errors[rules.name].message as string}</div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
