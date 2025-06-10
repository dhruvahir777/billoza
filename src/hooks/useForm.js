import { useState } from "react";
import { validateForm } from "../utils/validations";

export default function useForm(initialState) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (prev[name] !== value) {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSection = (section) => {
    const validationErrors = validateForm(formData, section);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    setFormData,
    handleChange,
    handleSelectChange,
    validateSection,
    resetForm,
    setErrors,
  };
}
