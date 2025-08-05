import { Injectable, Injector, runInInjectionContext, inject } from '@angular/core';
import {
  DocumentReference, deleteField,
  doc, Firestore, collection, query,
  QueryConstraint, DocumentData, Timestamp, setDoc, startAfter,
  updateDoc, deleteDoc, getCountFromServer,
  collectionData, docData, getDoc, getDocs, collectionGroup, WhereFilterOp,
  collectionSnapshots, where, docSnapshots, QueryOrderByConstraint, OrderByDirection, orderBy, FieldPath,
  QueryLimitConstraint, limit, QueryCompositeFilterConstraint, arrayUnion, arrayRemove, increment,
  QueryNonFilterConstraint
} from '@angular/fire/firestore';

import { Observable, catchError, combineLatest, debounceTime, firstValueFrom, map, of } from 'rxjs';

interface DocMetaStatus {
  Live:'live',
  Delete:'delete'  
}

export type FilterInput = [string, WhereFilterOp, (string | string[] | boolean | number | Date | DocumentReference | null)];

export interface DocMeta {
  id: string;
  path: string;
  cancelTrigger: boolean;
  status: DocMetaStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DocLike {
  _meta: DocMeta;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {
  private db = inject(Firestore);
  private injector = inject(Injector);


  get timestamp() {
    return Timestamp.now();

  }

  // get getWriteBatch() {
  //   return writeBatch(this.db);
  // }

  increment(n: number) {
    return increment(n)
  }

  createId(): string {
    return doc(collection(this.db, 'tmp')).id;
  }

  // enableNetwork() {
  //   return enableNetwork(this.db);
  // }

  // disableNetwork() {
  //   return disableNetwork(this.db);
  // }

  deleteField() {
    return deleteField();
  }

  arrayUnion(elements: any[]) {
    return arrayUnion(...elements);
  }

  arrayRemove(elements: any[]) {
    return arrayRemove(...elements);
  }

  newDocId(collectionPath: string): string {
    return doc(collection(this.db, collectionPath)).id;

  }

  getDocRef(documentPath: string): DocumentReference<DocumentData> {
    return runInInjectionContext(this.injector, () => doc(this.db, documentPath))

  }
  async getDocData(documentPath: string): Promise<DocumentData | undefined> {
    return runInInjectionContext(this.injector, async () => {
      const docRef = doc(this.db, documentPath);
      const snap = await getDoc(docRef);
      return snap.data()
    });
  }

  doc$(documentPath: string): Observable<DocumentData | undefined> {
    const docRef = runInInjectionContext(this.injector, () => doc(this.db, documentPath))
    return runInInjectionContext(this.injector, () => docData(docRef));
  }

  async getCol(collectionPath: string): Promise<DocumentData[] | []> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = query(colRef);
    const querySnapshot = await runInInjectionContext(this.injector, () => getDocs(queryDocData));
    return querySnapshot.docs.map(doc => doc.data());

  }

  async getColWithRef(collectionPath: string): Promise<any[] | []> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = query(colRef);
    const querySnapshot = await getDocs(queryDocData);
    return querySnapshot.docs.map(doc => ({ ref: doc.ref, ...doc.data() }));

  }

  async getColGroupWithRef(collectionName: string): Promise<DocumentData[] | []> {
    const colGrpRef = collectionGroup(this.db, collectionName)
    const queryDocData = query(colGrpRef);
    const querySnapshot = await getDocs(queryDocData);
    return querySnapshot.docs.map(doc => ({ ref: doc.ref, ...doc.data() }));
  }

