package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sw.swe.domain.User;
import sw.swe.domain.UserType;
import sw.swe.repository.UserRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)    // Junit 실핼할 때 스프링과 엮어서 실행
@SpringBootTest                 // 스프링부트를 띄운 상태로 테스트를 진행
@Transactional                  // 실제로 DB에 insert 문을 삽입하지 않고 Rollback함. 테스트를 용이하게 해준다.
public class UserServiceTest {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    //@Rollback(false)
    @Test
    public void 회원가입() throws Exception{
        User user = new User();
        user.setUserName("Frank");
        user.setUserPW("Frank");
        user.setUserType(UserType.ADMIN);

        Long tmpId = userService.saveUser(user);

        assertEquals(user, userRepository.findOne(tmpId));
    }


}