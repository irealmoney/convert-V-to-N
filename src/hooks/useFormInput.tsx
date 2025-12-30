import { useState } from 'react';

// تعریف تایپ برای استفاده از هوک
interface UseFormInputProps {
  initialValue?: string;
  validator?: (value: string) => boolean;
}

export const useFormInput = (initialValue: string = '', validator?: (value: string) => boolean) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  // تابع تغییر مقدار ورودی
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (validator) {
      if (!validator(e.target.value)) {
        setError('مقدار وارد شده معتبر نیست');
      } else {
        setError(null);
      }
    }
  };


  const reset = () => {
    setValue('');
    setError(null);
  };

  return {
    value,
    error,
    onChange: handleChange,
    reset,
  };
};