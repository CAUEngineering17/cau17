package sw.swe.repository;

import org.springframework.stereotype.Repository;
import sw.swe.domain.Issue;
import sw.swe.domain.IssueStatus;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Repository
public class IssueStatusRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(IssueStatus status) {
        em.persist(status);
    }

    public IssueStatus findOne(Long id) {
        return em.find(IssueStatus.class, id);
    }

    public List<IssueStatus> findByAssignee(String username) {
        return em.createQuery("select s from IssueStatus s where s.assignee = :username", IssueStatus.class)
                .setParameter("username", username)
                .getResultList(); }

    public List<IssueStatus> findAll() {
        return em.createQuery("select s from IssueStatus s", IssueStatus.class)
                .getResultList();
    }

    public void updateAssignee(String username, Long issue_id) {
        em.createQuery("UPDATE IssueStatus IS SET IS.assignee = :username WHERE IS.issue = :issue_id")
                .setParameter("username", username)
                .setParameter("issue_id", issue_id)
                .executeUpdate();
    }

    public void updateStatus(Long issue_id, String status) {
        em.createQuery("UPDATE IssueStatus IS SET IS.status = :status WHERE IS.issue = :issue_id")
                .setParameter("status", status)
                .setParameter("issue_id", issue_id)
                .executeUpdate();
    }

    public void updateFixed(Long issue_id, String username) {
        em.createQuery("UPDATE IssueStatus IS SET IS.isFixed = true, IS.fixer = :fixer WHERE IS.issue = :issue_id")
                .setParameter("fixer", username)
                .setParameter("issue_id", issue_id)
                .executeUpdate();
    }

    public void delete(IssueStatus status) {
        em.remove(status);
    }

    public void saveIssue(Issue issue) {
        em.persist(issue);
    }
}
