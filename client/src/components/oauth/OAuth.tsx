import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const clientId: string = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={res => {
            console.log(res);
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
