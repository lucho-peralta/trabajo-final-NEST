import * as fs from 'fs';
import * as path from 'path';

export class dbService {
  private static dbPath = path.join('src/db/db.json');

  static leerDB() {
    const data = fs.readFileSync(this.dbPath, 'utf-8');
    return JSON.parse(data);
  }

  static guardarDB(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }
}