import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Notfoundpage from './pages/NotFound';
import PerformanceList from './pages/PerformanceList';
import PerformanceInfo from './pages/PerformanceInfo';
import PerformanceRegister from './pages/performance-register/PerformanceRegister';
import Artistpage from './pages/Artist';
import Mypage from './pages/MyPage';
import Editmypage from './pages/EditMyPage';
import Artistregist from './pages/ArtistRegister';
import Cancelpage from './pages/Cancel';
import SignUpPage from './pages/sign/SignUp';
import SignInPage from './pages/sign/SignIn';
import ArtistList from './pages/ArtistList';
import Main from './pages/Main';

/** @todo 도메인 주소 입력 */
// axios.defaults.baseURL = '';
// axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfoundpage />,
    children: [
      { index: true, element: <Main /> },
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
        element: <SignInPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
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
        path: '/artist',
        element: <Artistpage />,
      },
      {
        path: '/mypage/artist',
        element: <Artistpage />,
      },
      {
        path: '/artistregist/artist',
        element: <Artistpage />,
      },
      {
        path: '/mypage/artistregist/artist',
        element: <Artistpage />,
      },
      {
        path: '/mypage/editmypage',
        element: <Editmypage />,
      },
      {
        path: '/mypage/artistregist',
        element: <Artistregist />,
      },
      {
        path: '/artistregist',
        element: <Artistregist />,
      },
      {
        path: '/mypage/editmypage/cancel',
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
