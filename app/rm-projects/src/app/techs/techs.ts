import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {TechComponent} from './tech';

export class Tech {
  constructor(
    public name: string,
    public identifier: string,
    public description: string,
    public status: string,
    public is_public: string,
    public created_on: string,
    public updated_on: string
  ) {}
}

@Component({
  selector: 'fountain-techs',
  template: require('./techs.html'),
  directives: [TechComponent],
  providers: [HTTP_PROVIDERS]
})
export class TechsComponent {

  public techs: Tech[];
  public tech: Tech;
  // private redmineProjectsUrl = 'app/techs/projects.json'
  private redmineProjectsUrl = 'http://demo.redmine.org/projects.json';  // URL to web api

  constructor(public http: Http) {
    this.getTechs().subscribe(result => this.techs = result);
  }

  getTechs(): Observable<Tech[]> {
    return this.http
      .get(redmineProjectsUrl)
      .map(response => response.json().projects);
  }
}
