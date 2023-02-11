'use client';

import Button from 'components/button';
import TapeSVG from 'components/tape/tape';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGuestResponsStore } from 'store';
import { Container, Zone } from 'styles';
import theme from 'styles/theme';
import { Color } from 'types';
import subInstance from 'utils/api/sub';

const GuestEntry = () => {
  const router = useRouter();
  const { id } = router.query;

  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerTapeTitle, setOwnerTapeTitle] = useState<string>('');
  const [ownerTapeColor, setOwnerTapeColor] =
    useState<Color>('cassette_orange');
  const { setResponsUser } = useGuestResponsStore();
  const [date, setDate] = useState<string>('');

  const GUEST_CREATE_URL = `/guest/${id}/create-tape-guest`;

  useEffect(() => {
    if (id) {
      subInstance.getOwnerTape(id as string).then((data) => {
        setOwnerName(data?.result?.name),
          setOwnerTapeTitle(data?.result?.title),
          setOwnerTapeColor(data?.result?.colorCode),
          setDate(data.timestamp.slice(2, 10).replaceAll('-', '.')),
          setResponsUser(id as string);
      });
    }
  }, [id, ownerName, ownerTapeTitle, setResponsUser]);

  return (
    <>
      {id ? (
        <Container>
          <Zone css={{ gap: '32px' }}>
            <div>
              <h1>{ownerName}&apos;s Tape</h1>
              <h3>{ownerTapeTitle}</h3>
            </div>
            <TapeSVG
              title={ownerTapeTitle}
              date={date}
              sec="144"
              // color={theme.colors[ownerTapeColor]}
            />
            <p>
              평소 전하지 못했던 마음을 <br /> 목소리로 담아보세요 ♡
            </p>
          </Zone>
          <Zone css={{ paddingTop: '176px' }}>
            <Link href={GUEST_CREATE_URL}>
              <Button variant="guest" color={ownerTapeColor}>
                목소리 남겨주기
              </Button>
            </Link>
          </Zone>
        </Container>
      ) : null}
    </>
  );
};

export default GuestEntry;
