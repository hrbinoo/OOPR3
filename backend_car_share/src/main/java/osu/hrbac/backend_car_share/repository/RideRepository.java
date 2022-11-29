package osu.hrbac.backend_car_share.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import osu.hrbac.backend_car_share.model.Ride;

import java.util.UUID;

@Repository
public interface RideRepository extends CrudRepository<Ride, UUID> {

}
