import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];

  maxDocumentId: number;
  
  documentListChangedEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();

  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[]{
    //  return the list of contacts
    return this.documents.slice();
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
  this.documentChangedEvent.emit(this.documents.slice());
}

addDocument(newDocument: Document) {
  if (!newDocument){
    return;
  }
  
  this.maxDocumentId++
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument)
  const documentsListClone = this.documents.slice()
  this.documentListChangedEvent.next(documentsListClone)
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument)
      return

  let pos = this.documents.indexOf(originalDocument)
  if(pos < 0){
    return
  }

  newDocument.id = originalDocument.id
  this.documents[pos] = newDocument
  const documentsListClone = this.documents.slice()
  this.documentListChangedEvent.next(documentsListClone)
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
