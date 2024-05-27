package sw.swe.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sw.swe.service.IssueStatusService;

import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter
public class IssueStatus {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "issuestatus_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "issue_id")
    @JsonIgnore
    private Issue issue;

    private String priority;
    private String status;
    private String assignee;
    private boolean isFixed;
    private String fixer;

    public static IssueStatus createIssueStatus(Issue issue, String priority, String status, String assignee, boolean isFixed, String fixer){
        IssueStatus issueStatus = new IssueStatus();
        issueStatus.setPriority(priority);
        issueStatus.setStatus(status);
        issueStatus.setAssignee(assignee);
        issueStatus.setFixer(fixer);
        issueStatus.setFixed(isFixed);

        issueStatus.setIssue(issue);

        return issueStatus;
    }
}
