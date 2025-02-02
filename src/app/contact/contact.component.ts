import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IDeactivateComponent } from '../services/ContactDeactivateRouteGuard';



@Component({
  selector: 'app-contact',
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements IDeactivateComponent{

  name='';
  email='';
  message='';
  onSubmit(){

  }

  canExit(){
    if(this.name || this.email || this.message){
      return confirm("You have unsaved changes, Do you want to exit contact page?");
    }
    else{
      return true
    }
  }
}
