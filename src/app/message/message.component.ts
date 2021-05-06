import { Component, OnInit, Input } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../services/auth.service';
import {ChatMessage} from '../models/chat-message.model';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage!: ChatMessage;
  userEmail!: string | undefined;
  userName!: string | undefined;
  messageContent!: string | undefined;
  timeStamp: string | undefined;
  // isOwnMessage; boolean;

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage): void {
    console.log(chatMessage.message);
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

}
