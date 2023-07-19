import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const clientId: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';
  const navigate = useNavigate();
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={res => {
            console.log(res);
            navigate('/');
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
