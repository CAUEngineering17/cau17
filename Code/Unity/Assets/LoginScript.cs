using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class LoginScript : MonoBehaviour
{
    [SerializeField] private GameObject AdminPanel;
    [SerializeField] private GameObject ProjectsPanel;
    [SerializeField] private GameObject LoginFailedString;
    [SerializeField] private GameObject UsernameInput;
    [SerializeField] private GameObject PasswordInput;
    [SerializeField] private GameObject ProjectListView;

    void Start()
    {
        AdminPanel.SetActive(false);
        ProjectsPanel.SetActive(false);
    }
    public void OnLoginButtonClicked()
    {
        var dataToSend = new { id = UsernameInput.GetComponent<TextMeshPro>().text,password = PasswordInput.GetComponent<TextMeshPro>().text,};
        NetworkManager.Instance.SendData("users/login",dataToSend,OnLogin);
    }

    void OnLogin(string success)
    {
        Debug.Log(success);
        if (success == "success")
        {
            PlayerPrefs.SetString("id",UsernameInput.GetComponent<TextMeshPro>().text);
            UsernameInput.GetComponent<TextMeshPro>().text = "";
            PasswordInput.GetComponent<TextMeshPro>().text = "";
            NetworkManager.Instance.SendData("users/isAdmin",new{id=UsernameInput.GetComponent<TextMeshPro>().text},OnAdmin);
        }
        else
        {
            LoginFailedString.SetActive(true);
        }
    }

    void OnAdmin(string isAdmin)
    {
        if (isAdmin == "true")
        {
            NetworkManager.Instance.GetData("projects",GetExistingProjects);
            AdminPanel.SetActive(true);
        }
        else
        {
            ProjectsPanel.SetActive(false);
        }
    }

    public void GetExistingProjects(string projects)
    {
        ProjectList projectList = JsonUtility.FromJson<ProjectList>(projects);

        // Iterate through the list of persons
        foreach (Project pj in projectList.projects)
        {
            GameObject tile = Instantiate(Resources.Load<GameObject>("Prefab/ProjectList"),ProjectListView.transform);
            tile.GetComponent<AdminProjectList>().Init(pj.project_id,pj.description,pj.name);
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