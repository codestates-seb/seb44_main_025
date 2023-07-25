import Header from '../../components/header/Header';
import { ButtonHighlightBorder } from '../../components/buttons/Buttons';
import { Input } from '../../components/inputs/Inputs';
import { Styled_Cancel } from './Cancel.styled';
import { H1Title } from '../../utils/SlideUp';
import { useState } from 'react';
import axios from 'axios';
import { removeCookie, getCookie } from '../../utils/Cookie';
import { useNavigate } from 'react-router-dom';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

export default function Cancelpage() {
  const [password, setPassword] = useState('');
  const [isWrongPassword, setIsWrongPassword] = useState('light');
  const navigate = useNavigate();

  const postPassword = () => {
    axios
      .delete(`${SERVER_HOST}/member`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getCookie('accessToken')}`,
        },
        data: {
          password: password,
        },
      })
      .then(response => {
        if (response.status === 204) {
          alert('[회원탈퇴 성공] 탈퇴 되었습니다');
          navigate('/');
          setIsWrongPassword('light');
          removeCookie('accessToken');
          removeCookie('refreshToken');
          removeCookie('userInfo');
        }
      })
      .catch(() => {
        setIsWrongPassword('warning');
        alert('비밀번호를 확인해주세요');
      });
  };

  return (
    <>
      <Header precious={true} />
      <Styled_Cancel.Main>
        <Styled_Cancel.Section>
          <Styled_Cancel.Title>
            <H1Title.H1>
              <H1Title.H1span>회원탈퇴</H1Title.H1span>
            </H1Title.H1>
          </Styled_Cancel.Title>

          <Styled_Cancel.Content>
            <Styled_Cancel.UserDetail>
              <Styled_Cancel.SubTitle>
                정말 탈퇴하시겠습니까?
              </Styled_Cancel.SubTitle>

              <Styled_Cancel.InputContainer>
                <Styled_Cancel.InputLabel>
                  비밀번호 확인
                </Styled_Cancel.InputLabel>
                {isWrongPassword === 'light' ? (
                  <Input
                    type="password"
                    value={password}
                    theme="light"
                    setValue={setPassword}
                  />
                ) : (
                  <>
                    <Input
                      type="password"
                      value={password}
                      theme="warning"
                      setValue={setPassword}
                    />
                    <Styled_Cancel.ErrorMessage>
                      비밀번호가 다릅니다
                    </Styled_Cancel.ErrorMessage>
                  </>
                )}
              </Styled_Cancel.InputContainer>

              <Styled_Cancel.HighlightButtonWarppar>
                <ButtonHighlightBorder onClick={postPassword}>
                  회원탈퇴
                </ButtonHighlightBorder>
              </Styled_Cancel.HighlightButtonWarppar>
            </Styled_Cancel.UserDetail>
          </Styled_Cancel.Content>
        </Styled_Cancel.Section>
      </Styled_Cancel.Main>
    </>
  );
}
