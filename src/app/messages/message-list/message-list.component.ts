import { Component, OnInit } from '@angular/core';
import { Message } from '../message-model'
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  // public id: number, public subject: string, public msgText: string, public sender: string
  messages: Message[] = [];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {

    this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    })
  }

  onAddMessage(message: Message){
    // Implement the code in this method to push the Message object passed as an argument to the end of the messages list.
    this.messages.push(message);
  }

}
