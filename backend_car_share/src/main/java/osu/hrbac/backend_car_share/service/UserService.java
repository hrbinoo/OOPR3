package osu.hrbac.backend_car_share.service;

import org.springframework.stereotype.Service;
import osu.hrbac.backend_car_share.model.User;

@Service
public interface UserService {
    User findByEmailAndPassword(String email, String password);
    User save(User user);
}
