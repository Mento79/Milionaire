import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  constructor( private router: Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  score=this.route.snapshot.paramMap.get('level')!

  replay(){
    this.router.navigate(['GameFlow'])
  }

}
