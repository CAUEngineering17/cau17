package sw.swe.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Entity
@Getter @Setter

public class IssueComment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "issuecomment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id")
    private Issue issue;

    private String comment;
    private String commenter;
    private String commentedDate;
}
