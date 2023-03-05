import { ChangeEvent, ReactNode } from 'react';

import { CheckboxContainer, CheckBoxLabel, CheckboxWrapper } from './style';

interface CheckBoxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  children: ReactNode;
  id: string;
  name?: string;
}

const CheckBox = ({
  onChange,
  isChecked,
  children,
  id,
  name,
}: CheckBoxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxWrapper
        isChecked={isChecked}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        id={id}
        name={name}
      />
      <CheckBoxLabel htmlFor={id}>{children}</CheckBoxLabel>
    </CheckboxContainer>
  );
};

export default CheckBox;
