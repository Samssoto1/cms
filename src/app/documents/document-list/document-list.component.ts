import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

// Create a new EventEmitter object at the top of the class of the Document data type and assign it to a class output variable named selectedDocumentEvent.
@Output() selectedDocumentEvent = new EventEmitter<Document>()

  documents: Document[] = [
    {id: 1, name: "Document1", description: "words", url: "www.document1.com", children: []},
    {id: 2, name: "Document2", description: "words", url: "www.document2.com", children: []},
    {id: 3, name: "Document3", description: "words", url: "www.document3.com", children: []},
    {id: 4, name: "Document4", description: "words", url: "www.document4.com", children: []},
    {id: 5, name: "Document5", description: "words", url: "www.document5.com", children: []}
  ]


  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
  
}
