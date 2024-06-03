using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

public class GetExistingProjects : MonoBehaviour
{
    public static Project[] projectList;

    [SerializeField] GameObject ProjectDropdown;
    void Start()
    {
        Init();
    }

    public void Init()
    {
        NetworkManager.Instance.GetData("projects",ExistingProjects);
    }
    public void ExistingProjects(string projects)
    {
        Debug.Log(projects);
        if (projects.Length>2)
        {
            projectList = JsonUtility.FromJson<ProjectList>("{\"projects\":" + projects + "}").projects;

            foreach (Project pj in projectList)
            {
                GameObject tile = Instantiate(Resources.Load<GameObject>("Prefab/ProjectList"),
                    transform);
                tile.GetComponent<AdminProjectList>().Init(pj.project_id, pj.description, pj.name);
            }
            ProjectDropdown.GetComponent<TMP_Dropdown>().AddOptions(GetExistingProjects.projectList.Select(project => project.name).ToList());

        }
    }
    
    [Serializable]
    public class Project
    {
        public string project_id;
        public string name;
        public string description;
    }

    [Serializable]
    public class ProjectList
    {
        public Project[] projects;
    }

}
