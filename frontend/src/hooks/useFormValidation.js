import { useState, useCallback } from 'react';

export default function useFormValidation() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameReqex = /^[a-zA-Zа-яёА-ЯЁ -]+$/

    if (name === 'email' && !e.target.validity.typeMismatch) {
      e.target.setCustomValidity('Вы ввели некоректный email');
    } else {
      e.target.setCustomValidity('');
    }

    if (name === 'name' && !nameReqex.test(value)) {
      e.target.setCustomValidity('Вы ввели некоректное имя');
    } else {
      e.target.setCustomValidity('');
    }

    setFormValues({
      ...formValues,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: e.target.validationMessage
    });

    setIsFormValid(e.target.closest('form').checkValidity());
  }

  const resetForm = useCallback(
    (newFormValues = {}, newFormErrors = {}, newIsFormValid = false) => {
      setFormValues(newFormValues);
      setFormErrors(newFormErrors);
      setIsFormValid(newIsFormValid);
    },
    [setFormValues, setFormErrors, setIsFormValid]
  );
  return { formValues, setFormValues, formErrors, isFormValid, setIsFormValid, handleChange, resetForm }
};
