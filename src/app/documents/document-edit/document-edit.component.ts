import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Document } from '../documents.model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document; // original unedited doc
  document: Document; // this is the edited doc
  editMode: boolean = false;

  id: string;




  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        console.log('id')
        console.log(params['id'])
        this.id = params['id'];
        if(this.id == undefined || this.id == null){
          this.editMode = false;
          return
        }
        this.originalDocument = this.documentService.getDocument(this.id);

        if(this.originalDocument == undefined || this.originalDocument == null){
          return
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        console.log('document')
        console.log(this.document)
      }
    );
  }

  onSubmit(f: NgForm){
    console.log(f);
    let value = f.value;
    let newDocument = new Document(this.id, value.name, value.description, value.url, [])
    console.log(newDocument)
    console.log(value.name)
    console.log(this.id)
    console.log(this.originalDocument)
    if(this.editMode == true){
      this.documentService.updateDocument(this.originalDocument, newDocument);
      console.log('here')
    }
    else{
      this.documentService.addDocument(newDocument);
    }
    console.log(newDocument)
    this.router.navigateByUrl('/documents');
  }

  onCancel(){
    this.router.navigateByUrl('/documents');
  }

}
