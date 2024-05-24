package sw.swe.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sw.swe.service.UserService;

import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String userName;
    private String userPW;
    private String userType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public static User createUser(String userName, String userPW, String userType){
        User user = new User();
        user.setUserName(userName);
        user.setUserPW(userPW);
        user.setUserType(userType);

        return user;
    }

    public void setProject(Project project){
        this.project = project;
        project.getUserList().add(this);
    }
}
