import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Notfoundpage from './pages/notfondpage';
import Mypage from './pages/mypage';
import Editmypage from './pages/editmypage';
import Artistpage from './pages/artistpage';
import Artistregist from './pages/artistregistpage';
import Cancelpage from './pages/cancelpage';

/** @todo 도메인 주소 입력 */
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfoundpage />,
    children: [
      {
        path: '/performances',
        element: <div>공연 리스트</div>,
      },
      {
        path: '/performances/:performanceId',
        element: <div>공연 상세정보</div>,
      },
      {
        path: '/performances/register',
        element: <div>공연 등록</div>,
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
        path: '/artistpage',
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
