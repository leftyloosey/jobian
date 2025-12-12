import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  // MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-ministry-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    // MatDialogContent,
    MatLabel,
  ],
  templateUrl: './create-ministry-dialog.html',
  styleUrl: './create-ministry-dialog.scss',
})
export class CreateMinistryDialog {
  // public dialogRef: MatDialogRef<CreateMinistryDialog>;

  protected createMinistryForm = new FormGroup({
    title: new FormControl('', Validators.required),
    heading: new FormControl('', Validators.required),
    // partOfSpeech: new FormControl('', Validators.required),
  });
  constructor(public dialogRef: MatDialogRef<CreateMinistryDialog>) {}
  protected closeAndSave(e: Event) {
    e.preventDefault();
    const { title, heading } = this.createMinistryForm.value;

    this.dialogRef.close({ title, heading });
  }
}
