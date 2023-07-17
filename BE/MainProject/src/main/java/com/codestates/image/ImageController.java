package com.codestates.image;

import com.codestates.performance.dto.PerformanceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/image")
@RestController
@RequiredArgsConstructor
public class ImageController {
    private final ImageUploadService imageUploadService;

    @PostMapping
    public ResponseEntity postImage(@RequestPart("image-file") MultipartFile imageFile) throws IOException {
    String imageUrl = imageUploadService.imageUpload(imageFile);

        return new ResponseEntity<>(imageUrl, HttpStatus.CREATED);

    }
}
