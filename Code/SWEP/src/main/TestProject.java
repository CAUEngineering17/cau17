package main;

import main.project.Project;
import main.project.ProjectOperation;
import main.project.issue.Issue;
import main.user.User;
import main.user.UserOperations;

public class TestProject {
    public static void main(String[] args) {
        UserOperations useroperations = new UserOperations();

        ProjectOperation projectoperation = new ProjectOperation();

        Project project = new Project("Project1", "project1");

        project.setCurrentUser(new User("Reporter", "rep", 1));

        boolean addProjectResult = projectoperation.addProject(project);
        if (addProjectResult) {
            System.out.println("Project added successfully.");
        } else {
            System.out.println("Failed to add issue.");
        }

        //project.addIssue(issue));

        System.out.println("cur_user = " + project.getCurrentUser().getUserID());
        System.out.println("cur_project = " + project.getTitle());
        System.out.println("description = " + project.getDescription());
    }
}
