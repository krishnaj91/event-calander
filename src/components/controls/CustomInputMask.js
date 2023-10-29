import { InputMask } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import getFormErrorMessage from "./getFormErrorMessage";

const CustomInputMask = ({
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
  mask,
  value,
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
          <InputMask
            {...field}
            id={field.name}
            className={classNames("w-full", { "p-invalid": fieldState.error })}
            placeholder={placeholder}
            disabled={disabled}
            mask={mask}
            value={field.value}
            {...rest}
          />
          <small id="username-help" className='text-red-500'>{helpMsg}</small><br/>
          {getFormErrorMessage(errors, field.name)}
        </div>
      )}
    />
  );
};

export default CustomInputMask;
