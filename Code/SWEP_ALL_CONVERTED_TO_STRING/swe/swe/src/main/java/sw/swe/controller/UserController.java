package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.User;
import sw.swe.service.UserService;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public Long createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> listUsers() {
        return userService.findUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findOne(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    //@CrossOrigin // 크롬과 같은 브라우져에서 보안 때문에 요청을 막는걸 허용해주는 어노테이션인 것 같습니다.
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String userName = loginRequest.get("userName");
        String userPW = loginRequest.get("userPW");

        if(userService.authenticate(userName, userPW)){
            if(userService.isAdmin(userService.findUserByName(userName).get(0).getId())){
                return ResponseEntity.ok("Admin Login successful");
            }
            else{
                return ResponseEntity.ok("Login successful");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Login");
        }
    }
}
