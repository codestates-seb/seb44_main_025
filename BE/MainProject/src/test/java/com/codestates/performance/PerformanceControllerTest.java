package com.codestates.performance;

import com.codestates.artist.mapper.ArtistMapper;
import com.codestates.artist.ArtistService;
import com.codestates.artist.mapper.ArtistDtoToArtist;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PerformanceControllerTest {
    @Autowired
    private PerformanceMapper mapper;
    @Autowired
    private PerformanceService performanceService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ArtistService artistService;
    @Autowired
    private ArtistMapper artistMapper;
    @Autowired
    private ArtistDtoToArtist artistDtoToArtist;

    @Test
    public void postPerformance() {
        Category category = categoryService.createCategory(new Category("락"));

        //ArtistDto artistDto = new ArtistDto("아티스트명","컨텐츠","https://eztoplay-aws-bucket.s3.ap-northeast-2.amazonaws.com/img.jpg", 1L);

        //Artist artist = artistService.createArtist(artistDtoToArtist.change(artistDto));
//        PerformanceDto.Post performanceDto = new PerformanceDto.Post(
//                "공연1",
//                List.of(1L),
//                "테스트",
//                "2023-07-05 00:00:00",
//                10000,
//                "홍대",
//                100,
//                1,
//                "https://eztoplay-aws-bucket.s3.ap-northeast-2.amazonaws.com/img.jpg"
//        );

//        Performance performance = mapper.performancePostDtoToPerformance(performanceDto, categoryService, artistService);
//        performanceService.createPerformance(performance);
    }

    @Test
    public void patchPerformance() {

    }
}
