import Dexie from 'dexie';

export const database = new Dexie('SiemSetDB');
database.version(1).stores({
    scores: '++id,score,time,date'
});