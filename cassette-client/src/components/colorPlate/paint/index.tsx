import { ChangeEvent, useEffect, useState } from 'react';
import { useGuestInfoStore, useUserStore } from 'store';
import { Color } from 'types';

import { CircleStyle, Item } from './style';

export interface CircleProps {
  color: Color | '';
  isOwner?: boolean;
}

const Paint = ({ isOwner = true, color }: CircleProps) => {
  const [isColorValue, setIsColorValue] = useState<boolean>(false);
  const { setTapeColor, tapeColor } = useUserStore();
  const { tapeColor: guestColor, setTapeColor: setGuestColor } =
    useGuestInfoStore();

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
        aria-label={color.slice(9)}
      />
    </Item>
  );
};

export default Paint;
