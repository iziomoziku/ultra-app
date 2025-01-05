import { createContext, ReactNode, useContext, useState } from "react";
import { Exercise, ExerciseLog, mainContextType, Routine, Schedule, Event, Plan } from "../Interface";
import { currentExercises, currentPlans, currentRoutines, MyEvents, UpcommingSession } from "../data";
import { v4 as uuidv4 } from 'uuid';

const mainContext = createContext<mainContextType | undefined>(undefined)

export const MainProvider = ({ children }: { children: ReactNode }) => {

    // your upcoming schedules
    const [schedule, setSchedule] = useState<Schedule[]>(UpcommingSession)
    const [, setCompletedRoutine] = useState<Schedule[]>([])
    const [Exercises, setExercises] = useState<Exercise[]>(currentExercises)
    const [Routine, setRoutine] = useState<Routine[]>(currentRoutines)
    const [Plans, setPlans] = useState<Plan[]>(currentPlans)
    const [UpcomingSessionModal, setUpcomingSessionModal] = useState(false);
    const [calendarEventModal, setCalendarEventModal] = useState(false);
    const [Events, setEvents] = useState<Event[]>(MyEvents)

    /**
     * Add or remove a routine from the schedule.
     * @param routine The routine to add or remove.
     */
    const updatedSchedule = (routine: Routine) => {
        const exists = schedule.some(s => s.routine.id === routine.id);

        if (exists) {
            // If the routine is already in the schedule, remove it
            const updatedSchedule = schedule.filter(s => s.routine.id !== routine.id);
            setSchedule(updatedSchedule);
        } else {
            // If the routine is not in the schedule, add it
            const newScheduleItem = {
                id: uuidv4(), // Generate a unique ID for the schedule item
                complete: false, // Default to incomplete
                routine: routine // Add the routine
            };
            setSchedule([...schedule, newScheduleItem]);
        }
    };


    /**
     * Add a routine to the schedule list.
     * @param routine The routine to add.
     */
    const addRoutineToSchedule = (routine: Routine) => {
        const newScheduleItem = {
            id: uuidv4(), // Generate a unique ID for the schedule item
            complete: false, // Default completion status
            routine: routine // The routine to add
        };

        setSchedule([...schedule, newScheduleItem]); // Add the new item
    };

    /**
     * Remove a routine from the schedule list.
     * @param itemID The ID of the schedule item to remove.
     */
    const removeRoutineFromSchedule = (itemID: string) => {
        const updatedSchedule = schedule.filter(item => item.id !== itemID);

        setSchedule(updatedSchedule); // Update the schedule state
    };

    /**
     * Update the Routines in the upcoming schedule.
     * Toggle the provided exercise: add if it doesn't exist, remove if it does.
     *
     * @param itemID The ID of the schedule item to update.
     * @param exercise The exercise to add or remove.
     */
    const updateScheduledRoutine = (itemID: string, exercise: Exercise) => {
        const updatedSchedule = schedule.map(scheduleItem => {
            // Check if the routine ID matches
            if (scheduleItem.id === itemID) {
                const exists = scheduleItem.routine.exercises.some(e => e.id === exercise.id);

                // Toggle the exercise: add if it doesn't exist, remove if it does
                const updatedExercises = exists
                    ? scheduleItem.routine.exercises.filter(e => e.id !== exercise.id) // Remove the exercise
                    : [...scheduleItem.routine.exercises, exercise]; // Add the exercise

                // Return the updated schedule item with modified routine
                return {
                    ...scheduleItem,
                    routine: {
                        ...scheduleItem.routine,
                        exercises: updatedExercises
                    }
                };
            }
            return scheduleItem; // No changes for other schedule items
        });

        setSchedule(updatedSchedule); // Update the schedule state
    };

    /**
     * Add a new set to the exercise in the schedule.
     * @param itemID The ID of the schedule item to update.
     * @param exerciseID The ID of the exercise to update.
     */
    const addExerciseSet = (itemID: string, exerciseID: string) => {
        const updatedSchedule = schedule.map(scheduleItem => {
            // Only update the targeted schedule item
            if (scheduleItem.id === itemID) {
                const updatedRoutine = {
                    ...scheduleItem.routine,
                    exercises: scheduleItem.routine.exercises.map(exercise => {
                        if (exercise.id === exerciseID) {
                            // Add a new set to the exercise's rep array
                            const newSet = { id: uuidv4(), rep: '0x0' };
                            return {
                                ...exercise,
                                rep: [...exercise.rep, newSet],
                                set: ++exercise.set
                            };
                        }
                        return exercise; // No changes for other exercises
                    })
                };

                return {
                    ...scheduleItem,
                    routine: updatedRoutine
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
    const markExerciseAsComplete = (itemID: string, exerciseID: string, log: ExerciseLog) => {
        const updatedSchedule = schedule.map(scheduleItem => {
            // Only update the targeted schedule item
            if (scheduleItem.id === itemID) {
                const updatedRoutine = {
                    ...scheduleItem.routine,
                    exercises: scheduleItem.routine.exercises.map(exercise => {
                        if (exercise.id === exerciseID) {
                            // Mark the exercise as complete
                            return {
                                ...exercise,
                                complete: true // Set complete to true
                            };
                        }
                        return exercise; // No changes for other exercises
                    })
                };

                return {
                    ...scheduleItem,
                    routine: updatedRoutine
                };
            }
            return scheduleItem; // No changes for other schedule items
        });

        setSchedule(updatedSchedule); // Update the state with the modified schedule

        // add exercise to log
        const updatedExercises = Exercises.map(exercise => {
            if (exercise.id === exerciseID) {
                // Mark the exercise as complete and add to its log
                return {
                    ...exercise,
                    log: [...exercise.log, log] // Add the new log entry
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
        const updatedSchedule = schedule.map(scheduleItem => {
            return {
                ...scheduleItem,
                routine: {
                    ...scheduleItem.routine,
                    exercises: scheduleItem.routine.exercises.map(exercise => {
                        if (exercise.id === exerciseID) {
                            // Remove the set with the specified setID
                            const updatedRep = exercise.rep.filter(set => set.id !== setID);
                            return {
                                ...exercise,
                                rep: updatedRep,
                                set: --exercise.set
                            };
                        }
                        return exercise; // No changes for other exercises
                    })
                }
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
            title: 'View Session',
            start: new Date(2024, 11, 29),
            end: new Date(2024, 11, 29),
            schedule: item
        }

        setEvents((prev) => [...prev, newEvent])
    };


    return (
        <mainContext.Provider value={{
            schedule, setSchedule,
            Routine, setRoutine,
            updatedSchedule,
            Exercises, setExercises,
            updateScheduledRoutine,
            addExerciseSet,
            deleteExerciseSet,
            addRoutineToSchedule,
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
            setPlans
        }}>
            {children}
        </mainContext.Provider>
    );
}

export const useMainContext = () => {
    const context = useContext(mainContext);
    if (!context) {
        throw new Error(
            "useMainContext must be used within a mainContextProvider"
        );
    }
    return context;
}