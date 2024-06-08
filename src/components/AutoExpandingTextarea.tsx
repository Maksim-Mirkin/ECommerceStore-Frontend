import { useRef, useEffect, useState } from "react";
import { AutoExpandingTextareaProps } from "../@types/types";
import { FieldValues } from "react-hook-form";
import { capitalizeFirstLetter } from "../utils/formatUtils";

/**
 * AutoExpandingTextarea Component
 * Renders a textarea that automatically adjusts its height based on the content and provides validation feedback.
 * Utilizes react-hook-form for form validation and state management.
 *
 * Props:
 * - name (string): The name of the textarea field.
 * - errors (object): Validation errors from react-hook-form.
 * - register (function): The register function from react-hook-form for registering the textarea.
 * - rest (object): Other props to be passed to the textarea element.
 *
 * Features:
 * - Automatically adjusts the height of the textarea based on the content.
 * - Displays validation error messages.
 * - Shows a warning message when the maximum length is reached.
 */
const AutoExpandingTextarea = <T extends FieldValues>({
  name,
  errors,
  register,
  ...rest
}: AutoExpandingTextareaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const message = errors[name]?.message?.toString();
  const err = capitalizeFirstLetter(message ?? "");
  const [isMaximumLength, setIsMaximumLength] = useState(false);
  const [isWarningMessage, setIsWarningMessage] = useState(false);
  const MAX = Number.MAX_SAFE_INTEGER;
  const { ref, ...restRegister } = register(name, {
    required: `${name} is required`,
    minLength: {
      value: rest.minLength ?? 2,
      message: `Minimum length is ${rest.minLength ?? 1}`,
    },
    maxLength: {
      value: rest.maxLength ?? Number.MAX_SAFE_INTEGER,
      message: `Maximum length is ${rest.maxLength ?? MAX}`,
    },
  });

  const adjustHeight = (element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isMaximumLength) {
      setIsWarningMessage(true); // Show the message
      const timer = setTimeout(() => {
        setIsMaximumLength(false);
      }, 5000); // Hide the message after 5 seconds

      return () => clearTimeout(timer);
    } else {
      // Set a timeout to allow the fade-out transition to complete
      const timer = setTimeout(() => {
        setIsWarningMessage(false);
      }, 500); // Match this duration with the transition duration

      return () => clearTimeout(timer);
    }
  }, [isMaximumLength]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef.current);
    }
  }, []);

  return (
    <div className="flex flex-col w-full md:min-h-80 items-center px-4 mb-4">
      <label htmlFor={name} className="self-start">
        {capitalizeFirstLetter(name)}
      </label>
      <textarea
        className="overflow-hidden resize-none md:min-h-80"
        id={name}
        {...restRegister}
        ref={(element) => {
          ref(element);
          textareaRef.current = element;
        }}
        onInput={(e) => {
          adjustHeight(e.currentTarget);
          if (e.currentTarget.value.length === rest.maxLength) {
            setIsMaximumLength(true);
          } else {
            setIsMaximumLength(false);
          }
        }}
        aria-label="Enter your message here"
        {...rest}
      />
      {errors[name] && <p className="text-red-500 mb-4">{err}!</p>}
      {isWarningMessage && (
        <p
          className={`text-amber-500 h-0 my-4 transition-opacity duration-500 ease-in-out ${
            isMaximumLength ? "opacity-100" : "opacity-0"
          }`}
        >
          Maximum length reached!
        </p>
      )}
    </div>
  );
};

export default AutoExpandingTextarea;
