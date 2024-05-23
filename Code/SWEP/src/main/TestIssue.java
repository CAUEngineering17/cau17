package main;

import main.project.issue.Issue;
import main.project.issue.IssueComment;
import main.project.issue.IssueOperations;
import main.project.issue.IssueStatus;
import main.user.User;

import java.util.ArrayList;
import java.util.List;

public class TestIssue {
    public static void main(String[] args) {
        // Issue 객체 생성
        Issue issue = new Issue("Title", "Description", "Reporter");
        issue.setStatus(new IssueStatus("High", "Open", new User("assignee", "assigneePW", 1), false, new User("assignee", "assigneePW", 1)));
        issue.addComment(new IssueComment("Comment 1", new User("commenter1", "password1", 2), "2024-05-18"));
        issue.addComment(new IssueComment("Comment 2", new User("commenter2", "password2", 2), "2024-05-19"));

        // IssueOperations 객체 생성
        IssueOperations issueOperations = new IssueOperations();

        // addIssue 메서드 테스트
        boolean addIssueResult = issueOperations.addIssue(issue);
        if (addIssueResult) {
            System.out.println("Issue added successfully.");
        } else {
            System.out.println("Failed to add issue.");
        }

        // 이슈 상태 변경
        IssueStatus modifiedissuestatus = new IssueStatus("Middle", "Open", new User("dev1", "devPW", 3), false, new User("dev2", "devPW", 4));
        issueOperations.updateIssueStatus(1, modifiedissuestatus);

        List<Issue> i = issueOperations.getAllIssues();
        for (Issue issue1 : i) {
            System.out.println("Title: " + issue.getTitle());
            System.out.println("Description: " + issue.getDescription());
            System.out.println("Reporter: " + issue.getReporter());
            System.out.println("Status:");
            IssueStatus status = issue.getStatus();
            System.out.println("   Priority: " + status.getPriority());
            System.out.println("   Status: " + status.getStatus());
            System.out.println("   Assignee: " + status.getAssignee().getUserID());
            System.out.println("   Is Fixed: " + status.isFixed());
            System.out.println("   Fixer: " + status.getFixer().getUserID());
            System.out.println("Comments:");
            List<IssueComment> comments = issue.getCommentList();
            for (IssueComment comment : comments) {
                System.out.println("   Comment: " + comment.getComment());
                System.out.println("   Commenter: " + comment.getCommenter().getUserID());
                System.out.println("   Commented Date: " + comment.getCommentedDate());
            }
            System.out.println();
        }
    }
}

