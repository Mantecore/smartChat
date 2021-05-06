import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {Observable, of, from } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AngularFireList } from 'angularfire2/database';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed!: Observable<ChatMessage[]>;
  // feed: Observable<ChatMessage[string]>;
  // feed!: any;
  // feed!: AngularFireList;
  constructor(private chat: ChatService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    console.log('feed initializing...');
    this.feed = this.chat.getMessages().valueChanges();
  }

  // tslint:disable-next-line:typedef
  ngOnChanges() {
    this.feed = this.chat.getMessages().valueChanges();
  }
}
