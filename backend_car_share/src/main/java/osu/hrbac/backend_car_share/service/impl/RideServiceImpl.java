package osu.hrbac.backend_car_share.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osu.hrbac.backend_car_share.model.Ride;
import osu.hrbac.backend_car_share.model.User;
import osu.hrbac.backend_car_share.repository.RideRepository;
import osu.hrbac.backend_car_share.repository.UserRepository;
import osu.hrbac.backend_car_share.service.RideService;

import java.util.UUID;

@Service
public class RideServiceImpl implements RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;

    public Ride createRide(Ride ride, UUID userId){
        User driver = userRepository.getUserById(userId);
        ride.setDriver(driver);
        rideRepository.save(ride);
        return ride;
    }
}
