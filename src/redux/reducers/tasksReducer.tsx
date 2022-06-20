import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_COMPLETED } from "../actions/tasksActions";
import { taskType } from "../../types/task";

export type tasksStateType = {
    tasksList: taskType[]
}

const tasksState: tasksStateType = {
    tasksList: [
        {
            id: 0,
            taskName: "Cook the diner",
            deadLine: new Date("2022-06-22T17:22"),
            category: 0,
            isCompleted: false
        },
        {
            id: 1,
            taskName: "Go to school",
            deadLine: new Date("2022-06-21T13:15"),
            category: 1,
            isCompleted: false
        },
        {
            id: 2,
            taskName: "Make tea",
            category: 1,
            isCompleted: false
        },
        {
            id: 3,
            taskName: "Visit my mum",
            finishDate: new Date(Date.now()),
            category: 2,
            isCompleted: true
        },
        {
            id: 4,
            taskName: "Happy Birthday",
            deadLine: new Date("2022-05-25T08:15"),
            category: 2,
            isCompleted: false
        }
    ]
}

export const tasksReducer = (state = tasksState, action: any) => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                tasksList: [...state.tasksList, {
                    id: Date.now(),
                    taskName: action.taskName,
                    taskText: action.taskText,
                    deadLine: action.deadLine,
                    category: action.category,
                    isCompleted: false
                }]
            }
        }

        case DELETE_TASK: {
            return {
                tasksList: state.tasksList.filter((task) => {
                    if (task.id != action.taskId) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
            }
        }

        case TOGGLE_COMPLETED: {
            return {
                tasksList: state.tasksList.map((task) => {
                    if (task.id == action.taskId) {
                        task.isCompleted = !task.isCompleted;
                        task.finishDate = new Date(Date.now());
                        
                    }
                    return task;
                })
            }
        }

        case EDIT_TASK: {
            return {
                tasksList: state.tasksList.map((task) => {
                    if (task.id == action.taskId) {
                        task.taskName = action.taskName;
                        task.taskText = action.taskText;
                        task.deadLine = action.deadLine == undefined ? undefined : new Date(action.deadLine);
                        task.category = action.category;
                    }
                    return task;
                })
            }
        }

        default: return state;
    }
}