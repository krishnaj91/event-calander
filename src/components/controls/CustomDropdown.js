import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';

import getFormErrorMessage from './getFormErrorMessage';

const CustomDropdown = ({
    control,
    errors,
    name,
    labelId,
    defaultValue,
    required,
    options,
    helpMsg,
    className,
    requiredMsg,
    placeholder,
    value,
    rules,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules
            }
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}>
                    <span className="font-bold">{labelId}</span>
                        {required && <span className="text-red-500"> *</span>}
                    </label>
                    <Dropdown
                        {...field}
                        placeholder={placeholder}
                        id={field.name}
                        optionLabel="label"
                        optionValue="value"
                        focusInputRef={field.ref}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        options={options}
                        value={field.value}
                        {...rest}
                    />
                    <small id="username-help">{helpMsg}</small>
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
        />
    );
};

export default CustomDropdown;
