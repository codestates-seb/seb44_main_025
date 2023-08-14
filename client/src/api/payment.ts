import axios from 'axios';

// TODO: 실제 body 작성하여 보내기
const body = {
  cid: 'TC0ONETIME',
  partner_order_id: '0000',
  partner_user_id: '0000',
  item_name: '초코파이',
  quantity: 1,
  total_amount: 10000,
  tax_free_amount: 9000,
  approval_url: 'https://ez-to-play.netlify.app/',
  cancel_url: 'https://ez-to-play.netlify.app/',
  fail_url: 'https://ez-to-play.netlify.app/',
};

/** 접속 기기의 터치 이벤트 사용가능 여부에 따라 mobile, PC 기기로 구분합니다. */
const isMobile = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};

export const fetchPayment = () => {
  return axios
    .post('https://kapi.kakao.com/v1/payment/ready', body, {
      headers: {
        Authorization: 'KakaoAK 6736b5f3485598606c0e7f1031762c5e',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-7',
      },
    })
    .then(data => {
      window.open(
        isMobile()
          ? data.data.next_redirect_mobile_url
          : data.data.next_redirect_pc_url
      );
    })
    .catch(err => console.error(err));
};
