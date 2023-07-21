import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';
import GoogleLogoIcon from '../../icons/GoogleLogoIcon';
import { Styled_GoogleButton } from './GoogleButton.style';

interface GoogleButtonProps {
  naviUrl: string;
  title: string;
}

const GoogleButton = ({ naviUrl, title }: GoogleButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      width={250}
      type="button"
      onClick={() => {
        navigate(naviUrl);
      }}
    >
      <Styled_GoogleButton.Div>
        <GoogleLogoIcon />
        <p>{`구글 ${title} 바로가기`}</p>
      </Styled_GoogleButton.Div>
    </Button>
  );
};

export default GoogleButton;
