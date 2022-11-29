package osu.hrbac.backend_car_share.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import osu.hrbac.backend_car_share.model.User;

import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    User getUserById(UUID id);
    User findUserByEmailAndPassword(String email, String password);

    User save(User user);

}
