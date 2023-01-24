import Button from 'components/button';
import Tape from 'components/tape';
import Title from 'components/title';
import theme from 'styles/theme';

import { Box } from './create-tape/styles';

const CreateTapeCompleted = () => {
  return (
    <div>
      <Box margin="0 0 24px 0">
        <Title name="게스트" color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <Tape title="2023 한정판 테이프" date="21.01.01" sec="144" />
      </Box>

      <Button
        onClick={() => {
          console.log('click');
        }}
        variant="main"
      >
        친구들에게 목소리 남겨달라고 하기
      </Button>
    </div>
  );
};

export default CreateTapeCompleted;
