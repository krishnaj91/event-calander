import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import getFormErrorMessage from "./getFormErrorMessage";

const CustomInputText = ({
  control,
  errors,
  name,
  labelId,
  defaultValue,
  required,
  helpMsg,
  className,
  placeholder,
  disabled,
  requiredMsg,
  rules,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={className}>
          <label
            htmlFor={field.name}
            className={classNames({ "p-error": errors.value })}
          >
            <span className="font-bold">{labelId}</span>
            {required && <span className="text-red-500"> *</span>}
          </label>
          <InputText
            {...field}
            id={field.name}
            className={classNames("w-full", { "p-invalid": fieldState.error })}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          <small id="username-help">{helpMsg}</small>
          {getFormErrorMessage(errors, field.name)}
        </div>
      )}
    />
  );
};

export default CustomInputText;
