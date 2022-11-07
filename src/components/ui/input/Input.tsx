import cn from "classnames";
import React, { forwardRef } from "react";
import { IconType } from "react-icons";

type Size = "default" | "large" | "medium" | "small";

type Props = {
  name?: string;
  id?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  invalid?: boolean;
  prefix?: string;
  suffix?: string;
  startIcon?: IconType | JSX.Element | null;
  endIcon?: IconType | JSX.Element | null;
  disabled?: boolean;
  styled?: boolean;
  step?: string;
  wrapperClassName?: string;
  label?: string | JSX.Element | JSX.Element[];
  error?: any;
  required?: boolean;
  defaultValue?: string | number;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  readOnly?: boolean;
  size?: Size;
  min?: number | string;
  max?: number | string;
};

export const AdvancedInput = forwardRef<HTMLInputElement, Props>(function InputWithRef(
  {
    type = "text",
    invalid = false,
    prefix = null,
    suffix = null,
    startIcon: StartIcon,
    endIcon: EndIcon,
    disabled = false,
    className = "",
    styled = false,
    wrapperClassName,
    error = null,
    label = "",
    required = false,
    placeholder = "",
    name = "",
    defaultValue = "",
    onChange = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
    readOnly = false,
    min = "",
    max = "",
    step = "any",
    size = "default"
  },
  ref
) {
  const borderClass = cn({
    "border-gray-300": !error,
    "focus:border-indigo-700": !error,
    "border-red-700": error,
    "bg-grey-200": readOnly
  });

  // const stringsClass = cn({
  //   "rounded-r-none border-r-0": suffix,
  //   "rounded-l-none border-l-0": prefix
  // });

  // const iconsClass = cn({
  //   "pr-12": EndIcon,
  //   "pl-12": StartIcon
  // });

  const widthClass = cn({
    "w-full": size === "default",
    "w-88": size === "large",
    "w-60": size === "medium",
    "w-40": size === "small"
  });

  return (
    <>
      {label && (
        <label htmlFor={name} className="pb-2 text-sm font-bold text-grey-600">
          {label}
        </label>
      )}

      <div className={`flex flex-wrap prelative text-gray-700 h-10 ${widthClass} `}>
        {prefix && <span className="block p-3 bg-gray-400 border rounded-l-lg">{prefix}</span>}
        <div className={`relative h-10 border-1 border-gray-600 text-gray-600 ${widthClass}`}>
          {StartIcon && (
            <span className="absolute cursor-pointer left-2 translate-y-[-50%] top-2/4">
              {typeof StartIcon === "function" ? <StartIcon /> : StartIcon}
            </span>
          )}
          <input
            type={type}
            name={name}
            required={required}
            id={name}
            className={`border pl-3 py-3 w-full shadow-sm rounded text-sm focus:outline-none
            text-grey-600 ${borderClass} ${className}`}
            placeholder={placeholder}
            autoComplete={name}
            ref={ref}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            readOnly={readOnly}
            min={min}
            max={max}
            step={step}
          />
          {EndIcon && (
            <span className="absolute cursor-pointer right-2 translate-y-[-50%] top-2/4">
              {typeof EndIcon === "function" ? <EndIcon /> : EndIcon}
            </span>
          )}
        </div>
        {suffix && <span className="block p-3 bg-gray-400 border rounded-r-lg">{suffix}</span>}
      </div>
      {error && <div className="pt-2 mt-1 text-xs text-red-700">{error}</div>}
    </>
  );
});
