package osu.hrbac.backend_car_share.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import osu.hrbac.backend_car_share.model.User;
import osu.hrbac.backend_car_share.repository.UserRepository;
import osu.hrbac.backend_car_share.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User findByEmailAndPassword(String email, String password){
        return userRepository.findUserByEmailAndPassword(email, password);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }


}
