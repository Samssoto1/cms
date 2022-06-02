import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();

  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[]{
    //  return the list of contacts
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    console.log('here')
    console.log(this.contacts.find((contact) => contact.id === id))
    return this.contacts.find((contact) => contact.id === id);
    // return this.contacts.find(contact => {
    //     console.log(contact.id)
    //     return contact.id === id;
    // });
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
  this.contactListChangedEvent.next(this.contacts.slice())
  }


}
