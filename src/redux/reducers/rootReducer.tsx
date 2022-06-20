import { tasksReducer, tasksStateType } from './tasksReducer';
import { categoriesReducer, categoriesStateType } from './categoriesReducer';
import { combineReducers } from 'redux';

export type globalStateType = {
    tasksState: tasksStateType,
    categoriesState: categoriesStateType
}

export const rootReducer = combineReducers<globalStateType>({
    tasksState: tasksReducer,
    categoriesState: categoriesReducer
})
