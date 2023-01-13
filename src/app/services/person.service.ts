import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private firestore: AngularFirestore) { }

  addPerson(person:any):Promise<any>{
    return this.firestore.collection('persons').add(person);
  }
  getPersons():Observable<any>{
    return this.firestore.collection('persons', ref => ref.orderBy('dateCreate','desc') ).snapshotChanges();
  }
  deletePerson(id: string):Promise<any>{
    return this.firestore.collection('persons').doc(id).delete();
  }
  getPerson(id:string):Observable<any>{
    return this.firestore.collection('persons').doc(id).snapshotChanges();
  }
  updatePerson(id:string,data:any):Promise<any>{
    return this.firestore.collection('persons').doc(id).update(data);
  }
}
