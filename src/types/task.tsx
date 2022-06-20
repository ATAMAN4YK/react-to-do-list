export type taskType = {
    id: number,
    taskName: string,
    taskText?: string,
    deadLine?: Date,
    finishDate?: Date,
    category?: number,
    isCompleted: boolean
}