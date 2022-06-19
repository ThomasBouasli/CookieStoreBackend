import { useCallback, useEffect, useState } from 'react';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/icons-material/Add';

import useBackend from '../../Hooks/useBackend';

import * as PS from '../../Styles/pages';
import * as S from './styles';

import cookieImage from '../../Assets/cookie.png';

export default function Home() {
  const [cookies, setCookies] = useState([]);

  const { getAllCookiesFromUser, bakeCookie } = useBackend();

  const getCookies = useCallback(async () => {
    const cookies = await getAllCookiesFromUser();
    setCookies(cookies);
  }, []);

  useEffect(() => {
    getCookies();
  }, [getCookies]);

  const sendBakeCookieRequest = useCallback(async () => {
    await bakeCookie();
    getCookies();
  }, [bakeCookie, getCookies]);

  return (
    <PS.Page>
      <PS.Title>Main</PS.Title>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={sendBakeCookieRequest}
      ></SpeedDial>
      <S.Wrapper>
        {cookies?.map((cookie) => (
          //@ts-ignore
          <S.Cookie key={cookie.id}>
            <img src={cookieImage} alt="" />
            {/* @ts-ignore */}
            <span>{cookie?.name}</span>
          </S.Cookie>
        ))}
      </S.Wrapper>
    </PS.Page>
  );
}
