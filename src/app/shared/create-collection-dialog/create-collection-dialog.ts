import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UploadComponent } from '../upload-component/upload-component';
import { Post } from '../../../graphql/generated';
import { ExtendPostDialog } from '../../utils/interfaces/UpdatePost';
import { ExtendCollectionDialog } from '../../utils/interfaces/UpsertCollection';
import {
  COLLECTION_PICTURE_SIZE,
  POST_PICTURE_SIZE,
} from '../../utils/constants/constants';
@Component({
  selector: 'app-create-collection-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogActions,
    MatLabel,
    UploadComponent,
  ],
  templateUrl: './create-collection-dialog.html',
  styleUrl: './create-collection-dialog.scss',
})
export class CreateCollectionDialog {
  headerString: string = '';
  content: any = [];
  headerImageWidth: number = 0;
  collectionId: number = 0;

  mimetypes!: ['image/png', 'image/jpeg'];

  protected createCollectionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    heading: new FormControl('', Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateCollectionDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: ExtendCollectionDialog | ExtendPostDialog,
    // @Inject(MAT_DIALOG_DATA) public data: Collection | Post,
  ) {
    if (data) {
      this.createCollectionForm.setValue({
        title: data?.title,
        heading: data?.heading,
      });
      if (data.postType) {
        this.headerImageWidth = POST_PICTURE_SIZE;
      } else {
        this.headerImageWidth = COLLECTION_PICTURE_SIZE;
      }

      this.headerString = data.headerImageString;

      this.collectionId = data.id;
      const post = data as Post;
      if (post.content) this.content = post.content;
    }
  }

  protected closeAndSave(e: Event) {
    e.preventDefault();

    const { title, heading } = this.createCollectionForm.value;

    let headerImageString = this.headerString;
    let id = this.collectionId;
    this.dialogRef.close({ id, title, heading, headerImageString });
  }

  protected receiveHeaderImageString($event: string) {
    this.headerString = $event;
  }
}
