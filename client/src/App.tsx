import { Outlet } from 'react-router-dom';
import { useGetMember } from './api/useFetch';
import { useEffect } from 'react';
import { useUserInfo } from './zustand/userInfo.stores';

function App() {
  const getMember = useGetMember();
  const { setUserInfo } = useUserInfo();

  useEffect(() => {
    setUserInfo({
      memberId: getMember?.memberId,
      hasArtist: getMember?.hasArtist,
      artistId: getMember?.artistId,
    });
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
