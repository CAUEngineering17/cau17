package SW.SWEP;

import SW.SWEP.main.user.User;
import SW.SWEP.main.user.UserOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {

    @GetMapping("/swe")
    public String swe() {
        return "Hello, World!";
    }
}
