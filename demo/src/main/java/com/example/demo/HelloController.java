package com.example.demo;

import javafx.fxml.FXML;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;

import java.io.FileWriter;
import java.io.IOException;
//import org.json.simple.JSONArray;
//import org.json.simple.JSONObject;

public class HelloController {
  @FXML
  private Label welcomeText;
  @FXML
  private ComboBox<String> selector;
  @FXML
  private ChoiceBox<String> selector1;

  @FXML
  protected void onHelloButtonClick() {
//
//    JSONObject employeeDetails = new JSONObject();
//    employeeDetails.put("firstName", "Lokesh");
//    employeeDetails.put("lastName", "Gupta");
//    employeeDetails.put("website", "howtodoinjava.com");
//    try (FileWriter file = new FileWriter("employees.json")) {
//      //We can write any JSONArray or JSONObject instance to the file
//      file.write(employeeDetails.toJSONString());
//      file.flush();
//    }
//    catch (IOException e) {
//      e.printStackTrace();
//    }
  }

  @FXML
  protected void initialize() {
    selector.getItems().addAll("apple","asd","asdas");
    selector1.getItems().addAll("1","2","3");

  }
}
