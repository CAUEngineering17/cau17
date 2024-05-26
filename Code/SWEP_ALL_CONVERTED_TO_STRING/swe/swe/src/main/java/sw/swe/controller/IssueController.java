package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.Issue;
import sw.swe.domain.IssueStatus;
import sw.swe.domain.Project;
import sw.swe.domain.User;
import sw.swe.service.IssueService;
import sw.swe.service.IssueStatusService;
import sw.swe.service.ProjectService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private ProjectService projectService;
    @Autowired
    private IssueStatusService issueStatusService;

    /**
     * 이슈 생성
     *
     * @param createIssueRequest
     * @return
     */
    @PostMapping("/create")
    public boolean createIssue(@RequestBody Map<String, String> createIssueRequest) {
        String title = createIssueRequest.get("title");
        String description = createIssueRequest.get("description");
        Long project_id = Long.parseLong(createIssueRequest.get("project_id"));
        String priority = createIssueRequest.get("priority");
        String reporter = createIssueRequest.get("reporter");

        if (projectService.findOne(project_id) != null) {
            Issue issue = Issue.createIssue
                    (projectService.findOne(project_id), title, description, reporter);

            IssueStatus issueStatus = IssueStatus.createIssueStatus
                    (issue, priority, "new", "PL", false, null);

            issueStatusService.saveStatus(issueStatus);

            issueStatusService.setIssueForIssueStatus(issueStatus.getId(), issue);

            issueService.saveIssue(issue);

            return true;
        }
        else
            return false;
    }

    /**
     * 유저의 id가 주어지면 그에 맞는 issueList를 출력
     * @param issueRequest
     * @return
     */
    @GetMapping
    public List<Issue> listIssues(@RequestBody Map<String, String> issueRequest) {
        String username = issueRequest.get("id");

        return issueService.findByUsername(username);
    }

    @GetMapping("/{id}")
    public Issue getIssue(@PathVariable Long id) {
        return issueService.findOne(id);
    }


    @GetMapping("/project/{projectId}")
    public List<Issue> getIssuesByProjectId(@PathVariable Long projectId) {
        return issueService.findIssuesByProjectId(projectId);
    }

    @DeleteMapping("/{id}")
    public void deleteIssue(@PathVariable Long id) {
        issueService.deleteIssue(id);
    }

    /**
     * 이슈 상세정보 출력
     * @param request
     * @return
     */
    @PostMapping("/details")
    public Issue getIssueDetails(@RequestBody Map<String, String> request) {
        Long issueId = Long.parseLong(request.get("id"));

        return issueService.findOne(issueId);
    }
}
