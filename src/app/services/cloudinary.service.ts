import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cloudinary } from '@cloudinary/url-gen';
import { EffectActions } from '@cloudinary/url-gen/actions/effect';
import { auto, fill, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { catchError, filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AspectRatioType } from '@cloudinary/url-gen/types/types';
import { dpr } from '@cloudinary/url-gen/actions/delivery';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private http = inject(HttpClient);

  cloudinaryInstance: Cloudinary;

  constructor() {
    this.cloudinaryInstance = new Cloudinary({
      cloud: {
        cloudName: environment.cloudinary.cloudName
      }
    })
  }

  async getImage(publicId: string, width?: number, height?: number, transformation?: string) {
    const cld = this.cloudinaryInstance.image(publicId)
    if (transformation) {
      cld.addTransformation(transformation + ',dpr_auto')
    } else {
      cld.resize(
        auto()
          .width(width || 'auto')
          .height(height || 'auto')
          .gravity('auto')
      ).delivery(dpr('auto'))
    }
    return cld.toURL()
  }


  async editImage(publicId: string, cropOption?: AspectRatioType, rotateOption?: any, effect?: EffectActions) {
    const cld = this.cloudinaryInstance.image(publicId);
    if (rotateOption) {
      cld.rotate(rotateOption)
    } else if (effect) {
      cld.effect(effect)
    } else if (cropOption) {
      cld.resize(fill().aspectRatio(cropOption))
    }
    return cld.toURL();
  }

  async getThumbnail(publicId: string, width?: number, height?: number, transformation?: string) {
    const cld = this.cloudinaryInstance.image(publicId)
    if (transformation) {
      cld.addTransformation(transformation + ',dpr_auto')
    } else {
      cld.resize(thumbnail().gravity('auto').width(width || 'auto').height(height || 'auto')).delivery(dpr('auto'))
    }
    return cld.toURL()
  }

  async getVideo(publicId: string, width?: number, height?: number, transformation?: string) {
    const cld = this.cloudinaryInstance.video(publicId)
    if (transformation) {
      cld.addTransformation(transformation + ',dpr_auto')
    } else {
      cld.resize(fill().width(width || 'auto').height(height || 'auto')).delivery(dpr('auto'))
    }
    console.log('Video URL:', cld.toURL())
    return cld.toURL()
  }

  async getVideoThumb(publicId: string, width?: number, height?: number, transformation?: string) {
    const cld = this.cloudinaryInstance.video(publicId + '.jpg')
    if (transformation) {
      cld.addTransformation(transformation + ',dpr_auto')
    } else {
      cld.resize(fill().width(width || 'auto').height(height || 'auto')).delivery(dpr('auto'))
    }
    return cld.toURL()
  }

  uploadImage$(localFile: any, tags: string[] = []): Observable<any> {
    const formData = new FormData();
    formData.append('file', localFile);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    formData.append('folder', `${environment.cloudinary.folder}/images`);
    if (tags.length) {
      formData.append('tags', tags.join(','));  // Tags should be a comma-separated string
    }

    return this.http.post(environment.cloudinary.uploadEndpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => this.getEventMessage(event)),
      catchError(error => {
        console.error('Upload failed:', error);
        throw error;
      })
    );
  }

  uploadImageFromUrl$(imageUrl: string, tags: string[] = []): Observable<any> {
    const formData = new FormData();
    formData.append('file', imageUrl); // Pass the image URL here
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    formData.append('folder', `${environment.cloudinary.folder}/images`);
    if (tags.length) {
      formData.append('tags', tags?.join(',')); // Tags should be a comma-separated string
    }
  
    return this.http.post(environment.cloudinary.uploadEndpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => this.getEventMessage(event)),
      catchError(error => {
        console.error('Upload failed:', error);
        throw error;
      })
    );
  }
  

  uploadVideo$(localFile: any, tags: string[] = []): Observable<any> {
    const formData = new FormData();
    formData.append('file', localFile);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    formData.append('folder', `${environment.cloudinary.folder}/videos`);
    if (tags.length) {
      formData.append('tags', tags.join(','));  // Tags should be a comma-separated string
    }

    return this.http.post(environment.cloudinary.uploadEndpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => this.getEventMessage(event)),
      catchError(error => {
        console.error('Upload failed:', error);
        throw error;
      })
    );
  }

  uploadMedia$(localFile: any, mediaType: string, tags: string[] = []): Observable<any> {
    let folderName
    if (mediaType.includes('video')) {
      folderName = 'videos'
    } else if (mediaType.includes('image')) {
      folderName = 'images'
    } else if (mediaType.includes('audio')) {
      folderName = 'audios'
    } else {
      folderName = 'documents'
    }
    const formData = new FormData();
    formData.append('file', localFile);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);
    formData.append('folder', `${environment.cloudinary.folder}/${folderName}`);
    if (tags.length) {
      formData.append('tags', tags.join(','));  // Tags should be a comma-separated string
    }

    return this.http.post(environment.cloudinary.uploadEndpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => this.getEventMessage(event)),
      catchError(error => {
        console.error('Upload failed:', error);
        throw error;
      })
    );
  }

  private getEventMessage(event: HttpEvent<any>): any {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          return { progress: Math.round(100 * event.loaded / event.total) };
        }
        return { progress: 0 };
      case HttpEventType.Response:
        return { progress: 100, response: event.body };
      default:
        return { progress: 0 };
    }
  }

  async getOriginalImage(publicId: string, width?: number, height?: number, transformation?: string) {
    const cld = this.cloudinaryInstance.image(publicId)
    if (transformation) {
      cld.addTransformation(transformation + ',dpr_auto')
    } else {
      if (width && height) {
        cld.resize(
          auto()
            .width(width)
            .height(height)
            .gravity('auto')
        )
      } else if (width) {
        cld.resize(
          auto()
            .width(width)
            .gravity('auto')
        )
      } else if (height) {
        cld.resize(
          auto()
            .width(height)
            .gravity('auto')
        )
      }
    }
    return cld.toURL()
  }

}
