package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.Issue;
import sw.swe.service.IssueService;

import java.util.List;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/create")
    public Long createIssue(@RequestBody Issue issue) {
        return issueService.saveIssue(issue);
    }

    @GetMapping
    public List<Issue> listIssues() {
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
