using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AdminPageNavigator : MonoBehaviour
{
    [SerializeField] private GameObject ProjectsPage;
    [SerializeField] private GameObject UsersPage;
    [SerializeField] private GameObject StatisticsPage;
    void Start()
    {
        ActivateProjectsPage();
    }

    public void ActivateUsersPage()
    {
        ProjectsPage.SetActive(false);
        UsersPage.SetActive(true);
        StatisticsPage.SetActive(false);
    }
    
    public void ActivateProjectsPage()
    {
        ProjectsPage.SetActive(true);
        UsersPage.SetActive(false);
        StatisticsPage.SetActive(false);
    }
    
    public void ActivateStatisticsPage()
    {
        ProjectsPage.SetActive(false);
        UsersPage.SetActive(false);
        StatisticsPage.SetActive(true);
    }
}
