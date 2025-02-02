import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../courses.service';
import { ItCourse } from '../interfaces/ItCourse';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';



@Component({
  selector: 'app-courses',
  imports: [CommonModule,FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  public c: ItCourse[] = [];
  courses: ItCourse[] = [];
  errorMessage ="";

  enteredSearchValue = '';
  displayLoadingIndicator = true;

  constructor(private service: CoursesService, private route: Router){}

  ngOnInit(){

    // this.route.events.subscribe((routerEvent: Event) => {
    //   if(routerEvent instanceof NavigationStart){
    //     this.displayLoadingIndicator=true;
    //     console.log('Navigation start event occurred');
    //   }
    //   if(routerEvent instanceof NavigationEnd 
    //     || routerEvent instanceof NavigationCancel
    //     || routerEvent instanceof NavigationError){
    //       this.displayLoadingIndicator = false
    //     }
    // })

    // this.courses = this.service.getCourses();
setTimeout(() => {
  this.displayLoadingIndicator = false;
  this.service.getCoursesFromApi()
    .subscribe({
      next: (data) => (
        this.courses = data),
      error: (error) => (this.errorMessage = error.message)
  });
}, 1000);
    
  }

  onSearch(){
    console.log(this.enteredSearchValue);
  }
  navigateToCourse(id:String){
    console.log(id);
    this.route.navigateByUrl("course/" +id)
  }
}
