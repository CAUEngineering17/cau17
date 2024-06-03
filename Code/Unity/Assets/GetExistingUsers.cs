using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

public class GetExistingUsers : MonoBehaviour
{
    public static User[] usersList;

    void Start()
    {
        Init();
    }

    public void Init()
    {
        NetworkManager.Instance.GetData("users",ExistingUsers);
    }
    public void ExistingUsers(string projects)
    {
        Debug.Log(projects);
        if (projects.Length>2)
        {
            usersList = JsonUtility.FromJson<UserList>("{\"projects\":" + projects + "}").projects;

            foreach (User pj in usersList)
            {
                GameObject tile = Instantiate(Resources.Load<GameObject>("Prefab/UserList"),
                    transform);
                tile.GetComponent<AdminUsersList>().Init(pj.id, pj.password, pj.role,pj.project);
            }
        }
    }
    
    [Serializable]
    public class User
    {
        public string id;
        public string password;
        public string role;
        public string project;
    }

    [Serializable]
    public class UserList
    {
        public User[] projects;
    }

}