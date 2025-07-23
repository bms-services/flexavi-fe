import { cn } from "@/utils/format"
import { Label } from "./label"
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister
} from "react-hook-form"
import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface InputC<T extends FieldValues> extends React.ComponentProps<"input"> {
  label?: string
  icon?: React.ReactNode
  rules?: {
    register: UseFormRegister<T>,
    name: Path<T>,
    options?: RegisterOptions<T>,
    errors: FieldErrors<T>
  }
  error?: FieldError
}

const Input = React.forwardRef(<T extends FieldValues,>(
  { className, type = "text", label, icon, rules, error, ...props }: InputC<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  const hasError = rules?.errors[rules.name]
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordType = type === "password"

  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type

  return (
    <div className="relative space-y-1">
      {label && (
        <Label htmlFor={props.id} className="text-right">
          {label}
        </Label>
      )}
      <div className="relative flex items-center">
        {icon && type !== "color" && (
          <span className="absolute left-3 text-muted-foreground">
            {icon}
          </span>
        )}

        <input
          type={inputType}
          ref={ref}
          className={cn(
            "w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon && type !== "color" ? "pl-10" : "pl-4",
            isPasswordType ? "pr-10" : "",
            type === "color" && "h-10 w-14 p-1",
            className
          )}
          {...(rules?.register && rules.register(rules.name as Path<T>, rules.options))}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-muted-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {hasError && (
        <div className="text-red-500 text-sm mt-1">
          {hasError.message as string}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error.message as string}
        </div>
      )}
    </div>
  )
}) as <T extends FieldValues>(props: InputC<T> & { ref?: React.Ref<HTMLInputElement> }) => JSX.Element

export { Input }