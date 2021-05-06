import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase/app';
import {ChatMessage} from '../models/chat-message.model';
// import * as constants from 'constants';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user!: string;
  chatMessages!: AngularFireList<ChatMessage>;
  chatMessage!: ChatMessage;
  userName!: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    // private afAuth: AngularFireAuth
  ) {
    //  this.afAuth.authState.subscribe(auth => {
    //   if (auth !== undefined && auth !== null) {
    //     this.user = auth;
    //    }
    //  });
  }


  sendMessage(msg: string): void {
    const timestamp = this.getTimeStamp();
    // const userEmail = this.user.email;
    const userEmail = 'Test@blabla.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'test-User',
      email: userEmail
    });

    console.log('Called sendMessage()!');
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages');
  }


  getTimeStamp(): string {
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
