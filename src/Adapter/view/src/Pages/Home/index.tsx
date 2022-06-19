import { useCallback, useEffect, useState } from 'react';
import Button from '../../Components/Button';
import useBackend from '../../Hooks/useBackend';
import * as PS from '../../Styles/pages';

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
      <Button text="Bake Cookie" onClick={sendBakeCookieRequest} />
      {cookies?.map((cookie) => (
        // @ts-ignore
        <div key={cookie?.id}>
          {/* @ts-ignore */}
          <span>{cookie?.name}</span>
        </div>
      ))}
    </PS.Page>
  );
}
