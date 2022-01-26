import { Component } from '@angular/core';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Milion';
  currentQuestion=" مين اكل الجبنة"
  currentAnswerA="  ا. محسن"
  currentAnswerB="  ب. محسنة"
  currentAnswerC="  ج. محسنين"
  currentAnswerD="  د. محسنون"

  answered=false

  handle(x:string){

    if (!this.answered){
      this.answered=true
      document.getElementById("da")!.className="container"
      document.getElementById("db")!.className="container"
      document.getElementById("dc")!.className="container"
      document.getElementById("dd")!.className="container"
  
      timer(1000).subscribe(y => { if (x=="c"){
        (<HTMLImageElement>document.getElementById(x))!.src="assets/ans2Cor.png"
      }
      else{
        (<HTMLImageElement>document.getElementById(x))!.src="assets/ans2X.png"
  
      } })
  
    }
    
  }
}
