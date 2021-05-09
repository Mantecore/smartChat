import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {ChatMessage} from '../models/chat-message.model';



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
  ) {}


  sendMessage(msg: string): void {
    const timestamp = this.getTimeStamp();
    const userEmail = 'Test@blabla.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
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
    return (date + ' ' + time);
  }
}
