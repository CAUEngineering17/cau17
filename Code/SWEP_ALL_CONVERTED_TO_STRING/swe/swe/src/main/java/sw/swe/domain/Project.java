package sw.swe.domain;

import sw.swe.domain.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sw.swe.service.ProjectService;

import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "project_id")
    private Long id;

    private String title;
    private String description;
    private String currnetUser;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
    private List<Issue> issueList = new ArrayList<>();

    public void addIssue(Issue issue){
        issueList.add(issue);
        issue.setProject(this);
    }

    public static Project createProject(String title, String description, String currnetUser){
        Project project = new Project();
        project.setTitle(title);
        project.setDescription(description);
        project.setCurrnetUser(currnetUser);

        return project;
    }
}
