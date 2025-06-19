import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VoterlistPageRoutingModule } from './voterlist-routing.module';
import { VoterlistPage } from './voterlist.page';
import { SharedModule } from '../../../shared.module';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, SharedModule,
    VoterlistPageRoutingModule, 
  ],
  providers: [SocialSharing,SQLite, SQLiteObject],
  declarations: [VoterlistPage,   ]
})
export class VoterlistPageModule {}
