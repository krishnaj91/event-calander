import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import getFormErrorMessage from './getFormErrorMessage';

const CustomCalander = ({
    control,
    errors,
    name,
    labelId,
    required,
    requiredMsg,
    defaultValue,
    disabled,
    showIcon,
    className,
    rules,
    ...rest
}) => {

    return (
        <Controller
            control={control}
            name={name}
            rules={rules
            }
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label htmlFor={field.name} className={classNames('mb-1',{ 'p-error': errors.value })}>
                    <span className="font-bold">{labelId}</span>
                    {required && <span className="text-red-500"> *</span>}
                    </label>
                    <Calendar
                        {...field}
                        disabled={disabled}
                        showIcon={showIcon}
                        className={classNames('w-full', { 'p-invalid': fieldState.error })}
                        {...rest}
                    />
                    {getFormErrorMessage(errors, field.name)}
                </div>
            )}
            defaultValue={defaultValue}
        />
    );
};

export default CustomCalander;
