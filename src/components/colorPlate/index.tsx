import { COLORS } from 'constants/color';

import Paint from './paint';
import { ColorPlateStyle } from './style';

const ColorPlate = () => {
  return (
    <ColorPlateStyle>
      {COLORS.map((name, index) => (
        <Paint key={index} color={name} />
      ))}
    </ColorPlateStyle>
  );
};

export default ColorPlate;
