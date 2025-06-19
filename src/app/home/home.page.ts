import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { AuthConstants } from 'src/app/services/constants/auth.constant';
import { ViewWillEnter } from '@ionic/angular';
import { App, AppInfo } from '@capacitor/app';
import { LoaderService } from '../services/loader.service';
import { DataSharingService } from '../services/data-sharing.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appInfo: AppInfo | undefined;

  constructor(private loaderService: LoaderService,
    private data: DataSharingService,
    private router: Router,
    private httpService: ApiService,
    private storageService: StorageService,
    private toastService: ToastService,) { }
  postData = {
    Mobileno: '',
    Password: ''
  };
   
  async loginAction() {
    await this.loaderService.showLoader();
    
    this.httpService.post('/api/UserAgent/LoginWebUser', this.postData)
        .subscribe(async (x: any) => {
          if (x.Data[0]) {
            //this.updateFCMID();
            const token = x.Data[0].TockenID;
            const roleName = x.Data[0].UserType;

            this.storageService
              .store(AuthConstants.AUTH, x.Data[0])
              .then(x => {
                localStorage.setItem('token', token);
                this.data.SetUserData();
                this.router.navigate(['/admin/dashboard'], { replaceUrl: true });
              });
          }
          else {
            await this.loaderService.hideLoader();
            this.toastService.presentToast('Incorrect username and password.', 'danger');
          }
        }, async error => {
          await this.loaderService.hideLoader();
          this.toastService.presentToast('Network Issue.', 'danger');
        });
    
  }

}
