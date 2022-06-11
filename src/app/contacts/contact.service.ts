import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];

  maxContactId: number;

  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();

  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    this.contactListChangedEvent.next(contactsListClone)
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
    this.contactListChangedEvent.next(contactsListClone)
  }


}
