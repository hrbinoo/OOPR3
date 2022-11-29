package osu.hrbac.backend_car_share.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String username;
    private String email;
    private String password;
    @OneToMany(cascade=CascadeType.ALL)
    private List<Car> cars;
    @OneToMany(cascade=CascadeType.ALL)
    private List<Rating> ratingsBeRated; // hodnoceni ktere user dostal
    @OneToMany(cascade=CascadeType.ALL)
    private List<Rating> ratingsRatedOthers; // hodnoceni ktere user dava

    public User(String name, String username, String email, String password, List<Car> cars, List<Rating> ratingsBeRated, List<Rating> ratingsRatedOthers) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cars = cars;
        this.ratingsBeRated = ratingsBeRated;
        this.ratingsRatedOthers = ratingsRatedOthers;
    }
}
