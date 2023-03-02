import Close from '@icon/close.svg';
import Memo from '@icon/memo.svg';
import Right from '@icon/right.svg';
import TapeSVG from 'components/tape';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CloseZone,
  Content,
  ContentZone,
  GuideButton,
  GuideButtonZone,
  GuideContainer,
  Title,
} from 'styles/guide';
import theme from 'styles/theme';

const Guide = () => {
  const router = useRouter();

  return (
    <>
      <CloseZone>
        <Close onClick={() => router.back()} />
      </CloseZone>
      <GuideContainer>
        <Title>
          <Memo />

          <h1>Voice Tape 사용 가이드</h1>
        </Title>
        <ContentZone>
          <Content>
            <div>
              <TapeSVG width="27px" height="25px" title="" date="" />
              <h2>Voice Tape는 어떤 서비스예요?</h2>
            </div>
            <p>
              Voice Tape 는 새해를 맞아 <br />
              고마웠던, 함께해서 즐거웠던, 친해지고 싶은 <br />
              사람에게 텍스트가 아닌 목소리로 <br />
              마음을 표현하는 서비스입니다!
            </p>
          </Content>
          <Content>
            <div>
              <TapeSVG width="27px" height="25px" title="" date="" />
              <h2>Voice Tape는 어떻게 이용해요?</h2>
            </div>
            <ol>
              <li>
                내 테이프를 만들고 친구에게 녹음을 요청하는 <br /> 테이프 링크를
                공유해요.
              </li>
              <li>총 12명의 친구에게 녹음 테이프를 받을 수 있어요. </li>
              <li>
                녹음한 친구가 3명이 되면 테이프를 들을 수 있고 <br />
                개별 파일을 다운로드할 수 있어요.
              </li>
              <li>
                12개의 테이프가 모이면 모든 친구의 목소리가 <br /> 들어간 합본
                파일을 다운로드할 수 있어요.
              </li>
            </ol>
          </Content>
          <Content>
            <div>
              <TapeSVG width="27px" height="25px" title="" date="" />
              <h2>Voice Tape를 매일 듣고 싶으신가요?</h2>
            </div>
            <p>
              Voice Tape 앱을 다운로드하면 <br /> 친구들의 목소리를 매일 쉽게
              들을 수 있어요!
            </p>
          </Content>
          <GuideButtonZone>
            <GuideButton variant="main">
              <Link
                href="https://www.notion.so/Voice-Tape-041b53af5dce4da880e360d250c1bcab"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div>
                  Voice Tape 앱 다운받기
                  <Right fill={theme.colors.primary} />
                </div>
              </Link>
            </GuideButton>
          </GuideButtonZone>
        </ContentZone>
      </GuideContainer>
    </>
  );
};

export default Guide;
