import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";


interface InputC<T> extends React.ComponentProps<"input"> {
  label?: string
  icon?: React.ReactNode
  rules?: {
    register: UseFormRegister<T>,
    name: string,
    options: RegisterOptions<T>,
    errors: FieldErrors<T>
  }
}

const Input = React.forwardRef<HTMLInputElement, InputC<any>>(
  ({ className, type, label, icon, rules, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

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
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              icon ? "pl-10" : "pl-4",
              isPassword ? "pr-10" : "",
              className
            )}
            ref={ref}
            {...(rules?.register && rules.register(rules.name, rules.options))}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 text-muted-foreground focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
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
