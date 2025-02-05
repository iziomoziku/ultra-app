export interface Schedule {
  id: string;
  complete: boolean;
  routine: Routine;
  order: number;
  exercises: Exercise[];
  note: string;
  completedExercises: string[];
}

export interface Plan {
  id: string;
  name: string;
  Routines: Routine[];
  type: "Plan";
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  type: "Routine";
  // log: RoutineLog[]
}

export interface Exercise {
  id: string;
  name: string;
  complete: boolean;
  type: "Exercise";
  set: number;
  // not needed, will need to remove
  rep: Rep[];
  log: ExerciseLog[];
}

export interface Rep {
  id: string;
  rep: string;
}

export interface ExerciseLog {
  id: string;
  set: string[];
  note: string;
  date: Date;
}

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  schedule: Schedule | undefined;
}

export interface mainContextType {
  schedule: Schedule[];
  setSchedule: React.Dispatch<React.SetStateAction<Schedule[]>>;
  Routine: Routine[];
  setRoutine: React.Dispatch<React.SetStateAction<Routine[]>>;
  Plans: Plan[];
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
  Exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  LogExercise: (log: ExerciseLog, id: string, scheduleID: string) => void;
  // updatedSchedule: (routine: Routine) => void
  // updateScheduledRoutine: (routineID: string, exercise: Exercise) => void
  addExerciseToRoutine: (routineID: string, exerciseID: string) => void;
  addExerciseToSchedule: (scheduleID: string, exerciseID: string) => void;
  createSchedule: (scheduleID: string) => void;
  deleteSchedule: (scheduleID: string) => void;
  addExerciseSet: (itemID: string, exerciseID: string) => void;
  deleteExerciseSet: (exerciseID: string, setID: string) => void;
  markScheduleComplete: (scheduleID: string) => void;
  // addRoutineToSchedule: (routine: Routine) => void
  removeRoutineFromSchedule: (itemID: string) => void;
  markExerciseAsComplete: (
    itemID: string,
    exerciseID: string,
    log: ExerciseLog
  ) => void;
  completeRoutine: (item: Schedule) => void;
  updateScheduleOrder: (updatedSchedules: Schedule[]) => void;
  getExercise: (id: string) => Promise<Exercise | null>;
  UpcomingSessionModal: boolean;
  setUpcomingSessionModal: React.Dispatch<React.SetStateAction<boolean>>;
  Events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  calendarEventModal: boolean;
  setCalendarEventModal: React.Dispatch<React.SetStateAction<boolean>>;
}
