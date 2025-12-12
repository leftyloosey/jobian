import Uploader from 'quill/modules/uploader';
import { Delta } from 'quill';
import Emitter from 'quill/core/emitter';
import { S3Service } from '../../services/s3-service/s3-service';
import { inject } from '@angular/core';
import { S3Put } from '../interfaces/S3Put';
import { environment } from '../../../environments/environment';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ChildActivationEnd } from '@angular/router';

const pattern: RegExp = /\.[^.]+$/;

export const MODIFIED_DEFAULTS = (Uploader.DEFAULTS = {
  mimetypes: ['image/png', 'image/jpeg'],
  handler(range, files) {
    if (!this.quill.scroll.query('image')) {
      return;
    }
    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${environment.ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: environment.ACCESS_KEY_ID,
        secretAccessKey: environment.SECRET_ACCESS_KEY,
      },
    });

    let rem = '';
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((images) => {
      const update: any = images.reduce((delta: any, image) => {
        console.log(image);
        return delta.insert({
          image,
        });
      }, new Delta().retain(range.index).delete(range.length));
      this.quill.updateContents(update, Emitter.sources.USER);
      this.quill.setSelection(
        range.index + images.length,
        Emitter.sources.SILENT
      );
    });
  },
});
