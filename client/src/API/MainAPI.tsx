import axios from 'axios';
import { CarouselList, ArtistList } from '../zustand/mainapi';

export const useGetMainData = async () => {
  const { setCarouselData } = CarouselList();
  const { setArtistData } = ArtistList();
  try {
    const response = await axios.get('/dummy/main.json');
    setCarouselData(response.data.performances);
    setArtistData(response.data.artists);
  } catch (error) {
    console.error(error);
  }
};

export default useGetMainData;
// useGetMainData();
