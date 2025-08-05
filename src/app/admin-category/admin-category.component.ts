import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/angular/standalone';
import { FirebaseFirestoreService } from '../services/firebase-firestore.service';
import { LoadingService } from '../services/loadingservice';
import { CloudinaryService } from '../services/cloudinary.service';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonList,
    CommonModule,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule
  ],
})
export class AdminCategoryComponent {
  categoryName = '';
  categoryType = '';
  categorySubName = '';
  categorySubType = '';
  productName = '';
  productImageUrl = '';
  productWeight = '';
  productOriginalPrice = '';
  productOfferPrice = '';

  categoryTypes: string[] = [];
  categorySubTypes: string[] = [];


//   categoryForm = new FormGroup({
//      categoryName: new FormControl('', Validators.required),
//      categoryType: new FormControl('', Validators.required),
//      productName: new FormControl('', Validators.required),
//      ProductImageUrl: new FormControl('', Validators.required),
//      productWeight: new FormControl('', Validators.required),
//      productOriginalPrice: new FormControl('', Validators.required),
//      productOfferPrice: new FormControl('', Validators.required),
// })

  constructor(
    private firestoreService: FirebaseFirestoreService,
    private loadingService: LoadingService,
    private cloudinaryService: CloudinaryService

  ) {
    // this.loadCategorySubTypes();
    this.loadCategoryTypes();
    console.log(this.categoryType);
  }

  async handleChange(event: CustomEvent) {
    console.log('ionChange fired with value: ' + event.detail.value);
    this.categoryType = event.detail.value;
    const subCollections = await this.firestoreService.getCol(
      `Category/${this.categoryType}`
    );
    console.log(subCollections);
    this.categorySubTypes = subCollections.map((col: any) => col._meta.id);
  }

  async loadCategoryTypes() {
    const collections = await this.firestoreService.getCol('Category');
    this.categoryTypes = collections.map((col: any) => col._meta.id);
  }

  async loadCategorySubTypes() {
    // const collections = await this.firestoreService.getCol(`Category/${this.categoryType}`);
    // this.categorySubTypes = collections.map((col: any) => col._meta.id);
  }

  // async saveCategory() {
  //   if (!this.categoryName || !this.categoryType) {
  //     console.warn('Category name and type are required');
  //     return;
  //   }

  //   const subColRef = await this.firestoreService.getDocData(`Category/${this.categoryType}`);
  //   const secSubColRef = await this.firestoreService.getColOnQuery(`Category/${this.categoryType}`);
  //   // await addDoc(secSubColRef, {
  //   //   name: this.categoryName,
  //   //   type: this.categoryType
  //   // });

  //   console.log(' Category saved:', this.categoryName);
  //   this.categoryName = '';
  // }
  
  async addCategoryCollection() {
    if (!this.categoryName) {
      console.warn('Category name is required');
      return;
    }

    try {
      await this.firestoreService.add(
        `Category/${this.categoryType}/${this.categoryName}`,
        {
          productName: this.productName,
          productImageUrl: this.productImageUrl,
          productWeight: this.productWeight,
          productOriginalPrice: this.productOriginalPrice,
          productOfferPrice: this.productOfferPrice,
        }
      );

      console.log(` '${this.categoryName}' category created successfully`);

      //  Reset all fields
      this.categoryName = '';
      this.productName = '';
      this.productImageUrl = '';
      this.productWeight = '';
      this.productOriginalPrice = '';
      this.productOfferPrice = '';
      this.categoryType = '';
    } catch (error) {
      console.error('Error creating category collection:', error);
    }
  }

  // async updateCategoryCollection() {
  //   if (!this.categoryName) {
  //     console.warn('Category name is required');
  //     return;
  //   }

  //   try {
  //     // Add a dummy doc to create a new subcollection under 'Category'
  //     await this.firestoreService.update(
  //       `Category/${this.categoryType}/${this.categoryName}`,
  //       {
  //         name: '3rose',
  //       }
  //     );

  //     console.log(
  //       ` '${this.categoryName}' category collection created successfully`
  //     );
  //     this.categoryName = '';
  //     this.loadCategoryTypes(); // Refresh the list
  //   } catch (error) {
  //     console.error('Error creating category collection:', error);
  //   }
  // }

  // async onImageUpload(event: any) {
  //   this.loadingService.show();
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       await this.cloudinaryService.uploadImage$(file).subscribe((response: any) => {
  //         const publicId = response?.response?.public_id;
  //         if (publicId) {
  //           const csPath = 'cs:' + publicId;
  //           console.log('cspath',csPath)
  //           this.categoryForm.patchValue({ ProductImageUrl: csPath });
  //           this.firestoreService.update(`Category/${this.categoryType}/${this.categoryName}/${this.productImageUrl}`, {
  //             images: csPath
  //           })
  //         }
  //       });
  //     }
  //     this.loadingService.hide()
  //   }
  // }
}
