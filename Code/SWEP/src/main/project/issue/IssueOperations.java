package main.project.issue;

import main.database.DatabaseConnection;
import main.user.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class IssueOperations {

    // issuedb(mysql 테이블)에 issue를 추가한다.
    public boolean addIssue(Issue issue) {
        // issue, issueStatus, issueComment의 정보가 담긴 Query 형식의 String을 받는다.
        String issueQuery = "INSERT INTO issuedb (title, description, reporter) VALUES (?, ?, ?)";
        String statusQuery = "INSERT INTO issue_statusdb (issue_id, priority, status, assignee, isFixed, fixer) VALUES (?, ?, ?, ?, ?, ?)";
        String commentQuery = "INSERT INTO issue_commentdb (issue_id, comment, commenter) VALUES (?, ?, ?)";

        // PreparedStatement 객체에 issue, issueStatus, issueComment의 정보에 해당하는 Query 형식의 String값을 전달받는다.
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement issueStmt = conn.prepareStatement(issueQuery, PreparedStatement.RETURN_GENERATED_KEYS);
             PreparedStatement statusStmt = conn.prepareStatement(statusQuery);
             PreparedStatement commentStmt = conn.prepareStatement(commentQuery)) {

            // Query 형식에서 '?' 로 작성했던 부분을 바꾸어준다. parameterIndex는 '?'의 인덱스이고, 해당하는 '?'에 뒤따라 나오는 issue.getTitle 등의 String 파라미터 값이 배정된다.
            issueStmt.setString(1, issue.getTitle());
            issueStmt.setString(2, issue.getDescription());
            issueStmt.setString(3, issue.getReporter());

            // 변경 사항 업데이트
            issueStmt.executeUpdate();

            // getGeneratedKeys는 Auto_increment되는 값을 반환하고, 그 값은 issue 테이블에서 id값에 해당한다.
            try (ResultSet keyID = issueStmt.getGeneratedKeys()) {
                if (keyID.next()) {
                    int issueID = keyID.getInt(1);

                    // 새 Issue 속 IssueStatus 안에 있는 값들을 설정한다. 위에서 진행했던 과정과 동일하다.
                    statusStmt.setInt(1, issueID);
                    statusStmt.setString(2, issue.getStatus().getPriority());
                    statusStmt.setString(3, issue.getStatus().getStatus());
                    statusStmt.setString(4, issue.getStatus().getAssignee().getUserID());
                    statusStmt.setBoolean(5, issue.getStatus().isFixed());
                    statusStmt.setString(6, issue.getStatus().getFixer().getUserID());

                    // 변경 사항 업데이트
                    statusStmt.executeUpdate();

                    // Issue 속 commentList에 issueComment를 삽입한다.
                    for (IssueComment comment : issue.getCommentList()) {
                        commentStmt.setInt(1, issueID);
                        commentStmt.setString(2, comment.getComment());
                        commentStmt.setString(3, comment.getCommenter().getUserID());

                        // 변경 사항 업데이트
                        commentStmt.executeUpdate();
                    }
                } else {
                    throw new SQLException("Failed to get issue ID.");
                }
            }

            return true;

        } catch (SQLException e) {
            return false;
        }
    }

    // 모든 Issue 가져오기
    public List<Issue> getAllIssues() {
        ArrayList<Issue> issueList = new ArrayList<>();

        String issueQuery = "SELECT * FROM issuedb";
        String statusQuery = "SELECT * FROM issue_statusdb WHERE issue_id = ?";
        String commentQuery = "SELECT * FROM issue_commentdb WHERE issue_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement issueStmt = conn.prepareStatement(issueQuery);
             ResultSet issueRst = issueStmt.executeQuery()) {

            while (issueRst.next()) {
                int issueId = issueRst.getInt("id");
                String title = issueRst.getString("title");
                String description = issueRst.getString("description");
                String reporter = issueRst.getString("reporter");

                // Issue 상태 정보 가져오기
                PreparedStatement statusStmt = conn.prepareStatement(statusQuery);
                statusStmt.setInt(1, issueId);
                ResultSet statusRst = statusStmt.executeQuery();

                IssueStatus status = null;
                if (statusRst.next()) {
                    String priority = statusRst.getString("priority");
                    String issueStatus = statusRst.getString("status");
                    String assigneeId = statusRst.getString("assignee");
                    boolean isFixed = statusRst.getBoolean("isFixed");
                    String fixerId = statusRst.getString("fixer");

                    // assignee와 fixer 정보 가져오기
                    User assignee = getUserByID(assigneeId);
                    User fixer = getUserByID(fixerId);

                    status = new IssueStatus(priority, issueStatus, assignee, isFixed, fixer);
                }

                // Issue 코멘트 정보 가져오기
                PreparedStatement commentStmt = conn.prepareStatement(commentQuery);
                commentStmt.setInt(1, issueId);
                ResultSet commentRst = commentStmt.executeQuery();

                List<IssueComment> comments = new ArrayList<>();
                while (commentRst.next()) {
                    String commentText = commentRst.getString("comment");
                    String commenterId = commentRst.getString("commenter");

                    User commenter = getUserByID(commenterId);
                    String commentedDate = commentRst.getString("commentedDate");

                    IssueComment comment = new IssueComment(commentText, commenter, commentedDate);
                    comments.add(comment);
                }

                Issue issue = new Issue(title, description, reporter);
                issue.setStatus(status);
                issue.getCommentList().addAll(comments);

                issueList.add(issue);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return issueList;
    }

    // 이슈 상태 정보 변경
    public boolean updateIssueStatus(int issueId, IssueStatus newStatus) {
        String statusQuery = "UPDATE issue_statusdb SET priority = ?, status = ?, assignee = ?, isFixed = ?, fixer = ? WHERE issue_id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement statusStmt = conn.prepareStatement(statusQuery)) {

            statusStmt.setString(1, newStatus.getPriority());
            statusStmt.setString(2, newStatus.getStatus());
            statusStmt.setString(3, newStatus.getAssignee().getUserID());
            statusStmt.setBoolean(4, newStatus.isFixed());
            statusStmt.setString(5, newStatus.getFixer().getUserID());
            statusStmt.setInt(6, issueId);

            int rowsUpdated = statusStmt.executeUpdate();

            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // 유저 ID로 유저 정보 가져오기
    private User getUserByID(String userId) throws SQLException {
        String query = "SELECT * FROM userdb WHERE userID = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, userId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String userID = rs.getString("userID");
                String userPW = rs.getString("userPW");
                int userType = rs.getInt("userType");
                return new User(userID, userPW, userType);
            }
        }
        return null;
    }
}
