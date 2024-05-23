package SW.SWEP.main.project.issue;

import java.util.ArrayList;

public class Issue {
    private String title;
    private String description;
    private String reporter;
    private String reportedDate;
    private final ArrayList<IssueComment> commentList = new ArrayList<IssueComment>();
    IssueStatus status;

    public Issue(String title, String description, String reporter) {
        this.title = title;
        this.description = description;
        this.reporter = reporter;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getReportedDate() {
        return reportedDate;
    }

    public void setReportedDate(String reportedDate) {
        this.reportedDate = reportedDate;
    }

    public ArrayList<IssueComment> getCommentList() {
        return commentList;
    }


    // comment 추가
    public void addComment(IssueComment newComment){
        commentList.add(newComment);
    }

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(IssueStatus status) {
        this.status = status;
    }
}
