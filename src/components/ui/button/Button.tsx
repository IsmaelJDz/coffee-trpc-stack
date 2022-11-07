import cn from "classnames";
import React, { FC, ReactElement } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Color = "primary" | "secondary" | "danger" | "blueGrey" | "light" | "gray" | "withOutline" | "secondary-green";
type Type = "submit" | "button" | "reset";
type Size = "xs" | "sm" | "base" | "lg";
type Variant = "outline" | "solid";
type CallbackFunction = () => void;

type ButtonProps = {
  text: string;
  onClick?: CallbackFunction;
  type?: Type;
  preffix?: ReactElement;
  suffix?: ReactElement;
  className?: string;
  loading?: boolean;
  color?: Color;
  variant?: Variant;
  spinnerText?: string;
  disabled?: boolean;
  size?: Size;
  uppercase?: boolean;
};

export const AdvancedButton: FC<ButtonProps> = ({
  text,
  onClick = () => {},
  type,
  preffix,
  suffix,
  className,
  loading = false,
  color = "primary",
  variant = "solid",
  spinnerText = "Loading...",
  size = "sm",
  disabled = false,
  uppercase = false
}) => {
  const buttonSize = cn({
    "h-8": size === "xs",
    "h-12": size === "sm",
    "h-16": size === "base",
    "h-20": size === "lg"
  });

  const buttonStyles = cn(
    "px-6 tracking-wider transition duration-150 ease-in-out rounded-md shadow-md focus:outline-none",
    {
      "text-white bg-blue-grey-400 border border-blue-grey-300 hover:bg-blue-grey-50 hover:text-gray-900":
        color === "blueGrey" && variant === "solid"
    },
    {
      "text-white bg-teal-300 border border-teal-300 hover:bg-teal-50 hover:text-teal-300":
        color === "primary" && variant === "solid"
    },
    {
      "text-teal-300 bg-white border border-teal-300 hover:bg-teal-50": color === "secondary" && variant === "solid"
    },
    {
      "text-white bg-red-300 border border-red-300 hover:bg-red-50 hover:text-red-300":
        color === "danger" && variant === "solid"
    },
    {
      "text-white bg-gray-400 border border-gray-400 hover:bg-gray-50 hover:text-gray-400":
        color === "gray" && variant === "solid"
    },
    {
      "text-primary bg-gray-50 border border-white hover:bg-gray-100": color === "light" && variant === "solid"
    },
    {
      "text-blue-grey-400 bg-transparent border border-blue-grey-300 hover:bg-blue-grey-50 hover:text-blue-gray-500":
        color === "blueGrey" && variant === "outline"
    },
    {
      "text-teal-300 bg-transparent border border-teal-300 hover:bg-teal-50 hover:text-teal-400":
        color === "primary" && variant === "outline"
    },
    {
      "text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-50 hover:text-blue-700":
        color === "secondary" && variant === "outline"
    },
    {
      "text-red-300 bg-transparent border border-red-300 hover:bg-red-50 hover:text-red-400":
        color === "danger" && variant === "outline"
    },
    {
      "text-teal-300 bg-transparent border border-white hover:bg-gray-50": color === "light" && variant === "outline"
    },
    {
      "text-grey-500  bg-grey-100 hover:bg-blue-grey-50 hover:text-blue-grey-300": color === "withOutline"
    },
    { "btn-icon": preffix || suffix },
    { "opacity-50 cursor-not-allowed": (disabled && !loading) || (color === "blueGrey" && disabled) },
    { uppercase },
    className,
    buttonSize
  );

  return (
    <button disabled={disabled} type={type} className={buttonStyles} onClick={onClick}>
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <AiOutlineLoading3Quarters
            className="w-12 h-6 text-sm
            text-white animate-spin"
          />
          {spinnerText}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          {preffix && preffix}
          <div className={` ${cn({ "ml-2": preffix, "mr-2": suffix })}`}>{text}</div>
          {suffix && suffix}
        </div>
      )}
    </button>
  );
};
