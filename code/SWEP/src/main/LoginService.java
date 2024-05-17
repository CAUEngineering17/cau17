package main;

import main.user.User;
import main.user.UserDAO;

import java.util.Scanner;

public class LoginService {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter UserID: ");
        String userID = scanner.nextLine();

        System.out.print("Enter Password: ");
        String userPW = scanner.nextLine();

        UserDAO userDAO = new UserDAO();
        User user = userDAO.getUser(userID, userPW);

        if (user != null) {
            System.out.println("Login successful!");
            System.out.println("User ID: " + user.getUserID());
            System.out.println("User Type: " + user.getUserType());
        } else {
            System.out.println("Login failed. Invalid UserID or Password.");
        }

        scanner.close();
    }
}
