import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((name: string, value: any): string => {
    const fieldRules = rules[name];
    if (!fieldRules) return '';

    for (const rule of fieldRules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        return rule.message;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        return rule.message;
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        return rule.message;
      }

      if (value && rule.pattern && !rule.pattern.test(value)) {
        return rule.message;
      }

      if (value && rule.custom && !rule.custom(value)) {
        return rule.message;
      }
    }

    return '';
  }, [rules]);

  const validateForm = useCallback((data: { [key: string]: any }): boolean => {
    const newErrors: ValidationErrors = {};
    let formIsValid = true;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [rules, validateField]);

  const validateSingleField = useCallback((name: string, value: any) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  const clearFieldError = useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  return {
    errors,
    isValid,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
  };
};
