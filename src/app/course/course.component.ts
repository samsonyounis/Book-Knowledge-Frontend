import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItCourse } from '../interfaces/ItCourse';
import { CoursesService } from '../courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-course',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  course?: ItCourse;
  courseId: String | null='';
  errorMessage ="";
  constructor(private activatedRoute: ActivatedRoute,
             private coursesService: CoursesService,
            private router:Router){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.courseId = param.get("id");
      this.coursesService.getCoursesFromApi()
      .subscribe({
        next: (data) => (this.course = data.find(c=> c.id == this.courseId)),
        error: (error) => (this.errorMessage = error.message)
    });
    });

  }
  enroll(){
  }
  navigateToCart(){
    this.router.navigateByUrl("/cart")
  }
}
