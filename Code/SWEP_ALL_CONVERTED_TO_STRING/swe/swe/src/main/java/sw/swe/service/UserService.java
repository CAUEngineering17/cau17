package sw.swe.service;

import lombok.RequiredArgsConstructor;
import sw.swe.domain.User;
import sw.swe.domain.UserType;
import sw.swe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    /**
     * 유저 이름으로 조회
     */
    @Transactional
    public Long join(User user) {
        validateDuplicateUser(user); // 중복 회원 검증
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateUser(User user) {
        List<User> findUsers = userRepository.findByName(user.getUserName());
        if (!findUsers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }


    /**
     * 유저 전체 조회
     */
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    /**
     * 유저 고유 Id를 통한 조회
     */
    public User findOne(Long userId) {
        return userRepository.findOne(userId);
    }

    /**
     * 유저 이름(userName, 로그인 할떄 그 id)을 통한 조회
     */
    public List<User> findUserByName(String userName) {return userRepository.findByName(userName);}

    /**
     * 해당 유저가 Admin인지 확인
     */
    public boolean isAdmin(Long userId) {
        if(userRepository.findOne(userId).getUserType() == UserType.ADMIN){
            return true;
        }
        else
            return false;
    }

    /**
     * 유저 삭제
     */
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findOne(userId);
        if (user != null) {
            userRepository.delete(user);
        } else {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
    }
}
