import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  id: string;

  constructor(private contactService: ContactService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contact = this.contactService.getContact(this.id);
    })
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl("/contacts")
    // this.router.navigate(['/contacts'], {relativeTo:this.activeRoute})
  }

}
