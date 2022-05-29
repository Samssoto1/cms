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
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        //  fat arrow function that receives an array
        // of Document objects. The fat arrow function
        // should then assign the documents array passed
        // into the function to the documents property
        // in the DocumentListComponent class.
      }
    )
  }

}
