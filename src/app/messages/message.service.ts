import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message-model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number; 

  constructor(private httpClient: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  getMessages(){
    //  return the list of contacts
    this.httpClient
    .get('http://localhost:3000/messages')
    .subscribe(
    (contacts: Message[]) => { 
        this.messages = contacts['returnMessages'];
        this.maxMessageId = this.getMaxId();
        //sort documents
        this.messages.sort((a, b) =>
          a.sender > b.sender ? 1 : a.sender < b.sender ? -1 : 0
        );

        //emit the next document list changed event
        this.messageChangedEvent.next(this.messages.slice());
      }, 
      (error) => {
      console.log(error);
      }
    );
  }

  storeMessages(){
    let messages = JSON.stringify(this.messages);

    const headers = new HttpHeaders({'Content-Type': 'application/json'})

    this.httpClient.put("https://wdd430-38a0d-default-rtdb.firebaseio.com/messages.json", messages, {
      headers: headers
    })
    .subscribe( () => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }

  getMaxId(): number {
    let maxId = 0;
    // let currentId;
  
    for (const message of this.messages){
      let currentId = Number(message.id);
      if(currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  getMessage(id: string): Message {
    return this.messages.find(message => {
        // return this.contact.id === id;
        return message.id === id;
    });
}

//   addMessage(message: Message){
//     if (!message){
//       return;
//     }

//     this.maxMessageId++;
//     message.id = this.maxMessageId.toString();
//     this.messages.push(message);
//     this.storeMessages();
//   }
// }

addMessage(message: Message) {
  if (!message) {
    return;
  }

  // make sure id of the new Document is empty
  message.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.httpClient.post<{ msg: string, message: Message }>('http://localhost:3000/messages',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to messages
        this.messages.push(responseData.message);
        this.messageChangedEvent.next(this.messages.slice());
      }
    );
}
}