import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Notfoundpage from './pages/NotFound';
import PerformanceList from './pages/performance-list/PerformanceList';
import PerformanceInfo from './pages/performance-info/PerformanceInfo';
import PerformanceRegister from './pages/performance-register/PerformanceRegister';
import Artistpage from './pages/artist/Artist';
import Mypage from './pages/mypage/MyPage';
import Editmypage from './pages/mypage/EditMyPage';
import Artistregist from './pages/artist-register/ArtistRegister';
import Cancel from './pages/cancel/Cancel';
import SignUpPage from './pages/sign/SignUp';
import SignInPage from './pages/sign/SignIn';
import ArtistList from './pages/artist-list/ArtistList';
import Home from './pages/home/Home';
import ReviewRegister from './pages/review/ReviewRegister';
import Artistedit from './pages/artist-register/ArtistEdit';

/** @todo 도메인 주소 입력 */
// axios.defaults.baseURL = '';
// axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Notfoundpage />,
    children: [
      { index: true, element: <Home /> },
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
        path: '/mypage/:memberId',
        element: <Mypage />,
      },
      {
        path: '/artists',
        element: <ArtistList />,
      },
      {
        path: '/artist/:artistId',
        element: <Artistpage />,
      },
      {
        path: '/editmypage',
        element: <Editmypage />,
      },
      {
        path: '/artistregist',
        element: <Artistregist />,
      },
      {
        path: '/artistedit',
        element: <Artistedit />,
      },

      {
        path: '/cancel',
        element: <Cancel />,
      },
      {
        path: '/performances/review/write/:performanceId',
        element: <ReviewRegister />,
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
