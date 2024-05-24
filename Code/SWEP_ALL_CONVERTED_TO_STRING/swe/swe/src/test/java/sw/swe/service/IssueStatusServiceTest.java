package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sw.swe.domain.IssueStatus;
import sw.swe.repository.IssueStatusRepository;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)    // Junit 실핼할 때 스프링과 엮어서 실행
@SpringBootTest                 // 스프링부트를 띄운 상태로 테스트를 진행
@Transactional
public class IssueStatusServiceTest {
    @Autowired
    IssueStatusRepository issueStatusRepository;
    @Autowired
    IssueStatusService issueStatusService;

    //@Rollback(false)
    @Test
    public void 스테이터스생성() throws Exception{
        IssueStatus issueStatus = new IssueStatus();
        issueStatus.setPriority("1");
        issueStatus.setFixer("Frank");
        issueStatus.setStatus("New");
        issueStatus.setAssignee("Frank");

        Long tmpId = issueStatusService.saveStatus(issueStatus);
        assertEquals(issueStatus, issueStatusService.findOne(tmpId));
    }
}