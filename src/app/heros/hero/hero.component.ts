import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StarWarsService} from "../heros.service";
import {Observable, Subscription, BehaviorSubject} from "rxjs";

export interface Hero{
  name: string,
  image: string
}

@Component({
  selector: 'app-hero',
  templateUrl: 'hero.component.html',
  styleUrls: ['hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {

  @ViewChild('inpRef') input;

  heroId: number;
  hero: BehaviorSubject<Hero>;
  description: string;
  querySub: Subscription;
  editing: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private starwarService: StarWarsService) {

  }

  ngOnInit() {

    this.hero = new BehaviorSubject({name: 'Loading...', image: ''});

    this.route.params
     .map((p:any) => {
      this.editing = false;
      this.heroId = p.id;
      return p.id;
     })
     .switchMap( id => this.starwarService.getPersonDetail(id))
    .subscribe( this.hero);


   /* // since herocomponent get init everytime, it would be better to use snapshot for proferemence
    this.heroId = this.route.snapshot.params['id'];
    this.hero = this.starwarService.getPersonDetail(this.heroId);*/

    this.querySub = this.route.queryParams.subscribe(
      param => this.description = param['description']
    );

    console.log("observers", this.route.queryParams['observers'].length)
  }

  ngOnDestroy() {
    this.querySub.unsubscribe()
  }

  saveHero(newName){
    this.editing = true;
    console.log("editing", this.editing)
  }

  prev(){
    return Number(this.heroId) - 1;
  }

  next(){
    return Number(this.heroId) + 1;
  }
}
