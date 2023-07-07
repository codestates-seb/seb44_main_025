import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

/** @todo 도메인 주소 입력 */
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
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
        element: <div>마이 페이지</div>,
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
