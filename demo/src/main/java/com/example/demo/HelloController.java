package com.example.demo;

import com.google.gson.JsonObject;
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


//import org.json.JSONArray;
//import org.json.JSONObject;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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
      JSONObject xy=new JSONObject();
      xy.put("question",x.question);
      xy.put("A1",x.A1);
      xy.put("A2",x.A2);
      xy.put("A3",x.A3);
      xy.put("A4",x.A4);
      xy.put("level",x.level);
      arr.add(xy);

      FileWriter myWriter = new FileWriter(myObj);
      myWriter.write(gson.toJson(arr));
      myWriter.close();
      System.out.println(gson.toJson(arr));
      String y=x.question;
      y+=x.level;
      selector.getItems().add(y);
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
      for (int i = 0; i < arr.size(); i++) {
        curr = (JSONObject)arr.get(i);
        System.out.println(curr);
        String y=String.valueOf(curr.get("question"));
        y+=String.valueOf(curr.get("level"));
        if (selector.getValue().equals(y)) {
          question.setText(String.valueOf(curr.get("question")));
          a1.setText(String.valueOf(curr.get("A1")));
          a2.setText(String.valueOf(curr.get("A2")));
          a3.setText(String.valueOf(curr.get("A3")));
          a4.setText(String.valueOf(curr.get("A4")));
          selector1.setValue(String.valueOf(curr.get("level")));
          currI = i;
          break;
        }
      }
      delete();
    }
  }

  protected void delete() throws IOException {
    if (currI == -1) {
      return;
    } else {
      sel =false;

      selector.getItems().add("edit");
      selector.setValue("edit");
      System.out.println("ta7t el set el2ola");
      arr.remove(currI);
      sel =false;
      String y=String.valueOf(curr.get("question"));
      y+=String.valueOf(curr.get("level"));
      selector.getItems().remove(y);
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
      myObj = new File("C:\\Users\\Mento\\Documents\\GitHub\\Milionaire\\src\\app\\game-flow\\que.json");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        data = myReader.nextLine();
      }
      myReader.close();

      System.out.println(data);
      if(!Objects.equals(data, "")) {
        JSONParser jsonParser = new JSONParser();
        JSONObject x;
        String y;
        arr=(JSONArray) jsonParser.parse(data);
        System.out.println(arr);
        for(int i=0;i<arr.size();i++){
           x=(JSONObject)arr.get(i);
          y=String.valueOf(x.get("question"));
          y+=String.valueOf(x.get("level"));
          selector.getItems().add(y);

        }
      }
    } catch (FileNotFoundException | ParseException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }

  }
}
