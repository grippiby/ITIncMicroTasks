import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
})

export const todolistTasksAPI = {
	//GET
	get(todoListID) {
		return instance.get<TodoListType[]>(`/todo-lists/${todoListID}/tasks`)
	},
	//POST
	create(todoListID) {
		return instance.post<ResponseType<{ item: NewTaskType }>>(
			`/todo-lists/${todoListID}/tasks`,
			{ title: 'New TASK' }
		)
	},

	//PUT not work
	update(todoListID, taskID) {
		return instance.put<ResponseType>(
			`/todo-lists/${todoListID}/tasks/${taskID}`,
			{
				title: 'This my NEW TAsk',
				description: 'what is This?',
				completed: false,
			}
			/*status: required(integer)
			priority: required(integer)
			startDate: required(datetime)
			deadline: required(datetime)}*/
		)
	},

	//DELETE
	delete(todoListID, taskID) {
		return instance.delete<ResponseType>(
			`/todo-lists/${todoListID}/tasks/${taskID}`
		)
	},
}
export type NewTaskType = {
	description: string
	title: string
	completed: boolean
	id: string
	todoListId: string
	/*	order: (integer)
		addedDate: (datetime)
		status: (integer)
		priority: (integer)
		startDate: (datetime)
		deadline: (datetime)*/
}
type TodoListType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<T = {}> = {
	messages: string[]
	resultCode: number
	data: T
}
/*type ResponseType<T = {}> = {
	messages: string[]
	resultCode: number

	fieldsErrors: string[]

	data: T
}*/

//Для удаления этого дублирования создадим тип с дженериком
/*type CreateResponseType = {
	resultCode: number
	fieldsErrors: string[]
	messages: string[]
	data: {
		item: TodoListType
	}
}
type DeleteResponseType = {
	resultCode: number
	fieldsErrors: string[]
	messages: string[]
	data: {}
}
type UpdateResponseType = {
	resultCode: number
	fieldsErrors: string[]
	messages: string[]
	data: {}
}*/

/*
export const todolistAPI = {
	get() {
		return axios.get(`${BASE_URL}/todo-lists`, settings)
	},
	create() {
		return axios.post(
			`${BASE_URL}/todo-lists`,
			{ title: '1st tdL' },
			settings
		)
	},
	update(todoListID, title) {
		return axios.put(
			`${BASE_URL}/todo-lists/${todoListID}`,
			{ title },
			settings
		)
	},
	delete(todoListID) {
		return axios.delete(`${BASE_URL}/todo-lists/${todoListID}`, settings)
	},
}
*/
