import { ChangeEvent } from 'react';
import theme from 'styles/theme';

import {
  InputContainer,
  InputWrapper,
  Label,
  LabeledInputContainer,
  Length,
} from './style';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  label?: string;
  highlightWords?: string[];
  highlightColor?: string;
}
const Input = ({
  value,
  onChange,
  placeholder,
  maxLength,
  label,
  highlightWords,
  highlightColor,
}: InputProps) => {
  const highlight = (words: string[]): string => {
    let newLabel = label;
    words?.forEach((word) => {
      const re = new RegExp(word, 'g');
      newLabel = newLabel?.replace(
        re,
        `<span style="color: ${theme.colors.mint};">${word}</span>`,
      );
    });
    return newLabel || '';
  };

  return (
    <LabeledInputContainer>
      {label && (
        <Label
          color={highlightColor}
          dangerouslySetInnerHTML={{
            __html: highlight(highlightWords as string[]),
          }}
        />
      )}
      <InputContainer>
        <InputWrapper
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {maxLength && (
          <Length>
            {value.length} / {maxLength}
          </Length>
        )}
      </InputContainer>
    </LabeledInputContainer>
  );
};

export default Input;
