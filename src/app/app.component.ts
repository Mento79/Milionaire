import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import * as data from "./que.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Milion';
  Questions=(data as any).default  

  currentQuestion=""
  currentAnswerA=""
  currentAnswerB=""
  currentAnswerC=""
  currentAnswerD=""
  level=0
  Randomed:any=[]
  selected:any=[]
  correct=""
  answered=false

  qpress(x:string){
    if (x=="c"||x=="a"){
      if (x=="a"){
        if (this.currentAnswerA==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png"
          this.handleLoss()
        }
      }
      else{
        if (this.currentAnswerC==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png"
          this.handleLoss()

        }
      }
    }
    else{
      if (x=="b"){
        if (this.currentAnswerB==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png"        
          this.handleLoss()
        }
      
      }
      else{
        if (this.currentAnswerD==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png" ;       
          this.handleLoss()
          //lose
        }

      }
    }
  }

  handleLoss(){
    timer(500).subscribe(y => { 
      (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ansC.png" ;       
      timer(500).subscribe(y => { 
        (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ans.png"        
        timer(500).subscribe(y => { 
          (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ansC.png"        
        })
      })
    })

  }
  searchForCorrect():string{
    
    switch(this.correct){
      case this.currentAnswerA:
        return "a"
      case this.currentAnswerB:
        return "b"
      case this.currentAnswerC:
        return "c"
      case this.currentAnswerD:
        return "d"
      default:
      return ""          
    }
  }
  rightAnswer(){
    timer(2000).subscribe(y => { 
      if(this.level!=15){
      this.level++
      document.getElementById(this.level.toString())!.className="levelat"
      if(this.level!=1){
        if (this.level%5==1){
          document.getElementById((this.level-1).toString())!.className="level2"
        }
        else{
          document.getElementById((this.level-1).toString())!.className="level"
        }
      }
      }
      document.getElementById("da")!.className="container answer";
      document.getElementById("db")!.className="container answer";
      document.getElementById("dc")!.className="container answer";
      document.getElementById("dd")!.className="container answer";
      (<HTMLImageElement>document.getElementById("a"))!.src="assets/ans.png";
      (<HTMLImageElement>document.getElementById("b"))!.src="assets/ans.png";
      (<HTMLImageElement>document.getElementById("c"))!.src="assets/ans.png";
      (<HTMLImageElement>document.getElementById("d"))!.src="assets/ans.png";
      this.answered=false
      this.qSelect()
    })

    
  }

  handle(x:string){
  
    if (!this.answered){
      /////////////////////////////////////////////////
      this.answered=true
      document.getElementById("da")!.className="container"
      document.getElementById("db")!.className="container"
      document.getElementById("dc")!.className="container"
      document.getElementById("dd")!.className="container"
  
      timer(1000).subscribe(y => { 
        this.qpress(x)
        console.log(x)
        console.log(this.correct)
    })
  //////////////////////////////////////////////////
    }
  }

  qSelect(){
    this.Randomed=["A1","A2","A3","A4"]
    var stage=Math.floor(this.level/5)+1
    while(true){
    var curI=Math.floor(Math.random()*this.Questions.myArrayList.length)
    var st=false
    for(let i of this.selected){
      console.log("i= "+i +"  curI=" +curI)
      if (curI==i){
        st=true
        break;
      }
    }
    if (st){
      continue
    }
    var cur=this.Questions.myArrayList[curI]
    console.log(cur)
    var tempI=cur.indexOf("level")+7
    var temp= +cur[tempI]
    console.log(stage)
    console.log(temp)

    if(stage!=temp){
      continue
    }
    break;
    }
    this.loadQuestion(curI)
    this.selected.push(curI)
  }

  constructor(private httpClient: HttpClient){}

  loadQuestion(num:number ){
    var current=this.Questions.myArrayList[num]
    this.currentQuestion=this.load(current,"question")

    var i = Math.floor((Math.random()*this.Randomed.length))
    this.currentAnswerA=this.load(current,this.Randomed[i])
    this.Randomed.splice(i,1)
    var i = Math.floor((Math.random()*this.Randomed.length))
    this.currentAnswerB=this.load(current,this.Randomed[i])
    this.Randomed.splice(i,1)
    var i = Math.floor((Math.random()*this.Randomed.length))
    this.currentAnswerC=this.load(current,this.Randomed[i])
    this.Randomed.splice(i,1)
    var i = Math.floor((Math.random()*this.Randomed.length))
    this.currentAnswerD=this.load(current,this.Randomed[i])
    this.Randomed.splice(i,1)

  
  }
  load(current:string , wanted:string){
    var tempI=current.indexOf(wanted)+wanted.length+3
    var tempII=tempI
    var tempS=""
    while (current[tempII]!='"'){
      tempII++;
    }
    tempS=current.slice(tempI,tempII)
    console.log(tempI)
    console.log(tempII)
    console.log(tempS)
    if(wanted=="A1")
      this.correct=tempS
    return tempS
  }



  ngOnInit(){
    var current=this.Questions.myArrayList[0]
    console.log(current)
    this.qSelect()  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }

}
