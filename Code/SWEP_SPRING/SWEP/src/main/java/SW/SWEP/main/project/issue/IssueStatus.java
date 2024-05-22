package SW.SWEP.main.project.issue;

import SW.SWEP.main.user.User;

public class IssueStatus {
    private String priority;
    private String status;
    private User assignee;
    private boolean isFixed;
    private User fixer;

    public IssueStatus(String priority, String status, User assignee, boolean isFixed, User fixer) {
        this.priority = priority;
        this.status = status;
        this.assignee = assignee;
        this.isFixed = isFixed;
        this.fixer = fixer;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public boolean isFixed() {
        return isFixed;
    }

    public void setFixed(boolean fixed) {
        isFixed = fixed;
    }

    public User getFixer() {
        return fixer;
    }

    public void setFixer(User fixer) {
        this.fixer = fixer;
    }
}
