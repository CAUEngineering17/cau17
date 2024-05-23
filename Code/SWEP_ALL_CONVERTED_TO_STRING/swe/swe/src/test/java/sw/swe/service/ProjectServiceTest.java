package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.RestController;
import sw.swe.domain.Project;
import sw.swe.domain.User;
import sw.swe.repository.ProjectRepository;
import sw.swe.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)    // Junit 실핼할 때 스프링과 엮어서 실행
@SpringBootTest                 // 스프링부트를 띄운 상태로 테스트를 진행
@Transactional
public class ProjectServiceTest {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectService projectService;

    @Test
    public void 프로젝트생성() throws Exception{
        Project project = new Project();
        project.setTitle("Channel Orange");
        project.setDescription("1st studio album");
        project.setCurrnetUser("Frank");

        Long tmpId = projectService.createProject(project);
        assertEquals(project, projectRepository.findOne(tmpId));
    }
    @Test
    public void 프로젝트전체출력() throws Exception{
        List<Project> projectList = projectService.findAllProjects();
        for (Project project : projectList) {
            System.out.println(project.getTitle() + " " + project.getDescription() + " " + project.getCurrnetUser());
        }
    }

    @Test
    public void 프로젝트이름검색출력() throws Exception{
        List<Project> projectList = projectService.findProjectsByTitle("Channel Orange");
        for (Project project : projectList) {
            System.out.println(project.getTitle() + " " + project.getDescription() + " " + project.getCurrnetUser());
        }
    }
}