import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];

  maxDocumentId: number;
  
  documentListChangedEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();

  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private httpClient: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  storeDocuments(){
    let documents = JSON.stringify(this.documents);

    const headers = new HttpHeaders({'Content-Type': 'application/json'})

    this.httpClient.put("https://wdd430-38a0d-default-rtdb.firebaseio.com/documents.json", documents, {
      headers: headers
    })
    .subscribe( () => {
      this.documentListChangedEvent.next(this.documents.slice());
    })
  }

  getDocuments(){
    //  return the list of contacts
    // return this.documents.slice();
    this.httpClient
    .get('https://wdd430-38a0d-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
       (documents: Document[]) => { 
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        //sort documents
        this.documents.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );

        //emit the next document list changed event
        this.documentListChangedEvent.next(this.documents.slice());
      }, 
      (error) => {
      console.log(error);
      }
    );
  }

  getDocument(id: string): Document {
    return this.documents.find(document => {
        
        return document.id === id;
    });
}

deleteDocument(document: Document) {
  // validation - test if valid document
  if (!document) {
     return;
  }
  const pos = this.documents.indexOf(document);
  if (pos < 0) { // . If the index is negative, the document was not found and the method is aborted.
     return;
  }
  this.documents.splice(pos, 1);
  // this.documentChangedEvent.emit(this.documents.slice());
  this.storeDocuments()
}

addDocument(newDocument: Document) {
  if (!newDocument){
    return;
  }
  
  this.maxDocumentId++
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument)
  const documentsListClone = this.documents.slice()
  this.storeDocuments()
}

updateDocument(originalDocument: Document, newDocument: Document) {
  console.log(originalDocument)
  console.log(newDocument)
  // if (!originalDocument || !newDocument)

  if (originalDocument == null || originalDocument == undefined || newDocument == null || newDocument == undefined)
  {
    console.log('stuck here?')
    return
  }    

  console.log('qwer')

  let pos = this.documents.indexOf(originalDocument)
  if(pos < 0){
    return
  }

  newDocument.id = originalDocument.id
  this.documents[pos] = newDocument
  const documentsListClone = this.documents.slice()
  this.storeDocuments()
}

getMaxId(): number {
  let maxId = 0;
  // let currentId;

  for (const document of this.documents){
    let currentId = Number(document.id);
    if(currentId > maxId){
      maxId = currentId;
    }
  }

  return maxId
}

}
