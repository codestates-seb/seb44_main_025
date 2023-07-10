import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Notfoundpage from './pages/notfondpage';
import Mypage from './pages/mypage';
import Editmypage from './pages/editmypage';
import Artistpage from './pages/artistpage';
import Artistregist from './pages/artistregistpage';
import Cancelpage from './pages/cancelpage';
import PerformanceList from './pages/PerformanceList';
import PerformanceInfo from './pages/PerformanceInfo';
import PerformanceRegister from './pages/PerformanceRegister';
import ArtistList from './pages/ArtistList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfoundpage />,
    children: [
      {
        path: '/performances',
        element: <PerformanceList />,
      },
      {
        path: '/performances/:performanceId',
        element: <PerformanceInfo />,
      },
      {
        path: '/performances/register',
        element: <PerformanceRegister />,
      },
      {
        path: '/login',
        element: <div>로그인</div>,
      },
      {
        path: '/signup',
        element: <div>회원가입</div>,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/artists',
        element: <ArtistList />,
      },
      {
        path: '/artists/:artistId',
        element: <Artistpage />,
      },
      {
        path: '/mypage/editmypage',
        element: <Editmypage />,
      },
      {
        path: '/artistregistpage',
        element: <Artistregist />,
      },
      {
        path: '/mypage/editmypage/cancelpage',
        element: <Cancelpage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
