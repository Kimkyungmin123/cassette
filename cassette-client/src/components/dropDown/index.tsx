import Down from '@icon/down.svg';
import Up from '@icon/up.svg';
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
  isOpen: boolean;
  selectContent: string;
}

export interface ListProps {
  isLastList: boolean;
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
      <SelectBox
        isOpen={selected}
        onClick={onSelected}
        selectContent={dropContent}
      >
        <span>{dropContent ? dropContent : defaultText}</span>{' '}
        {selected ? <Up /> : <Down />}
      </SelectBox>
      {selected ? (
        <WithdrawalList>
          {dropData.map((data, index) => (
            <li key={index}>
              <ReasonBox
                isLastList={WITHDRAWAL.length - 1 === index}
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
