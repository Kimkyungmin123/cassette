import Down from '@icon/down.svg';
import { WITHDRAWAL } from 'constants/withdrawal';
import { dropdownStore } from 'store';
import { WithdrawalData } from 'types';

import {
  DropDownContainer,
  ReasonBox,
  SelectBox,
  WithdrawalList,
} from './style';

interface DropDownProps {
  defaultText: string;
  onClick: () => void;
  selected: boolean;
  onSelected: () => void;
  dropData: WithdrawalData[];
}

export interface SelectProps {
  IsOpen: boolean;
}

export interface ListProps {
  IsLastList: boolean;
}

const Dropdown = ({
  defaultText,
  onClick,
  selected,
  onSelected,
  dropData,
}: DropDownProps) => {
  const { setDropData, dropContent } = dropdownStore();

  return (
    <DropDownContainer>
      <SelectBox IsOpen={selected} onClick={onSelected}>
        <span>{dropContent ? dropContent : defaultText}</span> <Down />
      </SelectBox>
      {selected ? (
        <WithdrawalList>
          {dropData.map((data, index) => (
            <li key={index}>
              <ReasonBox
                IsLastList={WITHDRAWAL.length - 1 === index}
                onClick={() => {
                  setDropData(data.content, data.type);
                  onClick();
                }}
              >
                <span>{data.content}</span>
              </ReasonBox>
            </li>
          ))}
        </WithdrawalList>
      ) : null}
    </DropDownContainer>
  );
};
export default Dropdown;
