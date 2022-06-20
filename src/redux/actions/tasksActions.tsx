export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
export const EDIT_TASK = "EDIT_TASK";

export const addTaskAction = (taskName: string, taskText: string | null | undefined, deadLine: Date | undefined, category: number | undefined) => {
    return (
        { type: ADD_TASK, taskName, taskText, deadLine, category }
    )
}

export const deleteTaskAction = (taskId: number) => {
    return (
        { type: DELETE_TASK, taskId }
    )
}

export const toggleCompletedTaskAction = (taskId: number) => {
    return (
        { type: TOGGLE_COMPLETED, taskId }
    )
}

export const editTaskAction = (taskId: number, taskName: string | undefined, taskText: string | null | undefined, deadLine: Date | undefined, category: number | undefined) => {
    return (
        { type: EDIT_TASK, taskId, taskName, taskText, deadLine, category }
    )
}

