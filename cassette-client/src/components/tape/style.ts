import styled from '@emotion/styled';
import theme from 'styles/theme';

export const TypeStyle = styled.div`
  font-family: 'Ycomputer-Regular';
`;

export const ClearButton = styled.button`
  background: transparent;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  border-radius: 50%;
  color: ${theme.colors.white};
  min-width: fit-content;
  margin-top: 5px;

  :disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const RecordingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Time = styled.div`
  margin-top: 12px;
  color: ${theme.colors.white};
`;

export const AudioContainer = styled.div`
  margin-top: 20px;
`;
