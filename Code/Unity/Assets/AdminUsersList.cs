using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class AdminUsersList : MonoBehaviour
{
    private string username;
    public void Init(string username, string password, string role, string project)
    {
        username = this.username;
        transform.GetChild(0).GetComponent<TextMeshPro>().text = role;
        transform.GetChild(1).GetComponent<TextMeshPro>().text = project;
        transform.GetChild(2).GetComponent<TextMeshPro>().text = this.username;
        transform.GetChild(3).GetComponent<TextMeshPro>().text = password;
    }

    public void OnDeleteUser()
    {
        NetworkManager.Instance.SendData("users/delete",new UserID{user_id = username},OnSuccessfulDelete);
    }

    public void OnSuccessfulDelete(string result)
    {
        if (result == "true")
        {
            Destroy(gameObject);
        }
    }
    [Serializable]
    class UserID
    {
        public string user_id;
    }
}