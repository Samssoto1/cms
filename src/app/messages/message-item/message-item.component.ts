import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from '../message-model'
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit, OnDestroy{

  @Input() message: Message;
  messageSender: string;
  sub: Subscription

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // const contact: Contact = this.contactService.getContact(this.message.sender);
    console.log(this.message);
    console.log(this.message.sender);
    this.sub = this.contactService.getContact(this.message.sender).subscribe((res) => {
      console.log('here')
      console.log(res);
      this.messageSender = res.contact.name;
    });
    // console.log(this.message.sender)
    // this.messageSender = contact.name;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
