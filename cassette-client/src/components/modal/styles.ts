import styled from '@emotion/styled';
import theme from 'styles/theme';

export const ModalWrapper = styled.div`
  background: ${theme.colors.black_900};
  color: ${theme.colors.white};
  padding: 20px;
  border-radius: 30px 30px 0 0;
  font-family: 'Pretendard-Regular';
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 99999;
`;

export const ModalDimmed = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  background: rgba(66, 66, 66, 0.6);
`;

export const ModalTitle = styled.h1`
  color: ${theme.colors.white};
  text-align: center;
  margin-bottom: 16px;

  font-size: ${theme.fontSize.xxl};
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
`;

export const ModalDetail = styled.div`
  color: ${theme.colors.gray_600};
  text-align: center;
  margin-bottom: 32px;

  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
`;
