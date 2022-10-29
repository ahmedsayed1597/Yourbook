import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { APINoteService } from '../api-note.service';
import { Subscription } from 'rxjs';
import { DialogSheetComponent } from '../dialog-sheet/dialog-sheet.component';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  AllNotes: any;
  clickEventSubscription?: Subscription
  clickEventSubscriptionUpdate?: Subscription

  note_id: any = '';

  commentData = new FormGroup({
    content: new FormControl('', [Validators.required]),

  });

  commentUpdateData = new FormGroup({
    content: new FormControl('', [Validators.required]),

  });

  comment: any = {
    content: '',
    postID: ''
  };

  updatedComment: any ={
    content: '',
    postID: '',
    commentID: ''
  };

  deletedComment:any ={
    postID: '',
    commentID: ''
  }

  userName: any = this._auth.userName.value;

    constructor(private dialog: MatDialog, private _APINoteService: APINoteService, private _auth: ApiService) {
    this.clickEventSubscription = this._APINoteService.getClickEvent().subscribe((value) => {
      this.displayPosts();
      this._auth.userName.subscribe((e) => { this.userName = e });
    });

    this.clickEventSubscriptionUpdate = this._APINoteService.getClickEvenUpdate().subscribe((value) => {
      this.displayPosts();
    });
  }

  

  saveComment(form:any) {
    this.comment.content = form.value['content'];
    this.comment.postID = this._APINoteService.getNoteID()
    this._APINoteService.saveComment(this.comment).subscribe({
      next: (response) => {
        if (response.message == 'added success') {
          this._APINoteService.sentClickEvent(form);
          this.displayPosts();
        }
        else{
          alert(response.message);
        }
      },
      error: (err) => { console.log(err); }
    });
   }

   updateComment(form:any){
    this.updatedComment.content = form.value['content'];
    this.updatedComment.postID = this._APINoteService.getNoteID()
    this.updatedComment.commentID = this._APINoteService.getCommentID();
    

    this._APINoteService.updateComment(this.updatedComment).subscribe({
      next: (response) => {
        if (response.message == 'updated success') {
          this.displayPosts();
        }
        else{
          alert(response.message);
        }

      },
      error: (err) => { console.log(err); }
    });  
   }
   
   deleteComment(){
    
      //setTimeout(() => {
        this.deletedComment.postID =  this._APINoteService.getNoteID();
        this.deletedComment.commentID =  this._APINoteService.getCommentID();
        console.log(this.deletedComment)
        this._APINoteService.deleteComment(this.deletedComment).subscribe({
          next: (response) => {
            if (response.message == 'deleted success') {
              //this._APINoteService.sentClickEvent(this.deleteComment);
              this.displayPosts();

            }
            else{
              alert(response.message);
            }
    
          },
          error: (err) => { console.log(err); }
        });
      //}, 5000)
  
   }

   
  openDialog() {
    this.dialog.open(DialogSheetComponent);
  }

  openDialogUpdate() {
    this.dialog.open(UpdateDialogComponent);
  }

  setNoteId(id: any) {
    this._APINoteService.setNoteID(id);
  }

  setCommentId(id: any) {
    this._APINoteService.setCommentID(id);
  }


  setNoteTiltelDesc(title: string, desc: string) {
    this._APINoteService.setNoteTitle(title);
    this._APINoteService.setNoteDesc(desc);
  }

  displayPosts() {
    this._APINoteService.getUserPosts().subscribe({
      next: (response) => {

        if (response.message == 'get all user posts success' ) {
          this.AllNotes = '';
          this.AllNotes = response.result;

        }

      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  deletePost() {
    this._APINoteService.deletePost().subscribe({
      next: (response) => {
        if (response.message == 'deleted success') {
          this.displayPosts();
          this.note_id = '';
        }
        else{
          alert(response.message)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnInit(): void {

    this.displayPosts();

  }

}
