import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {
  persons: any[] = [];
  constructor(private _personService: PersonService,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getPersons();

  }
  
  getPersons() {
    this._personService.getPersons().subscribe(data => {
      this.persons = [];
      data.forEach((element: any) => {
        this.persons.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.persons);
    })
  }

  deletePerson(id: string){
    this._personService.deletePerson(id).then(()=>{
      this.toastr.error('Person deleted sucessfull','Delete Sucessfull',{
        positionClass:'toast-bottom-right'})
    }).catch(Error=>{
      console.log(Error);
    })
  }
}
