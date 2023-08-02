import axios from 'axios'

/*const BASE_URL = 'https://social-network.samuraijs.com/api/1.1'
const settings = {
	withCredentials: true,
}*/

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
})

export const todolistAPI = {
	get() {
		return instance.get<TodoListType[]>(`/todo-lists`)
	},
	create() {
		return instance.post<ResponseType<{ item: TodoListType }>>(
			`/todo-lists`,
			{
				title: 'last todolist',
			}
		)
	},
	update(todoListID, title) {
		return instance.put<ResponseType>(`/todo-lists/${todoListID}`, {
			title,
		})
	},
	delete(todoListID) {
		return instance.delete<ResponseType>(`/todo-lists/${todoListID}`)
	},
}

type TodoListType = {
	id: string
	title: string
	addedDate: string
	order: number
}
type ResponseType<T = {}> = {
	resultCode: number
	fieldsErrors: string[]
	messages: string[]
	data: T
}
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
