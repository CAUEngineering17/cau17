package main.user;

public class User {
    private String userID;
    private String userPW;
    private int userType;

    public User(String userID, String userPW, int userType) {
        this.userID = userID;
        this.userPW = userPW;
        this.userType = userType;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getUserPW() {
        return userPW;
    }

    public void setUserPW(String userPW) {
        this.userPW = userPW;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }
}
