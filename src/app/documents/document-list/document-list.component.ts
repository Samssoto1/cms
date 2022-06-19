import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

// Create a new EventEmitter object at the top of the class of the Document data type and assign it to a class output variable named selectedDocumentEvent.

  
  documents: Document[] = []

  subscription: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    
    
    this.subscription = this.documentService.documentListChangedEvent.subscribe( (documentsList: Document[]) => {
      this.documents = documentsList;
    })

    this.documentService.getDocuments();
    console.log('here')

  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
