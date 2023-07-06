package com.codestates.snslink;

import com.codestates.artist.Artist;

import javax.persistence.*;

@Entity
public class SnsLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sns_link_id", nullable = false, updatable = false, unique = true)
    private long snsLinkId;

    @Column(name = "sns_link", nullable = false)
    private String snsLink;

    @ManyToOne
    @JoinColumn
    private Artist artist;


}
