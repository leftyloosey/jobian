import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadComponentService } from '../../services/upload-component-service/upload-component-service';

@Component({
  selector: 'app-upload-component',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-component.html',
  styleUrl: './upload-component.scss',
})
export class UploadComponent {
  protected headerImageHidden: boolean = true;
  public receivedImageString = input.required<string>();
  public width = input.required<number>();

  protected headerImageString = output<string>();

  @ViewChild('file', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  @ViewChild('canvasImage') canvasRef:
    | ElementRef<HTMLCanvasElement>
    | undefined;
  @ViewChild('sloop') imgRef: ElementRef<HTMLImageElement>;

  constructor(protected upload: UploadComponentService) {
    this.imgRef = { nativeElement: new Image() };
  }

  ngOnChanges() {
    this.reactToImageString(this.receivedImageString());
    const fileTypes = ['image/png', 'image/jpeg'];
    this.fileInput?.nativeElement.setAttribute('accept', fileTypes.join(', '));
  }

  protected reactToImageString(strang: string | undefined) {
    if (strang) {
      this.headerImageHidden = false;
      this.imgRef.nativeElement.setAttribute('src', strang);
    }
  }
}
