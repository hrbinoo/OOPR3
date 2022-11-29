package osu.hrbac.backend_car_share;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import osu.hrbac.backend_car_share.model.Car;
import osu.hrbac.backend_car_share.model.User;
import osu.hrbac.backend_car_share.service.UserService;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendCarShareApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(BackendCarShareApplication.class, args);


    }


    @Autowired
    UserService userService;

    @Override
    public void run(String... args) throws Exception {

//        List<Car> cars =  new ArrayList<>();
//        cars.add(new Car("Skoda", "Blue", "8T6 0000", "Sedan"));
//
//        userService.save(new User("Jirka", "Juur", "jirka@gmail.com", "heslo", cars, null, null));


    }

}
