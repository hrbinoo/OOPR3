package osu.hrbac.backend_car_share.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String manufacturer;
    private String colour;
    private String licencePlate;
    private String type;

    public Car(String manufacturer, String colour, String licencePlate, String type) {
        this.manufacturer = manufacturer;
        this.colour = colour;
        this.licencePlate = licencePlate;
        this.type = type;
    }
}
