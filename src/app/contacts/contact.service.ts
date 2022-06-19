import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();

  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor(private httpClient: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  storeContacts(){
    let contacts = JSON.stringify(this.contacts);

    const headers = new HttpHeaders({'Content-Type': 'application/json'})

    this.httpClient.put("https://wdd430-38a0d-default-rtdb.firebaseio.com/contacts.json", contacts, {
      headers: headers
    })
    .subscribe( () => {
      this.contactListChangedEvent.next(this.contacts.slice());
    })
  }

  getContacts(){
    //  return the list of contacts
    this.httpClient
    .get('https://wdd430-38a0d-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
       (contacts: Contact[]) => { 
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        //sort documents
        this.contacts.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );

        //emit the next document list changed event
        this.contactListChangedEvent.next(this.contacts.slice());
      }, 
      (error) => {
      console.log(error);
      }
    );
  }

  getContact(id: string): Contact {
    console.log(id)
    console.log(this.contacts.find((contact) => contact.id === id))
    return this.contacts.find((contact) => contact.id === id);
}

  deleteContact(contact: Contact){
  if (!contact) {
     return;
  }
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) { // . If the index is negative, the document was not found and the method is aborted.
     return;
  }
  this.contacts.splice(pos, 1);
  // this.contactChangedEvent.emit(this.contacts.slice());
  this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {

    if (originalContact == null || originalContact == undefined || newContact == null || newContact == undefined)
    {
      console.log('stuck here?')
      return
    }    
  
    console.log('qwer')
  
    let pos = this.contacts.indexOf(originalContact)
    if(pos < 0){
      return
    }
  
    newContact.id = originalContact.id
    this.contacts[pos] = newContact
    const contactsListClone = this.contacts.slice()
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    // let currentId;
  
    for (const contact of this.contacts){
      let currentId = Number(contact.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    }
  
    return maxId
  }
  
  addContact(newContact: Contact) {
    if (!newContact){
      return;
    }
    
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact)
    const contactsListClone = this.contacts.slice()
    this.storeContacts();
  }


}
