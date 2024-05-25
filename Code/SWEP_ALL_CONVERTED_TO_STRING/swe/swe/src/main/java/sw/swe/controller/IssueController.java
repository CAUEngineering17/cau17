package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.Issue;
import sw.swe.domain.IssueStatus;
import sw.swe.domain.Project;
import sw.swe.domain.User;
import sw.swe.service.IssueService;
import sw.swe.service.ProjectService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private ProjectService projectService;

    /**
     * 이슈 생성
     *
     * @param createIssueRequest
     * @return
     */
    @PostMapping("/create")
    public boolean createUser(@RequestBody Map<String, String> createIssueRequest) {
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

            return true;
        }
        else
            return false;


    }

    @GetMapping
    public List<Issue> listIssues(@RequestBody Map<String, String> issueRequest) {
        String username = issueRequest.get("id");



        return issueService.findAllIssues();
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
}
