import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import * as data from "./que.json";
import {Howl, Howler} from 'howler';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-flow',
  templateUrl: './game-flow.component.html',
  styleUrls: ['./game-flow.component.css']
})

export class GameFlowComponent implements OnInit {
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
          this.handlelose()
        }
      }
      else{
        if (this.currentAnswerC==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png"
          this.handlelose()

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
          this.handlelose()
          
        }
      
      }
      else{
        if (this.currentAnswerD==this.correct){
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansC.png"
          this.rightAnswer()
        }
        else{
          (<HTMLImageElement>document.getElementById(x))!.src="assets/ansX.png" ;     
          this.handlelose()
          //lose
        }

      }
    }
  }

  handlelose(){
    var lose = new Howl({ src: ['assets/lose.wav'], html5 :true,   autoplay: true,  }); 
    lose.play()  
    lose.volume(0.5)
    timer(500).subscribe(y => { 
      (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ansC.png" ;       
      timer(500).subscribe(y => { 
        (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ans.png"        
        timer(500).subscribe(y => { 
          (<HTMLImageElement>document.getElementById(this.searchForCorrect()))!.src="assets/ansC.png"        
          timer(2500).subscribe(y => { 
            var score
            switch(Math.floor(this.level/5)){
              case 0:
                score ="0"
                break;
              case 1:
                score ="1,000"
                break;  
              case 2:
                score ="32,000"
                break;
            }
            console.log(score)
            this.router.navigate(['end',score])
          })
  
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
    var win = new Howl({ src: ['assets/win.wav'], html5 :true,   autoplay: true,  }); 
    win.play()
    timer(2000).subscribe(y => {
      this.level++ 
      if(this.level!=15){
      document.getElementById(this.level.toString())!.className="levelat"
      if(this.level!=1){
        if (this.level%5==1){
          document.getElementById((this.level-1).toString())!.className="level2"
        }
        else{
          document.getElementById((this.level-1).toString())!.className="level"
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
    }
    else{
      var clap = new Howl({ src: ['assets/clap.wav'], html5 :true,   autoplay: true,  }); 
      clap.play()
      this.router.navigate(['end',"1,000,000"])
    }
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
    var curI=Math.floor(Math.random()*this.Questions.length)
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
    var cur=this.Questions[curI]
    console.log(cur)
    var temp= +cur.level
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

  constructor(private httpClient: HttpClient,private router: Router,private route:ActivatedRoute){}

  loadQuestion(num:number ){
    var current=this.Questions[num]
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
  load(current:any , wanted:string){
    var temp=""
    switch (wanted){
      case "question":
        temp=current.question
        break;
      case "A1":
        temp=current.A1
        this.correct=temp
        break;
      case "A2":
        temp=current.A2
        break;
      case "A3":
        temp=current.A3
        break;
      case "A4":
        temp=current.A4
        break;
    }

    return temp
  }



  ngOnInit(){
    var current=this.Questions[0]
    console.log(current)
    this.qSelect()  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }

}
