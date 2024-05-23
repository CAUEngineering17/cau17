package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RestController;
import sw.swe.domain.IssueStatus;
import sw.swe.domain.Project;
import sw.swe.domain.User;
import sw.swe.repository.IssueStatusRepository;
import sw.swe.repository.ProjectRepository;
import sw.swe.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)    // Junit 실핼할 때 스프링과 엮어서 실행
@SpringBootTest                 // 스프링부트를 띄운 상태로 테스트를 진행
@Transactional
public class IssueStatusServiceTest {
    @Autowired
    IssueStatusRepository issueStatusRepository;
    @Autowired
    IssueStatusService issueStatusService;

    @Rollback(false)
    @Test
    public void 스테이터스생성() throws Exception{
        IssueStatus issueStatus = new IssueStatus();
        issueStatus.setPriority("1");
        issueStatus.setFixer("Frank");
        issueStatus.setStatus("New");
        issueStatus.setAssignee("Frank");

        Long tmpId = issueStatusService.createStatus(issueStatus);
        assertEquals(issueStatus, issueStatusService.findOne(tmpId));
    }
}