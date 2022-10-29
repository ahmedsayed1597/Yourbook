import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { APINoteService } from '../api-note.service';


@Component({
  selector: 'app-dialog-sheet',
  templateUrl: './dialog-sheet.component.html',
  styleUrls: ['./dialog-sheet.component.css']
})
export class DialogSheetComponent implements OnInit {

  userId: any;
  token: any;

  note: any = {
    title: '',
    content: '',
  };

  logInForm = new FormGroup({
    title: new FormControl('', [Validators.required,]),
    content: new FormControl('', [Validators.required,]),

  });

  constructor(private _APINoteService: APINoteService) { }

  onSubmit(form: any) {
    //console.log(form.title.value);
    this.note.title = form.value['title'];
    this.note.content = form.value['content'];
    this._APINoteService.savepost(this.note).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message == 'added success') {
          this._APINoteService.sentClickEvent(form);
        }

      },
      error: (err) => { console.log(err); }
    });

    //this._HomeNoteComponanet.displayNotes();

    (document.getElementById('close') as HTMLElement).click();

  }



  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    let id: any = jwtDecode(this.token);
 
    this.userId = id["_id"];

  }

}
