import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {

  selectedContact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // Implement the ngOnInit() method and subscribe to the contactSelectedEvent event of the ContactService. Implement an arrow function to receive the Contact object passed with the emitted event and assign it to the selectedContact class variable in the ContactsComponent.
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
          this.selectedContact = contact;
        }
      );
  }

}
