using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class CreateProjectScript : MonoBehaviour
{
    [SerializeField] private GameObject ProjectName;
    [SerializeField] private GameObject ProjectDescription;
    
    public void OnButtonPressed()
    {
        var dataToSend = new { title = ProjectName.GetComponent<TextMeshPro>().text,description = ProjectDescription.GetComponent<TextMeshPro>().text,};
        NetworkManager.Instance.SendData("projects/create",dataToSend,OnProjectCreated);
    }

    public void OnProjectCreated(string result)
    {
        if (result == "true")
        {
            ProjectName.GetComponent<TextMeshPro>().text = "";
            ProjectDescription.GetComponent<TextMeshPro>().text = "";
        }
        else
        {
            Debug.LogError("Failed to create project");
        }
    }
}
