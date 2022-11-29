package osu.hrbac.backend_car_share.service;

import org.springframework.stereotype.Service;
import osu.hrbac.backend_car_share.model.Ride;

import java.util.UUID;

@Service
public interface RideService {
    Ride createRide(Ride ride, UUID userId);
}
