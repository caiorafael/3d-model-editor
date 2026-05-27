import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const inputClasses =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100";

const labelClasses = "mb-1.5 block text-xs font-medium text-neutral-600 dark:text-neutral-400";

export const Input = ({ label, className = "", id, ...props }: InputProps) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <input id={inputId} className={`${inputClasses} ${className}`} {...props} />
    </div>
  );
};
