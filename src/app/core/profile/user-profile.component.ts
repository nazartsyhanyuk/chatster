import {Component, AfterContentInit, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Profile } from '../shared';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy, OnInit, AfterContentInit {

  private profile: Profile = {
    name: '',
    photo: ''
  };

  private subscriptions: Subscription[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.auth
        .getUserState()
        .subscribe(state => {
          this.profile = state.profile;
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  ngAfterContentInit() {
    this.subscriptions.push(
      this.auth.getUserProfile()
        .subscribe(profile => {
          console.log('after loading user profile component');
          console.log(profile);
          this.profile = profile;
        })
    )
  }
}
