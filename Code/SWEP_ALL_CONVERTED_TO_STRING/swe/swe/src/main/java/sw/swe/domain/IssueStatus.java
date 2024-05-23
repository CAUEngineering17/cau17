package sw.swe.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter
public class IssueStatus {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "issuestatus_id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    private String priority;
    private String status;
    private String assignee;
    private boolean isFixed;
    private String fixer;
}
