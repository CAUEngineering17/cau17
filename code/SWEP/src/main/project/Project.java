package main.project;

import main.project.issue.Issue;
import main.user.User;

import java.util.ArrayList;

public class Project {
    private final ArrayList<Issue> issueList = new ArrayList<Issue>();
    private User currentUser;
    private String title;
    private String description;

    public void addIssue(Issue newIssue){
        issueList.add(newIssue);
    }

    public ArrayList<Issue> getIssueList() {
        return issueList;
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
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
}
