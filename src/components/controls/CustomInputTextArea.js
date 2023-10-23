import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller } from "react-hook-form";
import getFormErrorMessage from "./getFormErrorMessage";

const CustomInputTextArea = ({
  control,
  errors,
  name,
  labelId,
  defaultValue,
  required,
  className,
  requiredMsg,
  rules,
  ...rest
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
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
            <InputTextarea
              id={field.name}
              {...field}
              rows={4}
              cols={30}
              className={classNames({ "p-invalid": fieldState.error })}
              {...rest}
            />
            {getFormErrorMessage(errors, field.name)}
          </div>
        )}
      />
    </>
  );
};

export default CustomInputTextArea;
