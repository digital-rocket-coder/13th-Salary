export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum AppState {
  COUNTDOWN = 'COUNTDOWN',
  CELEBRATION = 'CELEBRATION'
}