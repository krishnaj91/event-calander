import React from "react";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";

const CustomCheckbox = ({
  control,
  errors,
  name,
  labelId,
  defaultValue,
  handleCheckbox,
  className,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => (
        <div className={className}>
          <div className="field-checkbox">
            <input
              type="checkbox"
              id={field.name}
              className={classNames("cursor-pointer custom-checkbox", {
                "p-invalid": fieldState.error,
              })}
              onClick={() => {
                field.onChange(!field.value);
                handleCheckbox(!field.value);
              }}
              {...rest}
            />
            <label
              htmlFor={field.name}
              className="fw-bold cursor-pointer company-primary-text"
            >
              <span className="font-bold">{labelId}</span>
            </label>
          </div>
        </div>
      )}
    />
  );
};

export default CustomCheckbox;
