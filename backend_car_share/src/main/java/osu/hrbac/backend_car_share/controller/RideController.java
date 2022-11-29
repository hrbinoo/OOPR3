package osu.hrbac.backend_car_share.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import osu.hrbac.backend_car_share.model.Place;
import osu.hrbac.backend_car_share.model.Ride;
import osu.hrbac.backend_car_share.service.RideService;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/ride")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping("/create/")
    public ResponseEntity<Ride> createRide(@RequestBody RideDTO rideDTO){
        Ride ride = new Ride();
        ride.setStartDateAndTime(rideDTO.getStartDateTime());
        ride.setStart(rideDTO.getStart());
        ride.setDestination(rideDTO.getDestination());
        return ResponseEntity.ok().body(rideService.createRide(ride, rideDTO.getUserID()));
    }
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class RideDTO{
    private LocalDateTime startDateTime;
    private Place start;
    private Place destination;
    private UUID userID;
}
