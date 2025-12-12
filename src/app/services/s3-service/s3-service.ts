import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';
import { S3Put } from '../../utils/interfaces/S3Put';
import { Delta } from 'quill';
import { BUCKET_NAME } from '../../utils/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private s3Client!: S3Client;
  private pattern: RegExp = /\.[^.]+$/;
  private BUCKET_NAME: string = BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${environment.ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: environment.ACCESS_KEY_ID,
        secretAccessKey: environment.SECRET_ACCESS_KEY,
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
    });
  }

  public async s3Put(commandData: S3Put) {
    const Bucket = this.BUCKET_NAME;
    const { Key, Body, ContentType } = commandData;
    const command = new PutObjectCommand({
      Bucket,
      Key,
      Body,
      ContentType,
    });
    await this.s3Client.send(command);
  }

  public async s3List(): Promise<ListObjectsV2CommandOutput> {
    const input = {
      Bucket: this.BUCKET_NAME,
    };
    const command = new ListObjectsV2Command(input);
    const response = await this.s3Client.send(command);
    return response;
  }
}
