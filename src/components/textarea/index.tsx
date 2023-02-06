import { ChangeEvent } from 'react';

import { LimitText, TextareaContainer, TextareaWrapper } from './style';

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength: number;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  maxLength,
}: TextareaProps) => {
  return (
    <TextareaContainer>
      <TextareaWrapper
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {maxLength && (
        <LimitText>
          {value?.length} / {maxLength}
        </LimitText>
      )}
    </TextareaContainer>
  );
};

export default Textarea;
