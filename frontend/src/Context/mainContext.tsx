import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Exercise,
  ExerciseLog,
  mainContextType,
  Routine,
  Schedule,
  Event,
  Plan,
} from "../Interface";
// import { currentExercises, currentPlans, MyEvents } from "../data";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import { useAuth } from "./AuthContext";
// import { checkDomainOfScale } from "recharts/types/util/ChartUtils";

const mainContext = createContext<mainContextType | undefined>(undefined);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  // const { token } = useAuth()

  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedules = await getAllSchedules(); // Fetch the schedules
      const routines = await getAllRoutines();
      const exercise = await getAllExercises();

      // console.log("schedules to be saved in state", schedules);
      setSchedule(schedules); // Update the state with the fetched data

      // console.log("routines to be saved in state", routines);
      setRoutine(routines);

      // console.log("exercise to be saved in state", exercise);
      setExercises(exercise);
    };

    fetchSchedules(); // Call the async function
  }, []);

  // your upcoming schedules
  const [, setCompletedRoutine] = useState<Schedule[]>([]);
  const [Exercises, setExercises] = useState<Exercise[]>([]);
  const [Routine, setRoutine] = useState<Routine[]>([]);
  const [Plans, setPlans] = useState<Plan[]>([]);
  const [UpcomingSessionModal, setUpcomingSessionModal] = useState(false);
  const [calendarEventModal, setCalendarEventModal] = useState(false);
  const [Events, setEvents] = useState<Event[]>([]);

  /**
   * Get all schedules
   * @returns
   */
  const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
      const response = await axios.get<Schedule[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/schedule`
      );
      const data = response.data;

      console.log(data);

      // Transform data to fit the frontend structure
      const transformedSchedules: Schedule[] = data.map((item: any) => ({
        id: item.id,
        complete: item.complete,
        routine: item.routine,
        order: item.order,
        exercises: item.exercises,
        note: item.note,
        completedExercises: item.completedExercises,
      }));

      return transformedSchedules;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return [];
    }
  };

  /**
   * Reorder schedules
   * @param updatedSchedules
   */
  const updateScheduleOrder = async (updatedSchedules: Schedule[]) => {
    try {
      const response = await axios.post<Schedule[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/schedule/reorder`,
        updatedSchedules
      );
      const data = response.data;

      const updatedSchedule: Schedule[] = data.map((item: any) => ({
        id: item.id,
        complete: item.complete,
        routine: item.routine,
        order: item.order,
        exercises: item.exercises,
        note: item.note,
        completedExercises: item.completedExercises,
      }));

      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Failed to update schedule order:", error);
    }
  };

  /**
   * Create a new schedule
   * @param routineID
   */
  const createSchedule = async (routineID: string) => {
    try {
      const newSchedule = {
        id: uuidv4(),
        complete: false,
        order: schedule.length + 1,
      };

      const response = await axios.post<Schedule[]>(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/schedule?routineID=${routineID}`,
        newSchedule
      );
      const data = response.data;

      const updatedSchedule: Schedule[] = data
        .filter(
          (item: any) =>
            item.exercises &&
            Array.isArray(item.exercises) &&
            item.exercises.length > 0
        )
        .map((item: any) => ({
          id: item.id,
          complete: item.complete,
          routine: item.routine,
          order: item.order,
          exercises: item.exercises, // Ensure this is the correct property
          note: item.note,
          completedExercises: item.completedExercises,
        }));

      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Failed to update schedule order:", error);
    }
  };

  /**
   * Delete a schedule
   * @param scheduleID
   */
  const deleteSchedule = async (scheduleID: string) => {
    try {
      const response = await axios.get<Schedule[]>(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/schedule/delete?id=${scheduleID}`
      );

      const data = response.data;

      const updatedSchedule: Schedule[] = data
        .filter(
          (item: any) =>
            item.exercises &&
            Array.isArray(item.exercises) &&
            item.exercises.length > 0
        )
        .map((item: any) => ({
          id: item.id,
          complete: item.complete,
          routine: item.routine,
          order: item.order,
          exercises: item.exercises, // Ensure this is the correct property
          note: item.note,
          completedExercises: item.completedExercises,
        }));

      setSchedule(updatedSchedule);
    } catch (error) {
      console.log(error);
    }
  };

  const markScheduleComplete = async (scheduleID: string) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/schedule/complete/${scheduleID}`
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Get all routines
   * @returns
   */
  const getAllRoutines = async (): Promise<Routine[]> => {
    try {
      const response = await axios.get<Routine[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/routine`
      );
      const data = response.data;

      // Transform data to fit the frontend structure
      const transformedSchedules: Routine[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        exercises: item.exercises,
        type: "Routine",
      }));

      return transformedSchedules;
    } catch (error) {
      console.error("Error fetching routines:", error);
      return [];
    }
  };

  /**
   * Get all routines
   * @returns
   */
  const getAllExercises = async (): Promise<Exercise[]> => {
    try {
      const response = await axios.get<Exercise[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/exercise`
      );
      const data = response.data;

      // console.log("all exercises:", data);

      // Transform data to fit the frontend structure
      const transformedSchedules: Exercise[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        complete: item.complete,
        type: "Exercise",
        set: item.set,
        rep: [],
        log: item.log,
      }));

      // console.log("exercises:", data);

      return transformedSchedules;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return [];
    }
  };

  /**
   * add exercise to routine
   * @param routineID id of the routine
   * @param exerciseID id of the exercise
   */
  const addExerciseToRoutine = async (
    routineID: string,
    exerciseID: string
  ) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/routine/${routineID}/add-exercise`,
        {
          exerciseID: exerciseID,
        }
      );
      const response = await getAllSchedules();

      setSchedule(response);
    } catch (error) {
      console.error("Failed to add exercise to routine:", error);
    }
  };

  /**
   * add exercise to routine
   * @param scheduleID id of the routine
   * @param exerciseID id of the exercise
   */
  const addExerciseToSchedule = async (
    scheduleID: string,
    exerciseID: string
  ) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/schedule/${scheduleID}/update-exercise`,
        {
          exerciseID: exerciseID,
        }
      );
      const response = await getAllSchedules();

      setSchedule(response);
    } catch (error) {
      console.error("Failed to add exercise to schedule:", error);
    }
  };

  /**
   * Get Exercise by ID
   * @param id
   * @returns
   */
  const getExercise = async (id: string): Promise<Exercise | null> => {
    try {
      const response = await axios.get<Exercise>(
        `${import.meta.env.VITE_BACKEND_API_URL}/exercise/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching schedules:", error);
      return null;
    }
  };

  /**
   * Add a new log to the exercise
   * @param log
   * @param id
   * @param scheduleID
   */
  const LogExercise = async (
    log: ExerciseLog,
    id: string,
    scheduleID: string
  ) => {
    try {
      const response = await axios.post<Schedule[]>(
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }/exercise/log?id=${id}&scheduleId=${scheduleID}`,
        log
      );

      const data = response.data;

      const updatedSchedule: Schedule[] = data
        .filter(
          (item: any) =>
            item.exercises &&
            Array.isArray(item.exercises) &&
            item.exercises.length > 0
        )
        .map((item: any) => ({
          id: item.id,
          complete: item.complete,
          routine: item.routine,
          order: item.order,
          exercises: item.exercises, // Ensure this is the correct property
          note: item.note,
          completedExercises: item.completedExercises,
        }));

      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Failed to log exercise:", error);
    }
  };

  /**
   * Add or remove a routine from the schedule.
   * @param routine The routine to add or remove.
   */
  // const updatedSchedule = (routine: Routine) => {
  //     const exists = schedule.some(s => s.routine.id === routine.id);

  //     if (exists) {
  //         // If the routine is already in the schedule, remove it
  //         const updatedSchedule = schedule.filter(s => s.routine.id !== routine.id);
  //         setSchedule(updatedSchedule);
  //     } else {
  //         // If the routine is not in the schedule, add it
  //         const newScheduleItem = {
  //             id: uuidv4(), // Generate a unique ID for the schedule item
  //             complete: false, // Default to incomplete
  //             routine: routine, // Add the routine
  //             order: schedule.length + 1
  //         };
  //         setSchedule([...schedule, newScheduleItem]);
  //     }
  // };

  /**
   * Add a routine to the schedule list.
   * @param routine The routine to add.
   */
  // const addRoutineToSchedule = (routine: Routine) => {
  //     const newScheduleItem = {
  //         id: uuidv4(), // Generate a unique ID for the schedule item
  //         complete: false, // Default completion status
  //         routine: routine, // The routine to add
  //         order: schedule.length + 1
  //     };

  //     setSchedule([...schedule, newScheduleItem]); // Add the new item
  // };

  /**
   * Remove a routine from the schedule list.
   * @param itemID The ID of the schedule item to remove.
   */
  const removeRoutineFromSchedule = (itemID: string) => {
    const updatedSchedule = schedule.filter((item) => item.id !== itemID);

    setSchedule(updatedSchedule); // Update the schedule state
  };

  /**
   * Update the Routines in the upcoming schedule.
   * Toggle the provided exercise: add if it doesn't exist, remove if it does.
   *
   * @param itemID The ID of the schedule item to update.
   * @param exercise The exercise to add or remove.
   */
  // const updateScheduledRoutine = (itemID: string, exerciseID: string) => {
  //     const updatedSchedule = schedule.map(scheduleItem => {
  //         // Check if the routine ID matches
  //         if (scheduleItem.id === itemID) {
  //             const exists = scheduleItem.routine.exercises.some(e => e.id === exercise.id);

  //             // Toggle the exercise: add if it doesn't exist, remove if it does
  //             const updatedExercises = exists
  //                 ? scheduleItem.routine.exercises.filter(e => e.id !== exercise.id) // Remove the exercise
  //                 : [...scheduleItem.routine.exercises, exercise]; // Add the exercise

  //             // Return the updated schedule item with modified routine
  //             return {
  //                 ...scheduleItem,
  //                 routine: {
  //                     ...scheduleItem.routine,
  //                     exercises: updatedExercises
  //                 }
  //             };
  //         }
  //         return scheduleItem; // No changes for other schedule items
  //     });

  //     setSchedule(updatedSchedule); // Update the schedule state
  // };

  /**
   * Add a new set to the exercise in the schedule.
   * @param itemID The ID of the schedule item to update.
   * @param exerciseID The ID of the exercise to update.
   */
  const addExerciseSet = (itemID: string, exerciseID: string) => {
    const updatedSchedule = schedule.map((scheduleItem) => {
      // Only update the targeted schedule item
      if (scheduleItem.id === itemID) {
        const updatedRoutine = {
          ...scheduleItem.routine,
          exercises: scheduleItem.routine.exercises.map((exercise) => {
            if (exercise.id === exerciseID) {
              // Add a new set to the exercise's rep array
              const newSet = { id: uuidv4(), rep: "0x0" };
              return {
                ...exercise,
                rep: [...exercise.rep, newSet],
                set: ++exercise.set,
              };
            }
            return exercise; // No changes for other exercises
          }),
        };

        return {
          ...scheduleItem,
          routine: updatedRoutine,
        };
      }
      return scheduleItem; // No changes for other schedule items
    });

    setSchedule(updatedSchedule); // Update the state with the modified schedule
  };

  /**
   * Mark an exercise as complete within a schedule item.
   * @param itemID The ID of the schedule item to update.
   * @param exerciseID The ID of the exercise to mark as complete.
   */
  const markExerciseAsComplete = (
    itemID: string,
    exerciseID: string,
    log: ExerciseLog
  ) => {
    const updatedSchedule = schedule.map((scheduleItem) => {
      // Only update the targeted schedule item
      if (scheduleItem.id === itemID) {
        const updatedRoutine = {
          ...scheduleItem.routine,
          exercises: scheduleItem.routine.exercises.map((exercise) => {
            if (exercise.id === exerciseID) {
              // Mark the exercise as complete
              return {
                ...exercise,
                complete: true, // Set complete to true
              };
            }
            return exercise; // No changes for other exercises
          }),
        };

        return {
          ...scheduleItem,
          routine: updatedRoutine,
        };
      }
      return scheduleItem; // No changes for other schedule items
    });

    setSchedule(updatedSchedule); // Update the state with the modified schedule

    // add exercise to log
    const updatedExercises = Exercises.map((exercise) => {
      if (exercise.id === exerciseID) {
        // Mark the exercise as complete and add to its log
        return {
          ...exercise,
          log: [...exercise.log, log], // Add the new log entry
        };
      }
      return exercise; // No changes for other exercises
    });

    // Update the Exercises state with the modified data
    setExercises(updatedExercises);
  };

  /**
   * Delete a set from the exercise in the schedule.
   * @param exerciseID The ID of the exercise to update.
   * @param setID The ID of the set to delete.
   */
  const deleteExerciseSet = (exerciseID: string, setID: string) => {
    const updatedSchedule = schedule.map((scheduleItem) => {
      return {
        ...scheduleItem,
        routine: {
          ...scheduleItem.routine,
          exercises: scheduleItem.routine.exercises.map((exercise) => {
            if (exercise.id === exerciseID) {
              // Remove the set with the specified setID
              const updatedRep = exercise.rep.filter((set) => set.id !== setID);
              return {
                ...exercise,
                rep: updatedRep,
                set: --exercise.set,
              };
            }
            return exercise; // No changes for other exercises
          }),
        },
      };
    });

    setSchedule(updatedSchedule); // Update the schedule state
  };

  /**
   *
   */
  const completeRoutine = (item: Schedule) => {
    // Check if the schedule is not empty to avoid errors
    if (schedule.length === 0) return;

    // Extract the first item from the schedule
    const [firstItem, ...remainingSchedule] = schedule;

    // Update the state
    setSchedule(remainingSchedule); // Remove the first item from the schedule
    setCompletedRoutine((prev) => [...prev, firstItem]); // Add the first item to the completedRoutine

    const newEvent: Event = {
      id: uuidv4(),
      title: "View Session",
      start: new Date(2024, 11, 29),
      end: new Date(2024, 11, 29),
      schedule: item,
    };

    setEvents((prev) => [...prev, newEvent]);
  };

  return (
    <mainContext.Provider
      value={{
        schedule,
        setSchedule,
        Routine,
        setRoutine,
        // updatedSchedule,
        Exercises,
        setExercises,
        LogExercise,
        // updateScheduledRoutine,
        addExerciseToRoutine,
        addExerciseToSchedule,
        createSchedule,
        addExerciseSet,
        deleteExerciseSet,
        deleteSchedule,
        markScheduleComplete,
        // addRoutineToSchedule,
        removeRoutineFromSchedule,
        markExerciseAsComplete,
        UpcomingSessionModal,
        setUpcomingSessionModal,
        completeRoutine,
        Events,
        setEvents,
        calendarEventModal,
        setCalendarEventModal,
        Plans,
        setPlans,
        getExercise,
        updateScheduleOrder,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a mainContextProvider");
  }
  return context;
};

// (function() {
//     // Wait for the DOM to fully load
//     document.addEventListener('DOMContentLoaded', () => {
//         const checkForButton = () => {
//             // Replace BUTTON_SELECTOR with the actual selector of the "Skip Intro" button
//             const skipButton = document.querySelector('button.skip__button.body_copy');
//             if (skipButton) {
//                 skipButton.click();
//                 console.log('Intro skipped!');
//             }
//         };

//         // Observe changes in the DOM to handle dynamic loading of the button
//         const observer = new MutationObserver(() => {
//             checkForButton();
//         });

//         observer.observe(document.body, { childList: true, subtree: true });

//         console.log('Script initialized and watching for Skip Intro button.');
//     });
// })();
