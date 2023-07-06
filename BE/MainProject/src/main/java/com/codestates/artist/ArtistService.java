package com.codestates.artist;

import com.codestates.artist.dto.ArtistDto;
import com.codestates.category.Category;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.member.Member;
import com.codestates.member.MemberRepository;
import com.codestates.member.dto.MemberPatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final EntityManager em;


    public Artist createArtist(Artist artist){
        verifyArtistName(artist.getArtistName());

        Artist savedArtist = artistRepository.save(artist);
        return savedArtist;
    }

    public Artist updateArtist(ArtistDto artistDto) {
        verifyArtistName(artistDto.getArtistName());

        Artist artist = em.find(Artist.class, artistDto.getArtistId());
        artist.setArtistName(artistDto.getArtistName());
        artist.setImageUrl(artistDto.getImageUrl());
        artist.setContent(artistDto.getContent());

        return artistRepository.save(artist);
    }
    public Artist findArtist(long artistId) {

        return findVerifiedArtist(artistId);
    }
    public List<Artist> findCategoryArtists(Category category){
        return artistRepository.findAllByCategory(category);}
    public Page<Artist> findArtists(Category category, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("artistId").descending());


        return artistRepository.findAllByCategory(category,pageable);
    }


    public void deleteArtist(long artistId) {
        Artist findArtist = findVerifiedArtist(artistId);

        artistRepository.delete(findArtist);
    }

    public Artist findVerifiedArtist(long artistId) {
        Optional<Artist> optionalArtist =
                artistRepository.findById(artistId);
        Artist findArtist =
                optionalArtist.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.ARTIST_NOT_FOUND));
        return findArtist;
    }

    private void verifyArtistName(String artistName) {
        Optional<Artist> artist = artistRepository.findByArtistName(artistName);
        if (artist.isPresent())
            throw new BusinessLogicException(ExceptionCode.ARTIST_EXISTS);
    }

}
