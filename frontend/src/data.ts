import { Routine, Exercise, Rep, Plan, Schedule, Event } from "./Interface";

export const routines = [
    'shoulders',
    'abs',
    'back',
    'calves',
    'legs',
    'arms',
    'chest',
    'glutes',
    'hamstrings',
    'quads',
    'forearms',
    'deltoids',
    'traps',
    'rhomboids',
    'biceps',
    'pectorals',
    'lats',
];

export const workouts = [
    'Plank',
    'Lateral raise',
    'Bench press',
    'Deadlift',
    'Squat',
    'Push-up',
    'Pull-up',
    'Sit-up',
    'Rowing',
    'Curl',
    'Leg press',
    'Shoulder press',
    'Dumbbell fly',
    'Bicep curl',
];

// export const currentPlans = [
//     'Phase I',
//     'Phase II',
//     'Phase III',
//     'Miami',
// ]

export const currentPlans: Plan[] = [
    {
        id: '1',
        name: 'Phase I',
        type: 'Plan',
        Routines: [
            {
                id: '1',
                name: 'Shoulders',
                exercises: [
                    {
                        id: '1',
                        name: 'Dumbbell Shoulder Press',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '1',
                                rep: '10x45'
                            },
                            {
                                id: '2',
                                rep: '9x45'
                            },
                            {
                                id: '3',
                                rep: '8x40'
                            }
                        ],
                        log: []
                    },
                    {
                        id: '2',
                        name: 'Push Up',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '4',
                                rep: '10x45'
                            },
                            {
                                id: '5',
                                rep: '9x45'
                            },
                            {
                                id: '6',
                                rep: '8x40'
                            }
                        ],
                        log: []

                    },
                    {
                        id: '3',
                        name: 'Lateral Raise',
                        complete: false,
                        set: 2,
                        rep: [
                            {
                                id: '7',
                                rep: '10x45'
                            },
                            {
                                id: '8',
                                rep: '9x45'
                            },
                        ],
                        log: []

                    }
                ],
                type: 'Routine'

            },
            {
                id: '2',
                name: 'Chest',
                exercises: [
                    {
                        id: '3',
                        name: 'Bench Press',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '9',
                                rep: '10x145'
                            },
                            {
                                id: '10',
                                rep: '9x145'
                            },
                            {
                                id: '11',
                                rep: '8x140'
                            }
                        ],
                        log: []

                    },
                    {
                        id: '4',
                        name: 'Leg Press',
                        complete: false,
                        set: 2,
                        rep: [
                            {
                                id: '12',
                                rep: '10x270'
                            },
                            {
                                id: '13',
                                rep: '9x270'
                            },
                        ],
                        log: []

                    },
                    {
                        id: '5',
                        name: 'Incline Bench Press',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '14',
                                rep: '8x270'
                            },
                            {
                                id: '15',
                                rep: '8x270'
                            },
                            {
                                id: '16',
                                rep: '8x270'
                            },
                        ],
                        log: []

                    },
                ],
                type: 'Routine'
            }
        ]
    },
    {
        id: '2',
        name: 'Phase II',
        type: 'Plan',
        Routines: [
            {
                id: '3',
                name: 'Legs',
                exercises: [
                    {
                        id: '7',
                        name: 'Leg Press',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '17',
                                rep: '10x140'
                            },
                            {
                                id: '18',
                                rep: '9x145'
                            },
                            {
                                id: '19',
                                rep: '8x140'
                            }
                        ],
                        log: []

                    },
                    {
                        id: '8',
                        name: 'Leg Squat',
                        complete: false,
                        set: 2,
                        rep: [
                            {
                                id: '20',
                                rep: '10x270'
                            },
                            {
                                id: '21',
                                rep: '9x270'
                            },
                        ],
                        log: []

                    },
                    {
                        id: '9',
                        name: 'Leg Curls',
                        complete: false,
                        set: 3,
                        rep: [
                            {
                                id: '22',
                                rep: '8x270'
                            },
                            {
                                id: '23',
                                rep: '8x270'
                            },
                            {
                                id: '24',
                                rep: '8x270'
                            },
                        ],
                        log: []

                    },
                ],
                type: 'Routine'
            }
        ]
    }
]


