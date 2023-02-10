import styled from '@emotion/styled';
import theme from 'styles/theme';

export const ColorPlateStyle = styled.div`
  width: 100%;
  max-width: 284px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 16px 16px;
  background-color: ${theme.colors.color_pallet};
  padding: 16px 21.5px;
  border-radius: 10px;
`;
