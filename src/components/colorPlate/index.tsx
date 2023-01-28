import { COLORS } from 'constants/color';

import Paint from './paint';
import { ColorPlateStyle } from './style';

interface ColorPlateProps {
  isOwner?: boolean;
}

const ColorPlate = ({ isOwner }: ColorPlateProps) => {
  return (
    <ColorPlateStyle>
      {COLORS.map((name, index) => (
        <Paint key={index} color={name} isOwner={isOwner} />
      ))}
    </ColorPlateStyle>
  );
};

export default ColorPlate;
