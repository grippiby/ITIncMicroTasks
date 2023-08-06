import { TasksStateType } from '../App'
import {
	AddTodolistActionType,
	RemoveTodolistActionType,
	SetTodolistsActionType,
} from './todolists-reducer'
import {
	TaskStatuses,
	TaskType,
	todolistsAPI,
	UpdateTaskModelType,
} from '../api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from './store'

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistId: string
	taskId: string
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	task: TaskType
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	todolistId: string
	taskId: string
	status: TaskStatuses
}
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| SetTasksActionType
const initialState: TasksStateType = {
	/*"todolistId1": [
		{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
		{ id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
		{ id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	],
	"todolistId2": [
		{ id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
		{ id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
		{ id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
			startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
	]*/
}

export const tasksReducer = (
	state: TasksStateType = initialState,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const newTasks = tasks.filter((t) => t.id !== action.taskId)
			stateCopy[action.todolistId] = newTasks
			return stateCopy
		}
		case 'ADD-TASK': {
			return {
				...state,
				[action.task.todoListId]: [
					action.task,
					...state[action.task.todoListId],
				],
			}
		}
		case 'CHANGE-TASK-STATUS': {
			let todolistTasks = state[action.todolistId]
			let newTasksArray = todolistTasks.map((t) =>
				t.id === action.taskId ? { ...t, status: action.status } : t
			)

			state[action.todolistId] = newTasksArray
			return { ...state }
		}
		case 'CHANGE-TASK-TITLE': {
			let todolistTasks = state[action.todolistId]
			// найдём нужную таску:
			let newTasksArray = todolistTasks.map((t) =>
				t.id === action.taskId ? { ...t, title: action.title } : t
			)

			state[action.todolistId] = newTasksArray
			return { ...state }
		}
		case 'ADD-TODOLIST': {
			return {
				...state,
				[action.todolistId]: [],
			}
		}
		case 'REMOVE-TODOLIST': {
			const copyState = { ...state }
			delete copyState[action.id]
			return copyState
		}
		case 'SET-TODOLISTS': {
			const stateCopy = { ...state }
			action.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}
		case 'SET-TASKS': {
			/*action.tasks.map((t) => t.todoListId)*/
			/*		const stateCopy = { ...state }
					stateCopy[action.todolistId] = action.tasks
					return stateCopy*/
			return { ...state, [action.todolistId]: action.tasks }
		}

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: 'REMOVE-TASK',
		taskId: taskId,
		todolistId: todolistId,
	} as const
}

export const addTaskAC = (task: TaskType) => {
	return { type: 'ADD-TASK', task } as const
}

export const changeTaskStatusAC = (
	taskId: string,
	status: TaskStatuses,
	todolistId: string
) => {
	return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId } as const
}
export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
) => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
	return { type: 'SET-TASKS', tasks, todolistId } as const
}

//ThunkCreator
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.getTasks(todolistId).then((res) => {
		const tasks = res.data.items
		dispatch(setTasksAC(todolistId, tasks))
	})
}
export const removeTaskTC =
	(id: string, todolistId: string) => (dispatch: Dispatch) => {
		todolistsAPI.deleteTask(todolistId, id).then((res) => {
			dispatch(removeTaskAC(id, todolistId))
		})
	}

export const addTaskTC =
	(todolistId: string, title: string) => (dispatch: Dispatch) => {
		todolistsAPI.createTask(todolistId, title).then((res) => {
			let newTask = res.data.data.item

			dispatch(addTaskAC(newTask))
		})
	}

export const updateTaskStatusTC =
	(todolistId: string, taskId: string, status: TaskStatuses) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		let state = getState().tasks[todolistId].find((el) => el.id === taskId)
		if (state) {
			const model: UpdateTaskModelType = {
				title: state.title,
				status: status,
				deadline: state.deadline,
				description: state.description,
				priority: state.priority,
				startDate: state.startDate,
			}
			todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
				let newTask = res.data.data.item

				dispatch(changeTaskStatusAC(taskId, status, todolistId))
			})
		}
		/*	getState().tasks
																																				todolistsAPI.updateTask(todolistId, title).then((res) => {
																																					let newTask = res.data.data.item
																																										dispatch(addTaskAC(newTask))
																																				})*/
	}

/*
export const updateTaskStatusTC = (
	taskId: string,
	todolistId: string,
	status: TaskStatuses
) => {
	return (dispatch: Dispatch, getState: () => AppRootStateType) => {
		// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
		// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const task = tasksForCurrentTodolist.find((t) => {
			return t.id === taskId
		})

		if (task) {
			todolistsAPI
				.updateTask(todolistId, taskId, {
					title: task.title,
					startDate: task.startDate,
					priority: task.priority,
					description: task.description,
					deadline: task.deadline,
					status: status,
				})
				.then(() => {
					const action = changeTaskStatusAC(taskId, status, todolistId)
					dispatch(action)
				})
		}
	}
}
*/

export const updateTaskTitleTC =
	(todolistId: string, taskId: string, title: string) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		let state = getState().tasks[todolistId].find((el) => el.id === taskId)
		if (state) {
			const model: UpdateTaskModelType = {
				title: title,
				status: state.status,
				deadline: state.deadline,
				description: state.description,
				priority: state.priority,
				startDate: state.startDate,
			}
			todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
				dispatch(changeTaskTitleAC(taskId, title, todolistId))
			})
		}
	}
