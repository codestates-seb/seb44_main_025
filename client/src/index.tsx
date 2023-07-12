import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Notfoundpage from './pages/notfondpage';
import PerformanceList from './pages/PerformanceList';
import PerformanceInfo from './pages/PerformanceInfo';
import PerformanceRegister from './pages/PerformanceRegister';
import Artistpage from './pages/artistpage';
import Mypage from './pages/mypage';
import Editmypage from './pages/editmypage';
import Artistregist from './pages/artistregistpage';
import Cancelpage from './pages/cancelpage';
import SignUpPage from './pages/SignUpIn/SignUpPage';
import SignInPage from './pages/SignUpIn/SignInPage';
import ArtistList from './pages/ArtistList';
import Main from './pages/Main';

/** @todo 도메인 주소 입력 */
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;

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
        path: '/artistpage',
        element: <Artistpage />,
      },
      {
        path: '/mypage/artistpage',
        element: <Artistpage />,
      },
      {
        path: '/mypage/editmypage',
        element: <Editmypage />,
      },
      {
        path: '/mypage/artistregistpage',
        element: <Artistregist />,
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
