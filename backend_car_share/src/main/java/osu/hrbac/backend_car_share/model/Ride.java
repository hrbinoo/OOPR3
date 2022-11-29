package osu.hrbac.backend_car_share.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private LocalDateTime startDateAndTime;

    @OneToOne
    private Place start;

    @OneToOne
    private Place destination;

    @OneToOne
    private User driver;

    @OneToMany
    private List<User> passengers;


}
