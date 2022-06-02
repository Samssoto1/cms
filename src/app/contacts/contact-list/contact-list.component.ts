import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  subscription: Subscription
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    // Modify the ngOnInit() method to call the getContacts() method in the ContactService and assign the array of contacts returned from the method call to the contacts class variable in the ContactListComponent.
    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    })
    
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
