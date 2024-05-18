package main;

import main.user.User;
import main.user.UserOperations;

import java.util.Scanner;

public class TestUser {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        UserOperations userOperations = new UserOperations();

        System.out.println("1. Login");
        System.out.println("2. Register");
        System.out.print("Choose an option: ");
        int choice = scanner.nextInt();
        scanner.nextLine(); // consume newline

        if (choice == 1) {
            System.out.print("Enter UserID: ");
            String userID = scanner.nextLine();

            System.out.print("Enter Password: ");
            String userPW = scanner.nextLine();

            User user = userOperations.getUser(userID, userPW);

            if (user != null) {
                System.out.println("Login successful!");
                System.out.println("User ID: " + user.getUserID());
                System.out.println("User Type: " + user.getUserType());
            } else {
                System.out.println("Login failed. Invalid UserID or Password.");
            }
        } else if (choice == 2) {
            System.out.print("Enter UserID: ");
            String userID = scanner.nextLine();

            System.out.print("Enter Password: ");
            String userPW = scanner.nextLine();

            System.out.print("Enter User Type: ");
            int userType = scanner.nextInt();

            User newUser = new User(userID, userPW, userType);
            boolean success = userOperations.addUser(newUser);

            if (success) {
                System.out.println("Registration successful!");
            } else {
                System.out.println("Registration failed.");
            }
        } else {
            System.out.println("Invalid option.");
        }

        scanner.close();
    }
}
