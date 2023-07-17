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
    private final MemberRepository memberRepository;
    private final EntityManager em;


    public Artist createArtist(Artist artist, long memberId){
        verifyArtistName(artist.getArtistName());

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.get();
        boolean hasArtist = memberHasArtist(member);

        if(hasArtist==false){
            Artist savedArtist = artistRepository.save(artist);
        return savedArtist;}
        else throw new BusinessLogicException(ExceptionCode.MEMBER_HAS_ARTIST);
    }

    public Artist updateArtist(ArtistDto artistDto) {
        verifyArtistName(artistDto.getArtistName());

        Artist artist = em.find(Artist.class, artistDto.getArtistId());
        artist.setArtistName(artistDto.getArtistName());
        artist.setImageUrl(artistDto.getImageUrl());
        artist.setContent(artistDto.getContent());
        artist.setCategory(new Category(artistDto.getCategoryId()));
        artist.setSnsLink(artistDto.getSnsLink());

        return artistRepository.save(artist);
    }
    public Artist findArtist(long artistId) {

        return findVerifiedArtist(artistId);
    }

    public Page<Artist> findPageArtist(Category category, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        return artistRepository.findAllByCategoryOrderByArtistIdDesc(category, pageRequest);
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

    public boolean memberHasArtist(Member member){

        Optional<Artist> artist = artistRepository.findByMember(member);
        boolean result = false;
        if(artist.isPresent()){
            result = true;}
        return result;
    }
    public long findArtistId(Member member){

        Optional<Artist> artist = artistRepository.findByMember(member);
        long result = artist.get().getArtistId();

        return result;
    }

    public boolean duplicateArtistName(String artistName){
        boolean result = false;
        Optional<Artist> artist = artistRepository.findByArtistName(artistName);
        if (artist.isPresent()){
            result = true;}
        return result;
    }

}
