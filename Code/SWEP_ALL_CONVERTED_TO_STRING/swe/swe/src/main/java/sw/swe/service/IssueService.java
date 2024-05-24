package sw.swe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sw.swe.domain.Issue;
import sw.swe.domain.Project;
import sw.swe.repository.IssueRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    /**
     * 이슈를 DB에 저장
     */
    @Transactional
    public Long saveIssue(Issue issue) {
        issueRepository.save(issue);
        return issue.getId();
    }

    /**
     * 해당 이슈와 소속된 프로젝트 값을 연동 (이슈의 프로젝트 외부 키에 프로젝트 키를 저장)
     */
    @Transactional
    public void setProjectForIssue(Long issueId, Project project) {
        Issue issue = issueRepository.findOne(issueId);
        if (issue != null) {
            issue.setProject(project);
        } else {
            throw new IllegalArgumentException("존재하지 않는 이슈입니다.");
        }
    }

    /**
     * 이슈 조회
     */
    public Issue findOne(Long issueId) {
        return issueRepository.findOne(issueId);
    }

    /**
     * 전체 이슈 조회
     */
    public List<Issue> findAllIssues() {
        return issueRepository.findAll();
    }

    /**
     * 특정 프로젝트의 모든 이슈 조회
     */
    public List<Issue> findIssuesByProjectId(Long projectId) {
        return issueRepository.findByProjectId(projectId);
    }

    /**
     * 이슈 삭제
     */

    @Transactional
    public void deleteIssue(Long issueId) {
        Issue issue = issueRepository.findOne(issueId);
        if (issue != null) {
            issueRepository.delete(issue);
        } else {
            throw new IllegalArgumentException("존재하지 않는 이슈입니다.");
        }
    }
}
