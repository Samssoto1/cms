import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];
  
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[]{
    //  return the list of contacts
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find(document => {
        // return this.contact.id === id;
        return document.id === id;
    });
}
}