export const currentRoutines: Routine[] = [
    {
        id: '1',
        name: 'Shoulders',
        exercises: [
            {
                id: '1',
                name: 'Dumbbell Shoulder Press',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '1',
                        rep: '10x45'
                    },
                    {
                        id: '2',
                        rep: '9x45'
                    },
                    {
                        id: '3',
                        rep: '8x40'
                    }
                ],
                log: []

            },
            {
                id: '2',
                name: 'Push Up',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '4',
                        rep: '10x45'
                    },
                    {
                        id: '5',
                        rep: '9x45'
                    },
                    {
                        id: '6',
                        rep: '8x40'
                    }
                ],
                log: []

            },
            {
                id: '3',
                name: 'Lateral Raise',
                complete: false,
                set: 2,
                rep: [
                    {
                        id: '7',
                        rep: '10x45'
                    },
                    {
                        id: '8',
                        rep: '9x45'
                    },
                ],
                log: []

            }
        ],
        type: 'Routine'
    },
    {
        id: '2',
        name: 'Chest',
        type: 'Routine',
        exercises: [
            {
                id: '4',
                name: 'Bench Press',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '9',
                        rep: '10x145'
                    },
                    {
                        id: '10',
                        rep: '9x145'
                    },
                    {
                        id: '11',
                        rep: '8x140'
                    }
                ],
                log: []

            },
            {
                id: '5',
                name: 'Leg Press',
                complete: false,
                set: 2,
                rep: [
                    {
                        id: '12',
                        rep: '10x270'
                    },
                    {
                        id: '13',
                        rep: '9x270'
                    },
                ],
                log: []

            },
            {
                id: '6',
                name: 'Incline Bench Press',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '14',
                        rep: '8x270'
                    },
                    {
                        id: '15',
                        rep: '8x270'
                    },
                    {
                        id: '16',
                        rep: '8x270'
                    },
                ],
                log: []

            },
        ],
    },
    {
        id: '3',
        name: 'Legs',
        exercises: [
            {
                id: '7',
                name: 'Leg Press',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '17',
                        rep: '10x140'
                    },
                    {
                        id: '18',
                        rep: '9x145'
                    },
                    {
                        id: '19',
                        rep: '8x140'
                    }
                ],
                log: []

            },
            {
                id: '8',
                name: 'Leg Squat',
                complete: false,
                set: 2,
                rep: [
                    {
                        id: '20',
                        rep: '10x270'
                    },
                    {
                        id: '21',
                        rep: '9x270'
                    },
                ],
                log: []

            },
            {
                id: '9',
                name: 'Leg Curls',
                complete: false,
                set: 3,
                rep: [
                    {
                        id: '22',
                        rep: '8x270'
                    },
                    {
                        id: '23',
                        rep: '8x270'
                    },
                    {
                        id: '24',
                        rep: '8x270'
                    },
                ],
                log: []

            },
        ],
        type: 'Routine'
    }
]

export const currentExercises: Exercise[] = [
    {
        id: '1',
        name: 'Dumbbell Shoulder Press',
        complete: false,
        set: 3,
        rep: [
            {
                id: '1',
                rep: '10x45'
            },
            {
                id: '2',
                rep: '9x45'
            },
            {
                id: '3',
                rep: '8x40'
            }
        ],
        log: []

    },
    {
        id: '2',
        name: 'Push Up',
        complete: false,
        set: 3,
        rep: [
            {
                id: '4',
                rep: '10x45'
            },
            {
                id: '5',
                rep: '9x45'
            },
            {
                id: '6',
                rep: '8x40'
            }
        ],
        log: []

    },
    {
        id: '3',
        name: 'Lateral Raise',
        complete: false,
        set: 2,
        rep: [
            {
                id: '7',
                rep: '10x45'
            },
            {
                id: '8',
                rep: '9x45'
            },
        ],
        log: []

    },
    {
        id: '4',
        name: 'Bench Press',
        complete: false,
        set: 3,
        rep: [
            {
                id: '9',
                rep: '10x145'
            },
            {
                id: '10',
                rep: '9x145'
            },
            {
                id: '11',
                rep: '8x140'
            }
        ],
        log: []

    },
    {
        id: '5',
        name: 'Leg Press',
        complete: false,
        set: 2,
        rep: [
            {
                id: '12',
                rep: '10x270'
            },
            {
                id: '13',
                rep: '9x270'
            },
        ],
        log: []

    },
    {
        id: '6',
        name: 'Incline Bench Press',
        complete: false,
        set: 3,
        rep: [
            {
                id: '14',
                rep: '8x270'
            },
            {
                id: '15',
                rep: '8x270'
            },
            {
                id: '16',
                rep: '8x270'
            },
        ],
        log: []

    },
    {
        id: '7',
        name: 'Over Head Squat',
        complete: false,
        set: 3,
        rep: [
            {
                id: '17',
                rep: '10x140'
            },
            {
                id: '18',
                rep: '9x145'
            },
            {
                id: '19',
                rep: '8x140'
            }
        ],
        log: []

    },
    {
        id: '8',
        name: 'Leg Squat',
        complete: false,
        set: 2,
        rep: [
            {
                id: '20',
                rep: '10x270'
            },
            {
                id: '21',
                rep: '9x270'
            },
        ],
        log: []

    },
    {
        id: '9',
        name: 'Leg Curls',
        complete: false,
        set: 3,
        rep: [
            {
                id: '22',
                rep: '8x270'
            },
            {
                id: '23',
                rep: '8x270'
            },
            {
                id: '24',
                rep: '8x270'
            },
        ],
        log: []

    },
]

