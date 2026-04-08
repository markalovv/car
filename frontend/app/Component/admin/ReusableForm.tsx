'use client';

import React, { useState, useEffect } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'time' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | null;
}

interface ReusableFormProps<T> {
  fields: FormField[];
  initialData?: Partial<T>;
  onSubmit: (data: T) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  loading?: boolean;
  title?: string;
}

export default function ReusableForm<T extends Record<string, any>>({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText = "บันทึก",
  cancelButtonText = "ยกเลิก",
  loading = false,
  title
}: ReusableFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const validateField = (name: string, value: any): string | null => {
    const field = fields.find(f => f.name === name);
    if (!field) return null;

    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} เป็นฟิลด์ที่จำเป็น`;
    }

    if (field.validation) {
      return field.validation(value);
    }

    return null;
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData as T);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = errors[field.name];

    const baseInputClasses = "w-full bg-[#091413] border text-white px-3 py-2 rounded-lg outline-none focus:border-[#B0E4CC] transition-colors";
    const inputClasses = `${baseInputClasses} ${error ? 'border-red-500' : 'border-[#285A48]'}`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={`${inputClasses} resize-vertical min-h-[80px]`}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={value || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className={inputClasses}
          >
            <option value="">เลือก{field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={Boolean(value)}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="w-4 h-4 text-[#B0E4CC] bg-[#091413] border-[#285A48] rounded focus:ring-[#B0E4CC] focus:ring-2"
            />
            <span className="text-[#B0E4CC]">{field.label}</span>
          </label>
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className="bg-[#1a2e2a] border border-[#285A48] rounded-xl p-6">
      {title && (
        <h2 className="text-xl font-bold text-[#B0E4CC] mb-6">{title}</h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            {field.type !== 'checkbox' && (
              <label className="block text-[#B0E4CC] font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
            )}
            {renderField(field)}
            {errors[field.name] && (
              <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#285A48] text-[#B0E4CC] px-6 py-2 rounded-lg hover:bg-[#408A71] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#B0E4CC]"></div>
            )}
            {submitButtonText}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {cancelButtonText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}