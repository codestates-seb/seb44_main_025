package com.codestates.member;

import com.codestates.artist.Artist;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long memberId;
    @Column(length = 50, nullable = false, updatable = true, unique = true, name = "email")
    private String email;
    @Column(length = 50, nullable = false, updatable = true, unique = true, name = "nickname")
    private String nickname;
    @Column(nullable = false, updatable = true, unique = false, name = "password")
    private String password;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
    @OneToOne(mappedBy = "member")
    private Artist artist;

    public Member(String email, String nickname, String password){
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

}
