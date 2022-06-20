import React, { useState } from 'react';
import '../../styles/Tasks.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addTaskAction, deleteTaskAction, editTaskAction, toggleCompletedTaskAction } from '../../redux/actions/tasksActions';
import { globalStateType } from '../../redux/reducers/rootReducer';


const Tasks = () => {
    const dispatch = useDispatch();

    let todos = useSelector((state: globalStateType) => state.tasksState.tasksList);
    const categories = useSelector((state: globalStateType) => state.categoriesState.categoriesList);

    const notCompletedTasks = todos.filter((task) => {
        if (task.isCompleted === false) {
            return true;
        } else {
            return false;
        }
    })

    notCompletedTasks.sort((a, b) => {
        if (a.deadLine == undefined && b.deadLine == undefined) {
            return 0;
        } else if (a.deadLine == undefined && b.deadLine != undefined) {
            return 1;
        }
        if (b.deadLine == undefined && a.deadLine != undefined) {
            return -1;
        } else if (a.deadLine! > b.deadLine!) {
            return 1;
        } else if (a.deadLine! < b.deadLine!) {
            return -1;
        } else {
            return 0;
        }
    })

    const completedTasks = todos.filter((task) => {
        if (task.isCompleted === true) {
            return true;
        } else {
            return false;
        }
    })

    completedTasks.sort((a, b) => {
        if (a.finishDate! > b.finishDate!) {
            return -1;
        } else if (a.finishDate! < b.finishDate!) {
            return 1;
        } else {
            return 0;
        }
    })

    const [taskName, setTaskName] = useState<string>("");
    const [taskText, setTaskText] = useState<string>("");
    const [deadLine, setDeadLine] = useState<Date>();
    const [category, setCategory] = useState<number>();

    const addTask = (event: React.FormEvent<HTMLFormElement | undefined | null>) => {
        event.preventDefault();
        dispatch(addTaskAction(taskName, taskText, deadLine, category));
    }

    const deleteTask = (event: any) => {
        const taskId = event.target.parentElement.id;
        if (editTaskId != taskId) {
            dispatch(deleteTaskAction(taskId));
        }
    }

    const toggleCompletedTask = (event: any) => {
        const taskId = event.target.parentElement.parentElement.id;
        console.log(taskId);
        dispatch(toggleCompletedTaskAction(taskId));
    }

    const [editTaskMode, setEditTaskMode] = useState<boolean>(false);
    const [editTaskId, setEditTaskId] = useState<number | null>();

    const editTask = (event: any) => {
        const taskId = event.target.parentElement.id;
        const htmlTask = Array.from(event.target.parentElement.children);

        if (editTaskMode == false) {
            setEditTaskMode(true);
            setEditTaskId(taskId);
            htmlTask.map((td: any, index) => {
                if (index == 0) {
                    td.children[0].setAttribute("disabled", true);
                }
                if (index == 1 || index == 2 || index == 3 || index == 4) {
                    td.children[0].setAttribute("hidden", true);
                    td.children[1].hidden = false;
                }
                if (index == 6) {
                    td.classList.add("line-through");
                }
            })
        }

        if (editTaskMode == true && editTaskId == taskId) {
            htmlTask.map((td: any, index) => {
                if (index == 0) {
                    td.children[0].disabled = false;
                }
                if (index == 1 || index == 2 || index == 3 || index == 4) {
                    td.children[0].hidden = false;
                    td.children[1].hidden = true;
                }
                if (index == 6) {
                    td.classList.remove("line-through");
                }
            })

            let editedTaskName;
            let editedTaskText;
            let editedDeadLine;
            let editedCategory;

            htmlTask.map((td: any, index) => {
                if (index == 1) {
                    editedTaskName = td.children[1].value;
                }
                if (index == 2) {
                    editedTaskText = td.children[1].value;
                }
                if (index == 3) {
                    if (!isNaN(Date.parse(td.children[1].value))) {
                        editedDeadLine = td.children[1].value;
                    }
                }
                if (index == 4) {
                    editedCategory = td.children[1].value;
                }
            })

            dispatch(editTaskAction(taskId, editedTaskName, editedTaskText, editedDeadLine, editedCategory));

            setEditTaskMode(false);
            setEditTaskId(null);
        }
    }

    return (
        <>
            <div className="add-task-form">
                <form onSubmit={(e) => addTask(e)}>
                    <div className="item">
                        <label htmlFor="TaskName">Task Name</label>
                        <input id="TaskName" onChange={(e) => setTaskName(e.target.value)} name="TaskName" type="text" required />
                    </div>
                    <div className="item">
                        <label htmlFor="TaskText">Task Text</label>
                        <input id="TaskText" onChange={(e) => setTaskText(e.target.value)} name="TaskText" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="DeadLine">DeadLine</label>
                        <input id="DeadLine" onChange={(e) => setDeadLine(new Date(e.target.value))} name="DeadLine" type="datetime-local" />
                    </div>
                    <div className="item">
                        <label>Category</label>
                        <select name="Category" className="category-select" onChange={(e) => setCategory(Number(e.target.value))} required>
                            <option></option>
                            {categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="buttons">
                        <button type="reset">Clear</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
            <div className="tasks-tables">
                <div className="not-completed-tasks-table">
                    <h2>Not Completed Tasks</h2>
                    {notCompletedTasks.length === 0 ? <div className="clear-table">You don't have not completed tasks!</div> :
                        <table>
                            <thead>
                                <tr key="tableHead">
                                    <td></td>
                                    <td>Task Name</td>
                                    <td>Task Text</td>
                                    <td>Dead line</td>
                                    <td>Category</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {notCompletedTasks.map(task => {

                                    let deadLineInput;
                                    let overdueTask;

                                    if (task.deadLine != undefined || task.deadLine != null) {
                                        deadLineInput = `${task.deadLine?.getFullYear()}-${task.deadLine!.getMonth() + 1 < 10 ? '0' + (task.deadLine!.getMonth() + 1) : task.deadLine!.getMonth() + 1}-${task.deadLine?.getDate() < 10 ? '0' + task.deadLine.getDate() : task.deadLine.getDate()}T${task.deadLine?.getHours() < 10 ? '0' + task.deadLine?.getHours() : task.deadLine?.getHours()}:${task.deadLine?.getMinutes()}`;
                                    }

                                    if (task.deadLine != undefined && task.deadLine < new Date(Date.now())) {
                                        overdueTask = "overdue-task";
                                    }

                                    return (
                                        <tr key={task.id} id={task.id.toString()} className={overdueTask} >
                                            <td><input type="checkbox" onClick={(event) => toggleCompletedTask(event)} /></td>
                                            <td>
                                                <span>{task.taskName}</span>
                                                <input hidden defaultValue={task.taskName}></input>
                                            </td>
                                            <td>
                                                <span>{task.taskText == undefined ? "" : task.taskText}</span>
                                                <input hidden defaultValue={task.taskText}></input>
                                            </td>
                                            <td>
                                                <span>{task.deadLine == undefined ? "" : task.deadLine.toLocaleString()}</span>
                                                <input type="datetime-local" hidden defaultValue={deadLineInput == undefined ? undefined : deadLineInput}></input>
                                            </td>
                                            <td>
                                                <span>
                                                    {categories.map((category) => {
                                                        if (category.id == task.category) {
                                                            return category.name;
                                                        }
                                                    })}
                                                </span>
                                                <select name="Category" required hidden defaultValue={task.category}>
                                                    {categories.map((category) => {
                                                        return (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </td>
                                            <td className="edit-button" onClick={(e) => editTask(e)}>🖊️</td>
                                            <td className="delete-button" onClick={(e) => deleteTask(e)}>❌</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    }
                </div>

                <div className="completed-tasks-table">
                    <h2>Completed Tasks</h2>
                    {completedTasks.length === 0 ? <div className="clear-table">You don't have completed tasks!</div> :
                        <table>
                            <thead>
                                <tr key="tableHead">
                                    <td></td>
                                    <td>Task Name</td>
                                    <td>Task Text</td>
                                    <td>Finish Date</td>
                                    <td>Category</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    completedTasks.map(task => {
                                        return (
                                            <tr key={task.id} id={task.id.toString()}>
                                                <td><input type="checkbox" defaultChecked onClick={(event) => toggleCompletedTask(event)} /></td>
                                                <td>{task.taskName}</td>
                                                <td>{task.taskText === undefined ? "" : task.taskText}</td>
                                                <td>{task.finishDate === undefined ? "undefined" : task.finishDate.toLocaleString()}</td>
                                                <td>
                                                    {categories.map((category) => {
                                                        if (category.id === task.category) {
                                                            return category.name;
                                                        }
                                                    })}
                                                </td>
                                                <td><span className="edit-button">🖊️</span></td>
                                                <td className="delete-button" onClick={(e) => deleteTask(e)}>❌</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
}

export default Tasks;