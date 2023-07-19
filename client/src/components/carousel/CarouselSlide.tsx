import { ButtonWithArrowLight } from '../buttons/Buttons';
import { Link } from 'react-router-dom';
import { Styled_CarouselSlide } from './CarouselSlide.styled';

type OwnProps = {
  posterImg: string;
  title: string;
  performanceArtist: number;
  category: string;
  price: number;
  date: string;
  categoryId: number;
};
const CarouselSlide: React.FC<OwnProps> = ({
  posterImg,
  title,
  performanceArtist,
  category,
  price,
  date,
  categoryId,
}) => {
  const concertDate = new Date(date);
  return (
    <>
      <Styled_CarouselSlide.Div>
        <Styled_CarouselSlide.ConcertpreviewWrapper>
          <Styled_CarouselSlide.ConcertImg src={posterImg} />
          <Styled_CarouselSlide.ConcertDetail>
            <Styled_CarouselSlide.ConcertTitle>
              {title}
            </Styled_CarouselSlide.ConcertTitle>
            <Styled_CarouselSlide.Concertcontent>
              {performanceArtist}
            </Styled_CarouselSlide.Concertcontent>
            <Styled_CarouselSlide.Concertcontent>
              {category}
            </Styled_CarouselSlide.Concertcontent>
            <Styled_CarouselSlide.Concertcontent>
              ₩ {price.toLocaleString()}
            </Styled_CarouselSlide.Concertcontent>
            <Styled_CarouselSlide.Concertcontent>
              {concertDate.toLocaleDateString()}
            </Styled_CarouselSlide.Concertcontent>
            <Link
              to={`/performances/${categoryId}`}
              style={{ textDecorationLine: 'none' }}
            >
              <ButtonWithArrowLight text={'공연예약'}></ButtonWithArrowLight>
            </Link>
          </Styled_CarouselSlide.ConcertDetail>
        </Styled_CarouselSlide.ConcertpreviewWrapper>

        <Styled_CarouselSlide.ImgDiv
          style={{ backgroundImage: `url(${posterImg})` }}
        />
      </Styled_CarouselSlide.Div>
    </>
  );
};

export default CarouselSlide;
