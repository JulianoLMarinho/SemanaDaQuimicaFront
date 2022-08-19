import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  db!: IDBPDatabase<unknown>;
  constructor() {}

  async initDatabase() {
    this.db = await openDB('semana_quimica_db', 1, {
      upgrade(db) {
        console.log(db.objectStoreNames);
        db.createObjectStore('keyval');
      },
    });
  }

  async setValue(key: string, value: any) {
    if (!this.db) {
      await this.initDatabase();
    }
    await this.db.put('keyval', value, key);
  }

  async getValue<T>(key: string) {
    if (!this.db) {
      await this.initDatabase();
    }
    return await this.db.get('keyval', key);
  }
}
