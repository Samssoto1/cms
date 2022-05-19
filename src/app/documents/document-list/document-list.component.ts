import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

// Create a new EventEmitter object at the top of the class of the Document data type and assign it to a class output variable named selectedDocumentEvent.


  documents: Document[] = []


  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document){
    this.documentService.documentSelectedEvent.emit(document);
  }

  
}
