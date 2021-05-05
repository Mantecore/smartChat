import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';
// import * as constants from 'constants';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user!: string;
  chatMessages!: AngularFireList<ChatMessage[]>;
  chatMessage!: ChatMessage;
  userName!: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
    //  this.afAuth.authState.subscribe(auth => {
    //   if (auth !== undefined && auth !== null) {
    //     this.user = auth;
    //    }
    //  });
    }



  // tslint:disable-next-line:typedef
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'Test@blabla.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push([{
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'test-User',
      email: email
    }]);

    console.log('Called sendMessage()!');
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    // query to create our message feed binding
    console.log('calling getMessages()...');
    return this.db.list('messages');
    // return this.db.list('messages', ref => {
    //   return ref.limitToLast(25);
    // });
  }


  // tslint:disable-next-line:typedef
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = (now.getUTCHours() + 2) + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();
    // return now;
    return (date + ' ' + time);
  }
}
