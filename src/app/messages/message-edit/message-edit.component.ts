import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message-model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('msgText', {static: true}) msgText: ElementRef;
  @ViewChild('subject', {static: true}) subject: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Sam Soto";

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    
    // Get the value stored in the subject input element
    const subj = this.subject.nativeElement.value;

    // Get the value stored in the msgText input element
    const msg = this.msgText.nativeElement.value;

    // Create a new Message object
    // Assign a hardcoded number to the id property of the new Message object
    // Assign the value of the currentSender class variable to the sender property of the new Message object.
    // Assign the values retrieved from the subject and msgText input elements to the corresponding properties of the new Message object
    // Call the addMessageEvent emitter’s emit() method and pass it the new Message object just created
    this.addMessageEvent.emit(new Message(1, subj, msg, this.currentSender ));
  }

  onClear(){
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
