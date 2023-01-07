import styled from '@emotion/styled';
import theme from 'styles/theme';

export const ColorPlateStyle = styled.div`
  width: 100%;
  max-width: 327px;
  display: flex;
  gap: 16px;
  background-color: ${theme.colors.color_pallet};
  flex-wrap: wrap;
  padding: 16px 22px;
  border-radius: 10px;
`;
