package sw.swe.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import sw.swe.service.IssueCommentService;

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

    public void createIssueComment(Issue issue, String comment, String commenter, String commentedDate) {
        IssueComment issueComment = new IssueComment();
        issueComment.setComment(comment);
        issueComment.setCommenter(commenter);
        issueComment.setCommentedDate(commentedDate);

        IssueCommentService issueCommentService = new IssueCommentService();

        Long tmpId = issueCommentService.saveComment(issueComment);

        issue.addIssueComment(issueComment);
    }
}
