import { ChangeEvent, useEffect, useState } from 'react';
import { useColorStore, useGuestColorStore } from 'store';
import { Color } from 'types';

import { CircleStyle, Item } from './style';

export interface CircleProps {
  color: Color | '';
  isOwner?: boolean;
}

const Paint = ({ isOwner = true, color }: CircleProps) => {
  const [isColorValue, setIsColorValue] = useState<boolean>(false);
  const { setTapeColor, tapeColor } = useColorStore();
  const guestColor = useGuestColorStore().tapeColor;
  const setGuestColor = useGuestColorStore().setTapeColor;

  useEffect(() => {
    isOwner
      ? setIsColorValue(color === tapeColor)
      : setIsColorValue(color === guestColor);
  }, [tapeColor, color, guestColor, isOwner]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    isOwner ? setTapeColor(value as Color) : setGuestColor(value as Color);
  };

  return (
    <Item>
      <CircleStyle
        type="radio"
        name="color"
        color={color}
        value={color}
        checked={isColorValue}
        onChange={handleColorChange}
      />
    </Item>
  );
};

export default Paint;