export const currentRep: Rep[] = [
    {
        id: '1',
        rep: '10x45'
    },
    {
        id: '2',
        rep: '9x45'
    },
    {
        id: '3',
        rep: '8x40'
    },
    {
        id: '4',
        rep: '10x45'
    },
    {
        id: '5',
        rep: '9x45'
    },
    {
        id: '6',
        rep: '8x40'
    },
    {
        id: '7',
        rep: '10x45'
    },
    {
        id: '8',
        rep: '9x45'
    },
    {
        id: '9',
        rep: '10x145'
    },
    {
        id: '10',
        rep: '9x145'
    },
    {
        id: '11',
        rep: '8x140'
    },
    {
        id: '12',
        rep: '10x270'
    },
    {
        id: '13',
        rep: '9x270'
    },
    {
        id: '14',
        rep: '8x270'
    },
    {
        id: '15',
        rep: '8x270'
    },
    {
        id: '16',
        rep: '8x270'
    },
    {
        id: '17',
        rep: '10x140'
    },
    {
        id: '18',
        rep: '9x145'
    },
    {
        id: '19',
        rep: '8x140'
    },
    {
        id: '20',
        rep: '10x270'
    },
    {
        id: '21',
        rep: '9x270'
    },
    {
        id: '22',
        rep: '8x270'
    },
    {
        id: '23',
        rep: '8x270'
    },
    {
        id: '24',
        rep: '8x270'
    },
]

export const UpcommingSession: Schedule[] = [
    {
        id: '1',
        complete: false,
        routine: {
            id: '1',
            name: 'Shoulders',
            exercises: [
                {
                    id: '1',
                    name: 'Dumbbell Shoulder Press',
                    complete: false,
                    set: 3,
                    rep: [
                        {
                            id: '1',
                            rep: '10x45'
                        },
                        {
                            id: '2',
                            rep: '9x45'
                        },
                        {
                            id: '3',
                            rep: '8x40'
                        }
                    ],
                    log: []

                },
                {
                    id: '2',
                    name: 'Push Up',
                    complete: false,
                    set: 3,
                    rep: [
                        {
                            id: '4',
                            rep: '10x45'
                        },
                        {
                            id: '5',
                            rep: '9x45'
                        },
                        {
                            id: '6',
                            rep: '8x40'
                        }
                    ],
                    log: []

                },
                {
                    id: '3',
                    name: 'Lateral Raise',
                    complete: false,
                    set: 2,
                    rep: [
                        {
                            id: '7',
                            rep: '10x45'
                        },
                        {
                            id: '8',
                            rep: '9x45'
                        },
                    ],
                    log: []

                }
            ],
            type: 'Routine'
        }
    },
    {
        id: '2',
        complete: false,
        routine: {
            id: '2',
            name: 'Chest',
            exercises: [
                {
                    id: '4',
                    name: 'Bench Press',
                    complete: false,
                    set: 3,
                    rep: [
                        {
                            id: '9',
                            rep: '10x145'
                        },
                        {
                            id: '10',
                            rep: '9x145'
                        },
                        {
                            id: '11',
                            rep: '8x140'
                        }
                    ],
                    log: []

                },
                {
                    id: '5',
                    name: 'Leg Press',
                    complete: false,
                    set: 2,
                    rep: [
                        {
                            id: '12',
                            rep: '10x270'
                        },
                        {
                            id: '13',
                            rep: '9x270'
                        },
                    ],
                    log: []

                },
                {
                    id: '6',
                    name: 'Incline Bench Press',
                    complete: false,
                    set: 3,
                    rep: [
                        {
                            id: '14',
                            rep: '8x270'
                        },
                        {
                            id: '15',
                            rep: '8x270'
                        },
                        {
                            id: '16',
                            rep: '8x270'
                        },
                    ],
                    log: []

                },
            ],
            type: 'Routine'
        }
    }
]

export const MyEvents: Event[] = [
    {
        id: '1',
        title: 'View Session',
        start: new Date(2024, 11, 3),
        end: new Date(2024, 11, 3),
        schedule: undefined
    },

    {
        id: '2',
        title: 'View Session',
        start: new Date(2024, 11, 13),
        end: new Date(2024, 11, 13),
        schedule: undefined

    },

    {
        id: '3',
        title: 'View Session',
        start: new Date(2024, 11, 19),
        end: new Date(2024, 11, 19),
        schedule: undefined
    },

    {
        id: '4',
        title: 'View Session',
        start: new Date(2024, 11, 21),
        end: new Date(2024, 11, 21),
        schedule: undefined
    },

    {
        id: '5',
        title: 'View Session',
        start: new Date(2024, 11, 24),
        end: new Date(2024, 11, 24),
        schedule: undefined

    },
]

