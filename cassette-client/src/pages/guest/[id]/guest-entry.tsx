'use client';
import { ButtonLayout } from 'components/button/style';
import SpinnerIcon from 'components/spinner';
import TapeSVG from 'components/tape/tape';
import useLoading from 'hooks/useLoading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Zone } from 'styles';
import { Color } from 'types';
import subInstance from 'utils/api/sub';
import date from 'utils/format/date';

const Cry = dynamic(() => import('@icon/cry.svg'));
const Modal = dynamic(() => import('components/modal'));
const ModalPortal = dynamic(() => import('components/modal/portal'));

const GuestEntry = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerTapeTitle, setOwnerTapeTitle] = useState<string>('');
  const [ownerTapeColor, setOwnerTapeColor] =
    useState<Color>('cassette_orange');
  const [hasFullTape, setHasfullTape] = useState<boolean>(false);
  const [createDate, setcreateDate] = useState<string>('');

  const { isLoading, setIsLoading } = useLoading();

  const GUEST_CREATE_URL = `/guest/${id}/create-tape-guest`;
  const MAKE_TAPE_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}`;
  const route = useRouter();

  useEffect(() => {
    if (id) {
      subInstance
        .getOwnerTape(id as string)
        .then((data) => {
          setOwnerName(data?.result?.name),
            setOwnerTapeTitle(data?.result?.title),
            setOwnerTapeColor(data?.result?.colorCode),
            setHasfullTape(data?.result?.hasAudioLink),
            //TODO: 추후 서버 res data createAt 필드 추가되면 변경
            setcreateDate(date.formattedDate(data?.timestamp));
        })
        .catch((e) => {
          route.push('/404');
        });
    }
  }, [id, ownerName, ownerTapeTitle]);

  const closeModal = () => setModalOpen(false);
  return (
    <>
      {id && ownerName ? (
        <Container>
          <ModalPortal closeModal={closeModal}>
            {modalOpen && (
              <Modal
                icon={<Cry />}
                title="테이프를 남길 자리가 없어요!"
                detail="친구들의 목소리가 담긴 테이프를 갖고싶나요?"
                btnText="내 테이프 만들기"
                link={MAKE_TAPE_URL}
                onClickBtn={closeModal}
              />
            )}
          </ModalPortal>
          <Zone css={{ gap: '32px' }}>
            <div>
              <h1>{ownerName}&apos;s Tape</h1>
              <h2>{ownerTapeTitle}</h2>
            </div>

            <TapeSVG
              title={ownerTapeTitle}
              date={createDate}
              sec="144"
              color={ownerTapeColor}
            />
            <p>
              평소 전하지 못했던 마음을 <br /> 목소리로 담아보세요 ♡
            </p>
          </Zone>
          <Zone css={{ paddingTop: '176px' }}>
            <ButtonLayout
              variant="guest"
              color={ownerTapeColor}
              aria-label="목소리 남겨주기"
              onClick={() => {
                setIsLoading(true);
                hasFullTape
                  ? (setModalOpen(true), setIsLoading(false))
                  : route.push(GUEST_CREATE_URL);
              }}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? <SpinnerIcon /> : <span>목소리 남겨주기</span>}
            </ButtonLayout>
          </Zone>
        </Container>
      ) : null}
    </>
  );
};

export default GuestEntry;
