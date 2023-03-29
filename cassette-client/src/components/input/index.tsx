import { ChangeEvent, useEffect, useState } from 'react';
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
  const [highlightedLabel, setHighlightedLabel] = useState('');

  useEffect(() => {
    highlightWords?.forEach((word) => {
      const re = new RegExp(word, 'g');
      const newLabel = label?.replace(
        re,
        `<span style="color: ${theme.colors.mint};">${word}</span>`,
      );

      if (!newLabel) return;
      setHighlightedLabel(newLabel);
    });
  }, [label]);

  return (
    <LabeledInputContainer>
      {label && (
        <Label
          color={highlightColor}
          dangerouslySetInnerHTML={{ __html: highlightedLabel }}
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
