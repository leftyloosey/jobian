import { ElementRef, Injectable, OutputEmitterRef } from '@angular/core';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Injectable({
  providedIn: 'root',
})
export class UploadComponentService {
  protected width: number = 100;
  protected height: number = 100;

  protected resize(
    imgToResize: HTMLElement,
    file: File,
    kanvasRef: ElementRef<HTMLCanvasElement> | undefined,
  ) {
    if (!kanvasRef) {
      throw new Error('Could not get canvasRef');
    }
    const canvasRef = kanvasRef.nativeElement;

    const ctx = canvasRef.getContext('2d');
    canvasRef.width = this.width;
    canvasRef.height = this.height;

    if (!ctx) {
      throw new Error('Could not get canvas 2D context');
    }

    ctx.drawImage(
      imgToResize as HTMLImageElement,
      0,
      0,
      this.width,
      this.height,
    );

    const jpegFile = canvasRef.toDataURL(file.type);
    console.log(jpegFile);
    return jpegFile;
  }

  protected imageUp(
    imageString: string,
    headerImageString: OutputEmitterRef<string>,
  ) {
    headerImageString.emit(imageString);
  }

  public handleFileInput(
    event: Event,
    kanvasRef: ElementRef<HTMLCanvasElement> | undefined,
    headerImageString: OutputEmitterRef<string>,
  ) {
    if (!kanvasRef) {
      throw new Error('Could not get thiscanvasref');
    }
    const canvasRef = kanvasRef;
    const string = headerImageString;

    const emitStringUp = this.imageUp.bind(this);
    const resize = this.resize.bind(this);

    const htmlInputEvent = event as HTMLInputEvent;
    const fileList: FileList | null = htmlInputEvent?.target?.files;

    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          const theBlob = reader.result;

          const theImage = new Image();
          theImage.onload = function () {
            const theImageResized = resize(theImage, file, canvasRef);
            emitStringUp(theImageResized, string);
          };
          theImage.setAttribute('src', theBlob as string);
          theImage.onchange = function () {
            const theImageResized = resize(theImage, file, canvasRef);
          };
        },
        false,
      );
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
}
