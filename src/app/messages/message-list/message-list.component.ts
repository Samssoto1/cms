import { Component, OnInit } from '@angular/core';
import { Message } from '../message-model'

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  // public id: number, public subject: string, public msgText: string, public sender: string
  messages: Message[] = [
    new Message(1, "Math", "This class is hard", "Bob"),
    new Message(2, "Math", "I agree", "Steve"),
    new Message(1, "Math", "Did anyone want to form a study group?", "Bob")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    // Implement the code in this method to push the Message object passed as an argument to the end of the messages list.
    this.messages.push(message);
  }

}
