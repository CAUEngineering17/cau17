using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class AdminProjectList : MonoBehaviour
{
    private string id;
    public void Init(string id, string name, string description)
    {
        id = this.id;
        transform.GetChild(0).GetComponent<TextMeshPro>().text = name;
        transform.GetChild(1).GetComponent<TextMeshPro>().text = description;
    }

    public void OnDeleteProject()
    {
        NetworkManager.Instance.SendData("projects/delete",new{project_id = id},OnSuccessfulDelete);
    }

    public void OnSuccessfulDelete(string result)
    {
        if (result == "true")
        {
            Destroy(gameObject);
        }
    }
}
