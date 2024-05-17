package main.user;

import main.database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {
    public User getUser(String userID, String userPW) {
        User user = null;
        String query = "SELECT * FROM userdb WHERE userID = ? AND userPW = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, userID);
            stmt.setString(2, userPW);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                user = new User(rs.getString("userID"), rs.getString("userPW"), rs.getInt("userType"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }
}
