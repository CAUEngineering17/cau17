package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.User;
import sw.swe.service.ProjectService;
import sw.swe.service.UserService;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    /**
     * 계정 생성
     * @param createuserRequest
     * @return
     */
    @PostMapping("/create")
    public boolean createUser(@RequestBody Map<String, String> createuserRequest) {
        String username = createuserRequest.get("id");
        String password = createuserRequest.get("password");
        String confirmPassword = createuserRequest.get("confirmPassword");
        String userType = createuserRequest.get("role");
        String projectName = createuserRequest.get("project");

        User user = User.createUser(username, password, userType);

        if(password.equals(confirmPassword)) {
            user.setProject(projectService.findProjectsByTitle(projectName).get(0));

            Long tmpId = userService.saveUser(user);

            return true;
        }
        else
            return false;
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

    /**
     * 로그인 기능
     * @param loginRequest
     * @return
     */
    @PostMapping("/login")
    public boolean login(@RequestBody Map<String, String> loginRequest) {
        String userName = loginRequest.get("id");
        String userPW = loginRequest.get("password");

        return userService.authenticate(userName, userPW);
    }

    /**
     * 어드민인지 확인
     * @param usernameRequest
     * @return
     */
    @PostMapping("/isAdmin")
    public boolean isAdmin(@RequestBody Map<String, String> usernameRequest) {
        String userName = usernameRequest.get("id");

        return userService.isAdmin(userService.findUserByName(userName).get(0).getId());
    }
}
