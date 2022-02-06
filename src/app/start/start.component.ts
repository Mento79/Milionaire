import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    var sound = new Howl({ src: ['assets/back.mp3'], html5 :true,    loop: true,    autoplay: true,  }); 
    sound.play()

  }

  start(){
    this.router.navigate(['GameFlow'])
  }

}
