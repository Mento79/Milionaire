package com.example.demo;

import javafx.fxml.FXML;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import com.google.gson.Gson;
import javafx.scene.control.TextArea;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

import org.json.JSONArray;
import org.json.JSONObject;

//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;

public class HelloController {
  HashMap<String, Object> Ques = new HashMap<String, Object>();
  private final Gson gson = new Gson();
  int num=0;
  File myObj;
  ArrayList<Question>QuesArr = new ArrayList<Question>();



  @FXML
  private Label welcomeText;
  @FXML
  private ComboBox<String> selector;
  @FXML
  private ChoiceBox<String> selector1;
  @FXML
  private TextArea question;
  @FXML
  private TextArea a1;
  @FXML
  private TextArea a2;
  @FXML
  private TextArea a3;
  @FXML
  private TextArea a4;

  @FXML
  protected void onHelloButtonClick() throws IOException {
    Question x=new Question(question.getText(),a1.getText(),a2.getText(),a3.getText(),a4.getText(),Integer.parseInt(selector1.getValue()));
    QuesArr.add(x);
    FileWriter myWriter = new FileWriter(myObj);
    myWriter.write(gson.toJson(QuesArr));
    myWriter.close();
    System.out.println(gson.toJson(QuesArr));
  }

  @FXML
  protected void initialize() {
    selector1.getItems().addAll("1","2","3");
    String data="";
    try {
      myObj = new File("que.json");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        data = myReader.nextLine();
      }
      myReader.close();
      JSONArray arr = new JSONArray(data);
      System.out.println(arr);
      for(int i = 0; i < arr.length(); i++){
        JSONObject curr = new JSONObject(arr.get(i).toString());
        System.out.println(curr);
        System.out.println(arr.get(i));
        selector.getItems().add(curr.getString("question"));
      }

    } catch ( FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }

  }
}
