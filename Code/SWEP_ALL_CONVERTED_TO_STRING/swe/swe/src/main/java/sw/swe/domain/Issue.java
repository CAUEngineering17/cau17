package sw.swe.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter

public class Issue {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "issue_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    private String title;
    private String description;
    private String reporter;
    private String reportedDate;

    @OneToMany(mappedBy = "issue")
    private List<IssueComment> commentList = new ArrayList<>();

    @OneToOne(mappedBy = "issue", fetch = FetchType.LAZY)
    private IssueStatus status;

    public static Issue createIssue(Project project, String title, String description, String reporter){
        Issue issue = new Issue();
        issue.setProject(project);
        /*for (IssueComment issueComment : issueComments) {
            issue.addIssueComment(issueComment);
        }*/
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setReporter(reporter);
        issue.setReportedDate(String.valueOf(LocalDate.now()));

        return issue;
    }

    public void setProject(Project project){
        this.project = project;
        project.getIssueList().add(this);
    }

    public void addIssueComment(IssueComment issueComment){
        commentList.add(issueComment);
        issueComment.setIssue(this);
    }

    public void setIssueStatus(IssueStatus issueStatus){
        this.status = issueStatus;
        issueStatus.setIssue(this);
    }
}
