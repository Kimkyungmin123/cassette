import styled from '@emotion/styled';
import { ButtonLayout } from 'components/button/style';
import theme from 'styles/theme';

export const TypeStyle = styled.div`
  font-family: 'Ycomputer-Regular';
`;

export const ClearButton = styled(ButtonLayout)`
  border-radius: 50%;
  color: ${theme.colors.white};
  width: 35px;
  height: 35px;

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

export const RecordButtonZone = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AudioContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
