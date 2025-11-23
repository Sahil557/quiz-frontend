'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'file' | 'date';
  id: string;
  disabled?: boolean;
  value?: string | null | number;
  placeholder?: string;
  className?: string;
  required?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange?: (file: File | null) => void;
  labelClass?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  rightIcon?: React.ReactNode;
  min?: string | number;
  max?: string | number;
};

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  disabled = false,
  value,
  placeholder = '',
  className = '',
  required = false,
  label = '',
  labelClass,
  onChange,
  error,
  accept,
  multiple = false,
  min,
  max,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPasswordField = type === 'password';
  const isFileField = type === 'file';

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={twMerge('block text-sm font-normal text-abyss mb-1.5', labelClass)}
        >
          {label}
          {required && <span className="text-alert ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          autoComplete="off"
          id={id}
          type={isPasswordField && showPassword ? 'text' : type}
          disabled={disabled}
          value={isFileField ? undefined : (value ?? '')}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          accept={isFileField ? accept : undefined}
          multiple={isFileField ? multiple : undefined}
          min={type === 'date' ? min : undefined}
          max={type === 'date' ? max : undefined}
          className={twMerge(
            'block w-full p-1.5 placeholder:text-stone text-sm border border-silver rounded-lg text-stone focus:border-stone focus:outline focus:outline-stone file:mr-4 file:py-1.5 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-silver/50 file:text-stone',
            className,
            disabled && 'border border-silver text-stone bg-mist cursor-not-allowed'
          )}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute -translate-y-1/2 right-3 top-1/2 text-stone"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon
              name={showPassword ? 'ViewIcon' : 'ViewOffSlashIcon'}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
