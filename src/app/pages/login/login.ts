import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserOptions } from '../../interfaces/user-options';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../../core/service/auth/auth.service';
import { ErrorStateMatcher } from 'src/app/shared/utils/error.util';
import { BaseForm } from 'src/app/shared/base-class/base-form';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage extends BaseForm implements OnInit {
  submitted = false;
  login: UserOptions = { email: '', password: '' };

  nameCtrl: AbstractControl;
  passCtrl: AbstractControl;

  public nameControl(): AbstractControl {
    return this.formGroup.get('nameCtrl');
  }
  public passControl(): AbstractControl {
    return this.formGroup.get('passCtrl');
  }

  constructor(
    protected formBuilder: FormBuilder,
    protected changeDetectorRef: ChangeDetectorRef,
    public authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController,
    public router: Router,
    public afAuth: AngularFireAuth
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.formGroup = this.formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      passCtrl: ['', [Validators.required, Validators.maxLength(30)]],
    });

    if (this.authService.isAuthenticated !== false) {
      this.router.navigateByUrl('/account');
    } else {
      this.afAuth.auth.signOut();
    }
  }

  public onLogin(): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.authService.signinEmail(this.nameControl().value, this.passControl().value);
    } else {
      this.signupErrorPopup('Invalid Login Credentials');
    }
  }
  public loginGoogle(): void {
    this.authService.signinGoogle();
  }

  public navigateSignUp(): void {
    this.navCtrl.navigateForward('/signup');
  }

  async signupErrorPopup(errorMsg: string) {
    const alert = await this.alertController.create({
      header: 'Login Error',
      cssClass: 'center-alert',
      message: errorMsg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
