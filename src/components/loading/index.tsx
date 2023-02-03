import Sandglass from '@icon/sandglass.svg';

import { LoadingCotainer, TextContent } from './style';

const Loading = () => {
  return (
    <LoadingCotainer>
      <Sandglass />
      <TextContent>
        <span>로딩중</span>
        <div></div>
        <div></div>
        <div></div>
      </TextContent>
    </LoadingCotainer>
  );
};

export default Loading;
