import cn from "classnames";
import React from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Select, { components, DropdownIndicatorProps, MenuPlacement, MenuProps } from "react-select";

type Props = {
  disabled: boolean;
  options: any;
  value: any;
  defaultValue: null;
  callBack: (value: any) => void;
  error: null;
  size: string;
  placeholder: string;
  label: string;
  isSearchable: boolean;
  allowMenuComponent: boolean;
  openUp: MenuPlacement;
  isMultiInput: boolean;
};

export const AdvancedSelect = ({
  disabled = false,
  options,
  value = null,
  defaultValue = null,
  callBack = value => {},
  error = null,
  size = "lg",
  placeholder = "Select...",
  label = "",
  isSearchable = false,
  allowMenuComponent = true,
  openUp = "auto",
  isMultiInput = false,
  ...props
}: Props) => {
  const height = cn({
    "42px": size === "sm",
    "50px": size === "md",
    "56px": size === "lg"
  });

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      zIndex: 11
    }),
    control: (base: any, state: any) => ({
      ...base,
      fontSize: "16px",
      height,
      border: error ? "1px solid #ff0000" : "1px solid rgba(209, 213, 219)",
      borderRadius: "8px",
      background: disabled ? "#edf2f7" : "",
      borderColor: error ? "#ff0000" : "#03BFB6",
      boxShadow: state.isFocused ? "0 0 0 1px #03BFB6" : "",
      ":hover": {
        borderColor: error ? "#ff0000" : "#03BFB6"
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px solid rgba(228, 228, 228, 0.2)",
      color: state.isSelected ? "#03BFB6" : state.isDisabled ? "#94A3B8" : "#0F172A",
      backgroundColor: state.isFocused ? "rgba(228, 228, 228, 0.2)" : "white",
      ":active": {
        backgroundColor: "white"
      }
    })
  };

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <div className="flex flex-col items-center justify-start text-primary">
          {size === "sm" && (
            <>
              <AiOutlineUp className="w-2 h-2" />
              <AiOutlineDown className="w-2 h-2" />
            </>
          )}
          {size === "md" && (
            <>
              <AiOutlineUp className="w-3 h-3" />
              <AiOutlineDown className="w-3 h-3" />
            </>
          )}
          {size === "lg" && (
            <>
              <AiOutlineUp className="block" />
              <AiOutlineDown className="block" />
            </>
          )}
        </div>
      </components.DropdownIndicator>
    );
  };

  const Menu = (props: MenuProps) => {
    return (
      <components.Menu {...props}>
        <span className="text-left">{props.children}</span>
      </components.Menu>
    );
  };

  const Option = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          <input type="checkbox" checked={props.isSelected} onChange={() => null} />
          <label className="ml-1">{props.label}</label>
        </div>
      </components.Option>
    );
  };

  const inputStyle = cn({ "ring-red-500": error });
  return (
    <div>
      <div className={inputStyle}>
        {label && <div className="mb-2 font-bold">{label}</div>}

        <Select
          {...props}
          isDisabled={disabled}
          onChange={value => callBack(value)}
          options={options}
          value={value}
          defaultValue={defaultValue}
          styles={customStyles}
          components={{
            DropdownIndicator,
            ...(allowMenuComponent ? { Menu } : {}),
            ...(isMultiInput ? { Option } : {})
          }}
          placeholder={placeholder}
          isSearchable={isSearchable}
          menuPlacement={openUp}
        />
      </div>
      {error && (
        <div className="flex flex-row justify-between mt-1">
          <div className="text-red-400">{error} </div>
        </div>
      )}
    </div>
  );
};
