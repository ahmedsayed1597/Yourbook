import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { APINoteService } from '../api-note.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {


  postUpdate: any = {
    title: '',
    content: '',
    _id: '',

  };

  logInForm = new FormGroup({
    title: new FormControl(this._APINoteService.getNoteTitle(), [Validators.required,]),
    desc: new FormControl(this._APINoteService.getNoteDesc(), [Validators.required,]),

  });

  constructor(private _APINoteService: APINoteService) {

  }

  onUpdate(form: any) {

    this.postUpdate.title = form.value['title'];
    this.postUpdate.content = form.value['desc'];
    this.postUpdate._id = this._APINoteService.getNoteID();

    this._APINoteService.updatePost(this.postUpdate).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message == 'updated success') {
          this._APINoteService.sentClickEvenUpdate(form);
        }
        else{
          alert(response.message);
        }

      },
      error: (err) => { console.log(err); }
    });
    (document.getElementById('close') as HTMLElement).click();

  }



  ngOnInit(): void {

  }

}
