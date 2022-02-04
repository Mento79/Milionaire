package com.example.demo;

import com.google.gson.JsonPrimitive;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import com.google.gson.Gson;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;
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
  JSONArray arr = new JSONArray();
  JSONArray Tarr;
  JSONObject curr;
  int currI=-1;
  boolean sel=true;

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
    if(question.getText().equals("")||a1.getText().equals("")||a2.getText().equals("")||a3.getText().equals("")||a4.getText().equals("")||selector1.getValue()==null) {
      Alert alert = new Alert(Alert.AlertType.WARNING);
      alert.setTitle("Error");
      alert.setHeaderText("There are missing information.");
      alert.setContentText("Make sure yoou entered all the data correctly.");
      alert.showAndWait();

    }
    else {
      Question x = new Question(question.getText(), a1.getText(), a2.getText(), a3.getText(), a4.getText(), Integer.parseInt(selector1.getValue()));
      arr.put(x);

      FileWriter myWriter = new FileWriter(myObj);
      myWriter.write(gson.toJson(arr));
      myWriter.close();
      System.out.println(gson.toJson(arr));
      selector.getItems().add(x.question);
      question.setText("");
      a1.setText("");
      a2.setText("");
      a3.setText("");
      a4.setText("");
      selector1.setValue("");

    }

  }

  @FXML
  protected void handleSelection() throws IOException {
    if (sel&&!selector.getValue().equals("edit")) {
      for (int i = 0; i < Tarr.length(); i++) {
        curr = new JSONObject(Tarr.get(i).toString());
        System.out.println(curr);
        if (selector.getValue().equals(curr.getString("question"))) {
          question.setText(curr.getString("question"));
          a1.setText(curr.getString("A1"));
          a2.setText(curr.getString("A2"));
          a3.setText(curr.getString("A3"));
          a4.setText(curr.getString("A4"));
          selector1.setValue(String.valueOf(curr.getInt("level")));
          currI = i;
          break;
        }
      }
      delete();
    }
  }

  @FXML
  protected void delete() throws IOException {
    if (currI == -1) {
      return;
    } else {
      sel =false;
      selector.setValue("edit");
      System.out.println("ta7t el set el2ola");
      Tarr.remove(currI);
      arr.remove(currI);
      sel =false;
      selector.getItems().remove(curr.getString("question"));
      FileWriter myWriter = new FileWriter(myObj);
      myWriter.write(gson.toJson(arr));
      myWriter.close();
      currI = -1;
      sel =true;
    }
  }

  @FXML
  protected void initialize() {
    selector1.getItems().addAll("1","2","3");
    String data="";
    try {
      myObj = new File("C:\\Users\\Mento\\Documents\\GitHub\\Milionaire\\src\\que.json");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        data = myReader.nextLine();
      }
      myReader.close();

      System.out.println(data);
      if(!Objects.equals(data, "")) {
        JSONObject jsonObject = new JSONObject(data);
        Tarr = jsonObject.getJSONArray("myArrayList");
        System.out.println(Tarr);
        selector.getItems().add("edit");
        for (int i = 0; i < Tarr.length(); i++) {
          JSONObject curr = new JSONObject(Tarr.get(i).toString());
          System.out.println(curr);
          System.out.println(Tarr.get(i));
          arr.put(new JsonPrimitive(curr.toString()));
          selector.getItems().add(curr.getString("question"));
        }
      }
    } catch ( FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }

  }
}
