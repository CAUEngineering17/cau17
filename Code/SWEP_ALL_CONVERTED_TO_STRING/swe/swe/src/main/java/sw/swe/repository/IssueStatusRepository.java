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

    public List<IssueStatus> findByAssignee(String assignee) {
        return em.createQuery("select s from IssueStatus s where s.assignee = assignee",
                IssueStatus.class).getResultList(); }

    public List<IssueStatus> findAll() {
        return em.createQuery("select s from IssueStatus s", IssueStatus.class)
                .getResultList();
    }

    public void delete(IssueStatus status) {
        em.remove(status);
    }

    public void saveIssue(Issue issue) {
        em.persist(issue);
    }
}
