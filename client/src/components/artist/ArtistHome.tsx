import { ArtistList } from '../../zustand/homepage.stores';
import { Link } from 'react-router-dom';
import { Styled_ArtistHome } from './ArtistHome.styled';
import { ArtistData } from '../../model/Artist';

export default function ArtistHome() {
  const { artistData } = ArtistList();

  return (
    <Styled_ArtistHome.ArtistpreviewMain>
      <Styled_ArtistHome.Subtitle>
        Ez to Play에서 활동중인 아티스트예요!
      </Styled_ArtistHome.Subtitle>
      <Link to="/artists" style={{ textDecorationLine: 'none' }}>
        <Styled_ArtistHome.veiwAll>전체보기</Styled_ArtistHome.veiwAll>
      </Link>

      <Styled_ArtistHome.ArtistpreviewContainer>
        {artistData.map((v: ArtistData, i) => {
          return (
            <Link
              to={`/artistpage/${v.artistId}`}
              style={{ textDecorationLine: 'none' }}
              key={i}
            >
              <Styled_ArtistHome.ArtistpreviewWrapper>
                <Styled_ArtistHome.ArtistImg src={v.profileimageUrl} />
                <Styled_ArtistHome.ArtistDetail>
                  <Styled_ArtistHome.Artistcontent>
                    {v.artistname}
                  </Styled_ArtistHome.Artistcontent>
                </Styled_ArtistHome.ArtistDetail>
              </Styled_ArtistHome.ArtistpreviewWrapper>
            </Link>
          );
        })}
      </Styled_ArtistHome.ArtistpreviewContainer>
    </Styled_ArtistHome.ArtistpreviewMain>
  );
}
