import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgForm, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../core/service/auth/auth.service';
import { BaseForm } from 'src/app/shared/base-class/base-form';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage extends BaseForm implements OnInit {
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
    private authService: AuthService,
    public router: Router
  ) {
    super(formBuilder, changeDetectorRef);
  }
  public ngOnInit(): void {
    super.ngOnInit();

    this.formGroup = this.formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      passCtrl: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  public onSignup(): void {
    this.authService.signupEmail(this.nameControl().value, this.passControl().value);
  }

  public navigateLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
