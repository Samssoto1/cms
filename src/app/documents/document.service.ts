import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];
  
  documentSelectedEvent = new EventEmitter<Document>();

  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
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
}
