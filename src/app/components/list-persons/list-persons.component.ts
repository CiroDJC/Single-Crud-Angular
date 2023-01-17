import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/services/person.service';
import { HttpClient } from '@angular/common/http';
declare var $:any;
@Component({
  selector: 'app-list-persons',
  templateUrl: './list-persons.component.html',
  styleUrls: ['./list-persons.component.css']
})
export class ListPersonsComponent implements OnInit {
  persons: any[] = [];
  constructor(private _personService: PersonService,
              private toastr: ToastrService,
              private http: HttpClient) { 
              }
  ngOnInit(): void {
    this.getPersons();
  }
  getPersons() { 
    this._personService.getPersons().subscribe(data => {
      this.persons = [];
  setTimeout(()=>{   
    $('#datatableExample').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: false,
      lengthMenu : [5, 10, 25],
      destroy: true,
  } );
  }, 1);
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
        window.location.reload()
    }).catch(Error=>{
      console.log(Error);
    })
  }
}
