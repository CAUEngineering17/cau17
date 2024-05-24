package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RestController;
import sw.swe.domain.*;
import sw.swe.repository.IssueRepository;
import sw.swe.repository.ProjectRepository;
import sw.swe.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)    // Junit 실핼할 때 스프링과 엮어서 실행
@SpringBootTest                 // 스프링부트를 띄운 상태로 테스트를 진행
@Transactional
public class IssueServiceTest {
    @Autowired
    IssueRepository issueRepository;
    @Autowired
    IssueService issueService;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectService projectService;
    @Autowired
    private IssueCommentService issueCommentService;

    @Rollback(false)
    @Test
    public void 이슈생성() throws Exception{
        Issue issue = new Issue();
        issue.setTitle("Futura Free");
        issue.setDescription("Last Track");
        issue.setReporter("Frank");
        issue.setReportedDate(String.valueOf(LocalDateTime.now()));

        Long tmpId = issueService.createIssue(issue);
        assertEquals(issue, issueRepository.findOne(tmpId));
    }

    @Rollback(false)
    @Test
    public void 코멘트추가() throws Exception{
        IssueComment issuecomment = new IssueComment();
        issuecomment.setComment("new comment");
        issuecomment.setCommenter("Frank");
        issuecomment.setCommentedDate("2024-05-05");

        Long tmpId = issueCommentService.createComment(issuecomment);

        Issue issue = issueRepository.findOne(1L);

        issue.addIssueComment(issuecomment);

    }

    @Test
    public void 이슈와프로젝트연결() throws Exception{
        List<Issue> issues = issueRepository.findByTitle("Nikes");
        for (Issue issue : issues) {
            List<Project> projects = projectService.findProjectsByTitle("Blonde");
            for (Project project : projects) {
                issue.setProject(project);
                assertEquals(issue.getProject(), project);
            }
        }
    }
}