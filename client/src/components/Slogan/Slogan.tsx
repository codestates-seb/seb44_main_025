import { styled } from 'styled-components';

const Slogan = () => {
  return (
    <S.Container>
      <div></div>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 60px;
    border-radius: 30px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url('./images/단체사진.jpg');
    background-size: cover;
    background-position: center;
  `,
};

export default Slogan;
