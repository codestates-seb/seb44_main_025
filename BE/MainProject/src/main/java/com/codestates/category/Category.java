package com.codestates.category;

import com.codestates.artist.Artist;
import com.codestates.performance.entity.Performance;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;
import java.util.List;
@CrossOrigin
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false, unique = true, updatable = false)
    private long categoryId;
    @Column(name = "category", nullable = false, unique = true, updatable = false)
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Artist> artists;

    @JsonManagedReference
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Performance> performances;


    public Category(String category)
    {this.category = category;}
    public Category(long categoryId)
    {this.categoryId = categoryId;}

}
