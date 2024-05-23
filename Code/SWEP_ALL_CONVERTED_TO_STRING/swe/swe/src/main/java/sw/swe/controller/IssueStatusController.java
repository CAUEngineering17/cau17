package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.IssueStatus;
import sw.swe.service.IssueStatusService;

import java.util.List;

@RestController
@RequestMapping("/issue-statuses")
public class IssueStatusController {

    @Autowired
    private IssueStatusService statusService;

    @PostMapping("/create")
    public Long createStatus(@RequestBody IssueStatus status) {
        return statusService.createStatus(status);
    }

    @GetMapping("/{id}")
    public IssueStatus getStatus(@PathVariable Long id) {
        return statusService.findOne(id);
    }

    @GetMapping
    public List<IssueStatus> listStatuses() {
        return statusService.findAllStatuses();
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable Long id) {
        statusService.deleteStatus(id);
    }
}
