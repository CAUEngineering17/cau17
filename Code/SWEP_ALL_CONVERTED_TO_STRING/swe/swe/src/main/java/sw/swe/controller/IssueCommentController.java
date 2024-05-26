package sw.swe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sw.swe.domain.IssueComment;
import sw.swe.service.IssueCommentService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/issue-comments")
public class IssueCommentController {

    @Autowired
    private IssueCommentService commentService;

    @PostMapping("/create")
    public Long createComment(@RequestBody IssueComment comment) {
        return commentService.saveComment(comment);
    }

    @GetMapping("/{id}")
    public IssueComment getComment(@PathVariable Long id) {
        return commentService.findOne(id);
    }

    @GetMapping
    public List<IssueComment> listComments() {
        return commentService.findAllComments();
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
