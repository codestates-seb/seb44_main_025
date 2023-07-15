import { styled } from 'styled-components';
import { ButtonWithArrowLight } from '../buttons/Buttons';
// import reactDom from 'react-dom';

interface Props {
  onClick: React.MouseEventHandler<HTMLElement>;
}

// export const ModalPotal = ({ children }: { children: any }) => {
//   const el = document.getElementById('modal');
//   return reactDom.createPortal(children, el);
// };

export default function NoTicketModal({ onClick }: Props) {
  return (
    <S.ModalOverlay onClick={onClick}>
      <S.TicketModal>
        <S.TicketImg>
          <S.Ticketcontent>예약한 공연이 없어요...</S.Ticketcontent>
        </S.TicketImg>
        <S.TicketDetail>
          {/* 버튼 클릭시 공연 페이지로 이동 */}
          <ButtonWithArrowLight text={'공연예약'}></ButtonWithArrowLight>
        </S.TicketDetail>
      </S.TicketModal>
    </S.ModalOverlay>
  );
}

const S = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  `,
  TicketModal: styled.div`
    width: 300px;
    height: 500px;
    background-color: var(--font-mid-color);
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  `,
  TicketImg: styled.div`
    width: 300px;
    height: 400px;
    background-color: var(--theme-background-color);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TicketDetail: styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background-highlight-color);
  `,

  Ticketcontent: styled.p`
    font-size: var(--p-small-medium-font-size);
    font-weight: var(--p-small-medium-font-weight);
    line-height: var(--p-small-medium-line-height);
    color: var(--font-light-white-color);
  `,
};
