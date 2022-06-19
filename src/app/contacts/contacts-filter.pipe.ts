import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term){
    // Create an empty array
    let filteredArray: Contact[] = []

    if(term && term.length > 0){
    
    // Filter the array if theres a match to the term. (Lowercase to make comparing accurate)
    filteredArray = contacts.filter(
      (contact: Contact) => 
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
    return filteredArray.length > 0 ? filteredArray : contacts;
  }

}