  async getColGroup(collectionName: string): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colGrpRef = collectionGroup(this.db, collectionName)
      const queryDocData = query(colGrpRef);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getColOnQuery(collectionPath: string, queryConstraints: QueryConstraint[]): Promise<DocumentData[]> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath);
      const queryDocData = query(colRef, ...queryConstraints);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getFirstDoc(collectionPath: string, queryContraints: QueryConstraint[]): Promise<DocumentData | undefined> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = query(colRef, ...queryContraints);
    const querySnapshot = await getDocs(queryDocData);
    const docs = querySnapshot.docs.map(doc => doc.data());
    return docs.shift();
  }


  async getColOnQueryWithAndOr(collectionPath: string,
    queryContraints: QueryCompositeFilterConstraint, limit?: QueryLimitConstraint): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath)
      const queryDocData = limit ? query(colRef, queryContraints, limit) : query(colRef, queryContraints);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getColOnQueryWithAndOrOrderBy(collectionPath: string,
    queryContraints: QueryCompositeFilterConstraint, orderBy?: QueryOrderByConstraint): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath)
      const queryDocData = orderBy ? query(colRef, queryContraints, orderBy) : query(colRef, queryContraints);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getColGroupOnQuery(collectionName: string, queryContraints: QueryConstraint[]): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colGrpRef = collectionGroup(this.db, collectionName)
      const queryDocData = query(colGrpRef, ...queryContraints);
      const querySnapshot = await runInInjectionContext(this.injector, () => getDocs(queryDocData));
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getColGroupOnQueryWithAndOr(collectionName: string,
    queryContraints: QueryCompositeFilterConstraint, limit?: QueryLimitConstraint): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colGrpRef = collectionGroup(this.db, collectionName)
      const queryDocData = limit ? query(colGrpRef, queryContraints, limit) : query(colGrpRef, queryContraints);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  async getColGroupOnQueryWithAndOrOrderBy(collectionName: string,
    queryContraints: QueryCompositeFilterConstraint, orderBy?: QueryOrderByConstraint): Promise<DocumentData[] | []> {
    return runInInjectionContext(this.injector, async () => {
      const colGrpRef = collectionGroup(this.db, collectionName)
      const queryDocData = orderBy ? query(colGrpRef, queryContraints, orderBy) : query(colGrpRef, queryContraints);
      const querySnapshot = await getDocs(queryDocData);
      return querySnapshot.docs.map(doc => doc.data());
    });
  }  

  async getColOnQueryWithCompositeAndNonFilter(collectionPath: string, queryCompositeFilterConstraint: QueryCompositeFilterConstraint,
    queryNonFilterConstraint: QueryNonFilterConstraint[]): Promise<DocumentData[]> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath)
      const queryDocData = query(colRef, queryCompositeFilterConstraint, ...queryNonFilterConstraint);
      const querySnapshot = await runInInjectionContext(this.injector, () => getDocs(queryDocData));
      return querySnapshot.docs.map(doc => doc.data());
    });
  }

  col$(collectionPath: string): Observable<DocumentData[]> {
    const colRef = collection(this.db, collectionPath)
    return runInInjectionContext(this.injector, () => collectionData(colRef).pipe(debounceTime(500)));
  }

  colOnQuery$(collectionPath: string, queryConstraints: QueryConstraint[]): Observable<DocumentData[]> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = runInInjectionContext(this.injector, () => query(colRef, ...queryConstraints));
    return runInInjectionContext(this.injector, () => collectionData(queryDocData).pipe(debounceTime(500)));
  }

  colGroupOnQuery$(collectionName: string, queryConstraints: QueryConstraint[]): Observable<DocumentData[]> {
    const colGrpRef = collectionGroup(this.db, collectionName)
    const queryDocData = query(colGrpRef, ...queryConstraints);
    return collectionData(queryDocData).pipe(debounceTime(500));
  }

  colOnQueryWithAndOr$(collectionPath: string, queryConstraints:
    QueryCompositeFilterConstraint, limit?: QueryLimitConstraint): Observable<DocumentData[]> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = limit ? query(colRef, queryConstraints, limit) : query(colRef, queryConstraints);
    return collectionData(queryDocData).pipe(debounceTime(500));
  }

  colOnQueryWithAndOrWithOrderBy$(collectionPath: string, queryConstraints:
    QueryCompositeFilterConstraint, orderBy?: QueryOrderByConstraint): Observable<DocumentData[]> {
    const colRef = collection(this.db, collectionPath);
    const queryDocData = orderBy ? query(colRef, queryConstraints, orderBy) : query(colRef, queryConstraints);
    return collectionData(queryDocData).pipe(debounceTime(500));
  }

  colOnQueryWithCompositeAndNonFilter$(collectionPath: string, queryCompositeFilterConstraint: QueryCompositeFilterConstraint,
    queryNonFilterConstraint: QueryNonFilterConstraint[]): Observable<DocumentData[]> {
    const colRef = collection(this.db, collectionPath)
    const queryDocData = query(colRef, queryCompositeFilterConstraint, ...queryNonFilterConstraint);
    return collectionData(queryDocData);
  }

  doc(path: string) {
    return doc(this.db, path);
  }

  collection(path: string) {
    return collection(this.db, path);
  }

  document$<T>(path: string): Observable<T | null> {
    return runInInjectionContext(this.injector, () =>
      docSnapshots(this.doc(path)).pipe(
        map((st: any) => {
          if (st.exists() === false) {
            return null;
          }
          const data = st.data() || {};
          return { ...data, _meta: data._meta || this.getDocMeta(st.ref.path) } as unknown as T;
        }),
        catchError(e => {
          console.error(path, e);
          return of(null);
        })
      )
    );
  }

  collection$<T>(path: string, q: FilterInput[] = [], o?: [c: string | FieldPath, d: OrderByDirection], s?: number): Observable<T[]> {
    return runInInjectionContext(this.injector, () => {
      const queryConstraints: QueryConstraint[] = q.map(
        (el) => where(el[0], el[1], el[2])
      );
      if (o) {
        queryConstraints.push(orderBy(...o));
      }
      if (s) {
        queryConstraints.push(limit(s));
      }
      const colRef = collection(this.db, path)
      const qr = query(colRef, ...queryConstraints);
      // return collectionData(qr).pipe(debounceTime(500)) as Observable<T[]>;
      return collectionSnapshots(qr).pipe(
        map(st => st.map((el: any) => {
          const data = el.data() || {};
          return { ...data, _meta: data._meta || this.getDocMeta(el.ref.path) } as unknown as T;
        })),
        debounceTime(500),
      )
    });
  }

  collectionGroup$<T>(path: string, q: FilterInput[] = [], o?: [c: string | FieldPath, d: OrderByDirection], s?: number): Observable<T[]> {
    const queryConstraints: QueryConstraint[] = q.map(
      (el) => where(el[0], el[1], el[2])
    );
    if (o) {
      queryConstraints.push(orderBy(...o));
    }
    if (s) {
      queryConstraints.push(limit(s));
    }
    const queryDocs = collectionGroup(this.db, path)
    const qr = query(queryDocs, ...queryConstraints);

    return collectionSnapshots(qr).pipe(
      map(st => st.map((el: any) => {
        const data = el.data() || {};
        return { ...data, _meta: data._meta || this.getDocMeta(el.ref.path) } as unknown as T;
      })),
      debounceTime(500),
    )
  }

  async count(collectionPath: string,): Promise<number> {
    const colRef = collection(this.db, collectionPath);
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count;
  }

  async countOnQuery(collectionPath: string, queryConstraints: QueryConstraint[]): Promise<number> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath);
      const queryRef = query(colRef, ...queryConstraints);
      const snapshot = await getCountFromServer(queryRef);
      return snapshot.data().count;
    });
  }

  async countOnQueryWithAndOr(collectionPath: string, queryContraints:
    QueryCompositeFilterConstraint, limit?: QueryLimitConstraint): Promise<number> {
    return runInInjectionContext(this.injector, async () => {
      const colRef = collection(this.db, collectionPath);
      const queryRef = limit ? query(colRef, queryContraints, limit) : query(colRef, queryContraints);
      // const queryRef = query(colRef, ...queryConstraints);
      const snapshot = await getCountFromServer(queryRef);
      return snapshot.data().count;
    });
  }

  timestampFromDate(startDate: Date) {
    return Timestamp.fromDate(startDate);
  }

  timestampFromMillis(milliseconds: number) {
    return Timestamp.fromMillis(milliseconds);
  }



    async add(collectionPath: string, data: any, log: any = {}): Promise<DocumentReference> {
      const docRef = doc(collection(this.db, collectionPath));
      const _meta = this.getDocMeta(docRef.path);
      await setDoc(docRef, {
        _meta,
        ...data,
      })
      return docRef;
    }

    async set(documentPath: string, data: any, log: any = {}): Promise<DocumentReference> {
      const docRef = doc(this.db, documentPath)
      const _meta = this.getDocMeta(docRef.path);
      await setDoc(docRef, {
        _meta,
        ...data,
      })
      return docRef;
    }

    async setWithMerge(documentPath: string, data: any, log: any = {}): Promise<DocumentReference> {
      const docRef = runInInjectionContext(this.injector, () => doc(this.db, documentPath))
      const _meta = this.getDocMeta(docRef.path);
      await runInInjectionContext(this.injector, () => setDoc(docRef, {
        _meta,
        ...data,
      }, { merge: true }))
      return docRef;
    }

    async update(documentPath: string, data: any, log: any = {}): Promise<DocumentReference> {
      const docRef = doc(this.db, documentPath);
      await updateDoc(docRef, {
        ...data,
        '_meta.updatedAt': Timestamp.now(),
      })
      return docRef;
    }

    async delete(documentPath: string, log: any = {}): Promise<DocumentReference> {
      const docRef = doc(this.db, documentPath)
      await deleteDoc(docRef)
      return docRef;
    }



  getDocMeta(documentPath: string) {
    const timestamp = Timestamp.now();
    let docRef: DocumentReference | null = runInInjectionContext(this.injector, () => doc(this.db, documentPath));
    const meta: any = {
      id: docRef.id,
      path: docRef.path,
      cancelTrigger: false,
      // status: DocMetaStatus.Live,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    let count = 1;
    while (docRef && docRef.parent !== null) {
      if (docRef.parent.parent) {
        meta[`parent${count}`] = docRef.parent.parent.id;
        count++;
        docRef = docRef.parent.parent;
      } else {
        docRef = null;
      }
    }
    return meta;
  }


  async getItemsInBatch(collectionPath: string, batchSize: number, lastItem?: any): Promise<any[]> {
    // console.log('lastItem',lastItem)
    let q = query(collection(this.db, collectionPath), orderBy('_meta.createdAt', 'desc'), limit(batchSize));

    if (lastItem) {
      q = query(q, startAfter(await getDoc(lastItem)));
    }

    const querySnapshot = await getDocs(q);
    const items: any[] = [];
    querySnapshot.forEach(doc => {
      items.push(doc.data());
    });
    return items;
  }

}