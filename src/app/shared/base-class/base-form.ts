import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorStateMatcher } from '../utils/error.util';
import { FORM_MARK_TOUCHED } from '../utils/validation.utils';


export class BaseForm implements OnInit, OnDestroy {

    public formGroup: FormGroup;
    public matcher = new ErrorStateMatcher();

    protected componentIdle: Subject<boolean> = new Subject();
    protected abstractControl: AbstractControl;

    constructor(
        protected formBuilder: FormBuilder,
        protected changeDetectorRef: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.componentIdle.next(true);
        this.componentIdle.complete();
    }

    public checkFieldNameError(fieldName: string): boolean {
        if (this.formGroup) {
            const formGroup: AbstractControl = this.formGroup.get(fieldName) as AbstractControl;
            return formGroup && formGroup.invalid && (formGroup.dirty || formGroup.touched);
        }
        return false;
    }

    execFOrmValidation(): void {
        FORM_MARK_TOUCHED(this.abstractControl);
    }
}