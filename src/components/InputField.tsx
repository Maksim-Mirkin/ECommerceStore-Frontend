import { useState } from "react";
import { FieldValues, FieldError } from "react-hook-form";
import { InputFieldProps } from "../@types/types";
import { capitalizeFirstLetter, splitCamelCase } from "../utils/formatUtils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * InputField Component
 * Renders an input field with optional password visibility toggle, error handling, and customizable props.
 * Utilizes react-hook-form for form validation and state management.
 *
 * Props:
 * - errors (object): Validation errors from react-hook-form.
 * - name (string): The name of the input field.
 * - register (function): The register function from react-hook-form for registering the input.
 * - pattern (object): Validation pattern for the input field.
 * - className (string): Additional CSS classes for styling.
 * - rest (object): Other props to be passed to the input element.
 *
 * Features:
 * - Displays a label and an input field with proper ARIA attributes for accessibility.
 * - Handles showing and hiding of password fields.
 * - Displays validation error messages.
 */
const InputField = <T extends FieldValues>({
  errors,
  name,
  register,
  pattern,
  className,
  ...rest
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const message = (errors[name] as FieldError)?.message?.toString();
  const err = capitalizeFirstLetter(message ?? "") as string;
  const MAX = Number.MAX_SAFE_INTEGER;
  const isPassword = rest.type === "password";
  const disabled = rest.disabled;

  const splitedName = splitCamelCase(name);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { onBlur: fieldOnBlur, ...fieldProps } = register(name, {
    required: rest.required ? `${name} is required` : false,
    minLength: {
      value: rest.minLength ?? 2,
      message: `Minimum length is ${rest.minLength ?? 2}`,
    },
    maxLength: {
      value: rest.maxLength ?? MAX,
      message: `Maximum length is ${rest.maxLength ?? MAX}`,
    },
    pattern: { value: pattern, message: `Invalid ${name}` },
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fieldOnBlur(e);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  return (
    <div className={`flex flex-col w-full items-center px-4 ${className}`}>
      <div className="w-full flex flex-col justify-center mb-4">
        <label
          htmlFor={name}
          className="flex flex-row items-center justify-center mb-1 self-start"
        >
          {capitalizeFirstLetter(splitedName)}
        </label>
        <div className="relative w-full">
          <input
            id={name}
            placeholder={`${capitalizeFirstLetter(splitedName)}`}
            {...fieldProps}
            {...rest}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : rest.type || "text"
            }
            autoComplete={rest.autoComplete ?? "off"}
            className={`pr-4 ${disabled ? "bg-red-200" : ""}`}
            aria-invalid={errors[name] ? "true" : "false"}
            aria-label={`Enter your ${name} here`}
            onChange={rest.onChange}
            onBlur={handleBlur}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FaEye className="dark:text-white" />
              ) : (
                <FaEyeSlash className="dark:text-white" />
              )}
            </button>
          )}
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-500 mb-4">{splitCamelCase(err)}</p>
      )}
    </div>
  );
};

export default InputField;
