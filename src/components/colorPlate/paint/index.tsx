import { ChangeEvent, useEffect, useState } from 'react';
import { useColorStore } from 'store';
import { Color } from 'types';

import { CircleStyle, Item } from './style';

export interface CircleProps {
  color: Color;
}

const Paint = ({ color }: CircleProps) => {
  const [isColorValue, setIsColorValue] = useState<boolean>(false);
  const { setTapeColor, tapeColor } = useColorStore();

  useEffect(() => {
    setIsColorValue(color === tapeColor);
  }, [tapeColor, color]);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTapeColor(value as Color);
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
