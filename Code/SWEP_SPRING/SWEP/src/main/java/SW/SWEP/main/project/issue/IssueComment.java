package SW.SWEP.main.project.issue;

import SW.SWEP.main.user.User;

public class IssueComment {
    private String comment;
    private User commenter;
    private String commentedDate;

    public IssueComment(String comment, User commenter, String commentedDate) {
        this.comment = comment;
        this.commenter = commenter;
        this.commentedDate = commentedDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public User getCommenter() {
        return commenter;
    }

    public void setCommenter(User commenter) {
        this.commenter = commenter;
    }

    public String getCommentedDate() {
        return commentedDate;
    }

    public void setCommentedDate(String commentedDate) {
        this.commentedDate = commentedDate;
    }

}
