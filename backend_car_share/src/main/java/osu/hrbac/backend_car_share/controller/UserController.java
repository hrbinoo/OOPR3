package osu.hrbac.backend_car_share.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import osu.hrbac.backend_car_share.model.User;
import osu.hrbac.backend_car_share.service.UserService;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> userLogin(@RequestBody LoginUser user){
        return ResponseEntity.ok().body(
                userService.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword())
        );
    }
}

@Getter
@Setter
@AllArgsConstructor
class LoginUser {
    private String email;
    private String password;
}
