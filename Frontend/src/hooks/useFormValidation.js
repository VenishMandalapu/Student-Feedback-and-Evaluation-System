import { useState, useCallback } from 'react';

export const useFormValidation = (rules) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = useCallback((name, value) => {
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

  const validateForm = useCallback((data) => {
    const newErrors = {};
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

  const validateSingleField = useCallback((name, value) => {
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

  const clearFieldError = useCallback((name) => {
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
