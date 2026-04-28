import { useCallback, useMemo, useState } from 'react';

export type FormFieldRule = {
  validate: (value: string) => boolean;
  message: string;
};

type UseFormFieldOptions = {
  initialValue?: string;
  rules?: FormFieldRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

type UseFormFieldReturn = {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  errors: string[];
  isValid: boolean;
  isTouched: boolean;
  isDirty: boolean;
  validate: () => boolean;
  reset: () => void;
  inputProps: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  };
};

export function useFormField(
  options: UseFormFieldOptions = {},
): UseFormFieldReturn {
  const {
    initialValue = '',
    rules = [],
    validateOnChange = false,
    validateOnBlur = true,
  } = options;

  const [value, setValueInternal] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [isTouched, setIsTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const runValidation = useCallback(
    (valueToValidate: string) => {
      const validationErrors: string[] = [];

      for (const rule of rules) {
        if (!rule.validate(valueToValidate)) {
          validationErrors.push(rule.message);
        }
      }

      return validationErrors;
    },
    [rules],
  );

  const validate = useCallback(() => {
    setIsTouched(true);

    const validationErrors = runValidation(value);
    setErrors(validationErrors);

    return validationErrors.length === 0;
  }, [runValidation, value]);

  const setValue = useCallback(
    (newValue: string) => {
      setValueInternal(newValue);
      setIsDirty(newValue !== initialValue);

      if (validateOnChange) {
        setErrors(runValidation(newValue));
      }
    },
    [initialValue, runValidation, validateOnChange],
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);

    if (validateOnBlur) {
      setErrors(runValidation(value));
    }
  }, [runValidation, validateOnBlur, value]);

  const reset = useCallback(() => {
    setValueInternal(initialValue);
    setErrors([]);
    setIsTouched(false);
    setIsDirty(false);
  }, [initialValue]);

  const error = useMemo(() => errors[0] ?? null, [errors]);
  const isValid = useMemo(() => errors.length === 0, [errors]);
  const inputProps = useMemo(
    () => ({
      value,
      onChange: setValue,
      onBlur: handleBlur,
    }),
    [handleBlur, setValue, value],
  );

  return {
    value,
    setValue,
    error,
    errors,
    isValid,
    isTouched,
    isDirty,
    validate,
    reset,
    inputProps,
  };
}
