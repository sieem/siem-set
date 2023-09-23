import Dexie from 'dexie';

export interface ScoresTables {
  id: number;
  score: number;
  time: number;
  date: number;
  unusedCards: number;
}

export const database = new Dexie('SiemSetDB');
database.version(1).stores({
  scores: '++id,score,time,date,unusedCards',
});
