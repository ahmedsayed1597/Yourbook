import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APINoteService {

  private subjectUpdate = new Subject<any>();
  private subjectDelete = new Subject<any>();

  private note_id_update: any;
  private noteTitle?: string;
  private notedesc?: string;
  private token:any 
  data: any = {
    token: '',
    userID: '',
  }

  private commentID:any;

  noteDeleteObject: any = {
 
    _id: '',
  }
 
  constructor(private _HttpClient: HttpClient) {
   this.getCurrentUser()
    
   }

  setNoteID(id: any) {
    this.note_id_update = id;
  }

  getNoteID(): any {
    return this.note_id_update ;
  }

  setCommentID(id: any) {
    this.commentID = id;
  }

  getCommentID(): any {
    return this.commentID ;
  }

  setNoteTitle(title: string) {
    this.noteTitle = title;
  }

  setNoteDesc(desc: string) {
    this.notedesc = desc;
  }

  getNoteTitle() {
    return this.noteTitle;
  }

  getNoteDesc() {
    return this.notedesc;
  }


  sentClickEvenUpdate(value: any) {
    this.subjectDelete.next(value);
  }

  getClickEvenUpdate(): Observable<any> {
    return this.subjectUpdate.asObservable();
  }

  sentClickEvent(value: any) {
    this.subjectDelete.next(value);
  }

  getClickEvent(): Observable<any> {
    return this.subjectDelete.asObservable();
  }
  savepost(userNote: any): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.post('https://yourbok.herokuapp.com/posts/addpost',userNote,
    {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    } );
  }

  saveComment(comment: any): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.post('https://yourbok.herokuapp.com/comments/addComment',comment,
    {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    } );
  }

  updateComment(comment: any): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.put('https://yourbok.herokuapp.com/comments/updateComment',comment,
    {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    } );
  }

  deleteComment(comment: any): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.put('https://yourbok.herokuapp.com/comments/deleteComment',comment,
    {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    } );
  }


  getCurrentUser(): any {
   this.token =  localStorage.getItem('token');
  }

  getPosts(): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.get('https://yourbok.herokuapp.com/posts/getAllPosts', {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    });

  }

  getUserPosts(): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.get('https://yourbok.herokuapp.com/posts/userPosts', {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    });

  }
  updatePost(userNote: any): Observable<any> {
    this.getCurrentUser()
    return this._HttpClient.put('https://yourbok.herokuapp.com/posts/postUpdate', userNote, {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    });
   
  }

  deletePost(): Observable<any> {
    this.getCurrentUser()
     this.noteDeleteObject._id = this.note_id_update;
     console.log(this.noteDeleteObject)

    return this._HttpClient.put('https://yourbok.herokuapp.com/posts/postDelete', this.noteDeleteObject,  {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    });
  }

}
