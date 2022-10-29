import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APINoteService } from '../api-note.service';
import { DialogSheetComponent } from '../dialog-sheet/dialog-sheet.component';
import { Subscription } from 'rxjs';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home-notes',
  templateUrl: './home-notes.component.html',
  styleUrls: ['./home-notes.component.css']
})


export class HomeNotesComponent implements OnInit {



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
  constructor(private dialog: MatDialog, private _APINoteService: APINoteService) {
    this.clickEventSubscription = this._APINoteService.getClickEvent().subscribe((value) => {
      this.displayPosts();
    });

    this.clickEventSubscriptionUpdate = this._APINoteService.getClickEvenUpdate().subscribe((value) => {
      this.displayPosts();
    });

    this._APINoteService.getCurrentUser();
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
    this._APINoteService.getPosts().subscribe({
      next: (response) => {

        if (response.message == 'get all posts success' ) {
          this.AllNotes = '';
          this.AllNotes = response.posts;
          console.log(this.AllNotes)

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
