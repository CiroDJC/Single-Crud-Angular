import { Component, InjectionToken, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-create-persons',
  templateUrl: './create-persons.component.html',
  styleUrls: ['./create-persons.component.css'],
})
export class CreatePersonsComponent implements OnInit {
  createPersons: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Sign Up';
  btn = 'Sign Up';
  constructor(private toastr: ToastrService,
    private _personService: PersonService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.createPersons = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Age: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [ Validators.minLength(10),Validators.required]],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  get f() { return this.createPersons.controls; }
  ngOnInit(): void {
    this.getPerson();
  }

  addUpdatePerson() {
    this.submitted = true;
    if (this.createPersons.invalid) {
      return;
    }
    if(this.id === null){
      this.addPerson();
    }else{
      this.updatePerson(this.id);
    }
  }

  addPerson(){
    const person: any = {
      firstName: this.createPersons.value.firstName,
      lastName: this.createPersons.value.lastName,
      Age: this.createPersons.value.Age,
      Email: this.createPersons.value.Email,
      mobileNumber: this.createPersons.value.mobileNumber,
      dateCreate: new Date(),
      dateUpdate: new Date
    }
    this.loading = true;
    this._personService.addPerson(person).then(() => {
      this.toastr.success('Person register successful!', 'Register successful',{
        positionClass:'toast-bottom-right'});
      this.loading = false;
      this.router.navigate(['/list-persons'])
    }).catch(Error => {
      console.log(Error);
      this.loading = false;
    })
  }
    updatePerson(id:string){
      const person: any = {
        firstName: this.createPersons.value.firstName,
        lastName: this.createPersons.value.lastName,
        Age: this.createPersons.value.Age,
        Email: this.createPersons.value.Email,
        mobileNumber: this.createPersons.value.mobileNumber,
        dateUpdate: new Date
      }
      this.loading =true;
      this._personService.updatePerson(id,person).then(() => {
        this.loading = false
        this.toastr.info('Info Person Update Sucessfull','Update Sucessfull',{
          positionClass:'toast-bottom-right'})
      })
      this.router.navigate(['/list-persons'])
    }

    getPerson() {
    
    if (this.id !== null) {
      this.loading = true;
      this.title = 'Udate Data';
      this.btn = 'Udate Person';
      this._personService.getPerson(this.id).subscribe(data => {
        this.loading = false;
        console.log(data.payload.data()['firstName']);
        this.createPersons.setValue({
          firstName: data.payload.data()['firstName'],
          lastName: data.payload.data()['lastName'],
          Age: data.payload.data()['Age'],
          Email: data.payload.data()['Email'],
          mobileNumber: data.payload.data()['mobileNumber'],
        })
      })
    }
  }
}
