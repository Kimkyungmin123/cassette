import Sandglass from '@icon/sandglass.svg';

import {
  DotStyle1,
  DotStyle2,
  DotStyle3,
  LoadingCotainer,
  TextContent,
} from './style';

const Loading = () => {
  return (
    <LoadingCotainer>
      <Sandglass />
      <TextContent>
        <span>로딩중</span>
        <DotStyle1 />
        <DotStyle2 />
        <DotStyle3 />
      </TextContent>
    </LoadingCotainer>
  );
};

export default Loading;
