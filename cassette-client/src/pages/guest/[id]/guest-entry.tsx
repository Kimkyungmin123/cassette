'use client';
import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import TapeSVG from 'components/tape/tape';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Zone } from 'styles';
import { Color } from 'types';
import subInstance from 'utils/api/sub';

const Cry = dynamic(() => import('@icon/cry.svg'));

const GuestEntry = () => {
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerTapeTitle, setOwnerTapeTitle] = useState<string>('');
  const [ownerTapeColor, setOwnerTapeColor] =
    useState<Color>('cassette_orange');
  const [hasFullTape, setHasfullTape] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');

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
            setDate(data?.timestamp.slice(2, 10).replaceAll('-', '.'));
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
              date={date}
              sec="144"
              color={ownerTapeColor}
            />
            <p>
              평소 전하지 못했던 마음을 <br /> 목소리로 담아보세요 ♡
            </p>
          </Zone>
          <Zone css={{ paddingTop: '176px' }}>
            <Button
              variant="guest"
              color={ownerTapeColor}
              onClick={
                hasFullTape
                  ? () => setModalOpen(true)
                  : () => route.push(GUEST_CREATE_URL)
              }
            >
              목소리 남겨주기
            </Button>
          </Zone>
        </Container>
      ) : null}
    </>
  );
};

export default GuestEntry;
