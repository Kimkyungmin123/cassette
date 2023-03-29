import { ChangeEvent, useState } from 'react';

const useInput = (maxLen: number) => {
  const [value, setValue] = useState<string>('');

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length <= maxLen && setValue(e.target.value);
  };

  return { value, handleChangeValue, setValue };
};

export default useInput;
