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
import java.util.HashMap;
import java.util.Scanner;

//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;

public class HelloController {
  HashMap<String, Object> Ques = new HashMap<String, Object>();
  private final Gson gson = new Gson();
  int num=0;
  File myObj;



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
    Ques.put(String.valueOf(num), x);
    num++;
    FileWriter myWriter = new FileWriter(myObj);
    myWriter.write(gson.toJson(Ques));
    myWriter.close();
    System.out.println(gson.toJson(Ques));
  }

  @FXML
  protected void initialize() {
    selector.getItems().addAll("apple","asd","asdas");
    selector1.getItems().addAll("1","2","3");
    try {
      myObj = new File("que.json");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        String data = myReader.nextLine();
        System.out.println(data);
      }
      myReader.close();
    } catch ( FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
    JSONObject jsonObject = new JSONObject(JString);
    JSONArray loadIds = jsonObject.getJSONArray("IDs");

  }
}
