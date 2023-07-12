import { Styled_HomePageButton } from './HomePageButton.styled';

interface HomePageButtonProps {
  Height: 140 | 60;
  ImageUrl: string;
  Text: string;
}

const HomePageButton = ({ Height, ImageUrl, Text }: HomePageButtonProps) => {
  return (
    <>
      <Styled_HomePageButton.Container height={Height} imageurl={ImageUrl}>
        <Styled_HomePageButton.Span>{Text}</Styled_HomePageButton.Span>
      </Styled_HomePageButton.Container>
    </>
  );
};

export default HomePageButton;
