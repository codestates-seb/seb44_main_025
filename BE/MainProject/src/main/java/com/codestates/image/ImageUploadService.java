package com.codestates.image;

import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class ImageUploadService {
    public String imageUpload(MultipartFile image) {
        return "asf";
    }
}
