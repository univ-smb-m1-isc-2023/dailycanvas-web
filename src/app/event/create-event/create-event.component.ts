import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";
import {Event} from "../../../model/event";
import {EventService} from "../../../services/event/event.service";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {FloatingNavComponent, NavElement} from "../../elements/floating-nav/floating-nav.component";



@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FloatingNavComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    provideNativeDateAdapter()
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  redirectLinks: NavElement[] = [
    {
      name: "Mes évènements",
      link: "/events"
    }
  ];
  eventForm = new FormGroup({
    title: new FormControl<string>('',{
      validators: [Validators.required],
      nonNullable: true
      }),
    description: new FormControl<string>('',{
      nonNullable: false
    }),
    date: new FormControl<Date>(new Date()),
    birthday: new FormControl<boolean>(false,{
      validators: [Validators.required],
      nonNullable: true
    })
    })

  constructor(private userService: UserService, private eventService: EventService) {

  }

  createEvent(){
    if(this.eventForm.status === "VALID"){
      let id: number | undefined = this.userService.getLocalUser()?.id
      if (id == undefined){
        console.log("user error")
        return
      }
      const event: Omit<Event, "id"> = {
        idUser:id,
        title: <string>this.eventForm.value.title,
        description: <string>this.eventForm.value.description,
        date: <Date>this.eventForm.value.date,
        birthday: <boolean>this.eventForm.value.birthday
      };
      this.eventService.create(event).then(() => this.eventForm.reset())
    } else {
      console.log("error in form")
      return;
    }
  }
}
