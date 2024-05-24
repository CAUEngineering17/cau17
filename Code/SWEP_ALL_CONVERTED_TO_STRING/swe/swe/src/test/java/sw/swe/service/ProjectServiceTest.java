package sw.swe.service;

import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sw.swe.domain.Project;
import sw.swe.repository.ProjectRepository;

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

    //@Rollback(false)
    @Test
    public void 프로젝트생성() throws Exception{
        /**Project project = new Project();
        project.setTitle("Channel Orange");
        project.setDescription("1st studio album");
        project.setCurrnetUser("Frank");
         */

        Project project = Project.createProject("Project1", "1st project", "Frank");


        Long tmpId = projectService.saveProject(project);
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