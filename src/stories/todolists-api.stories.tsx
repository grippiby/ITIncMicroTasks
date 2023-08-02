import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

const BASE_URL = 'https://social-network.samuraijs.com/api/1.1'

export default {
	title: 'API',
}

const settings = {
	withCredentials: true,
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.get().then((res) => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.create().then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)

	const todoListID = '4f660c8f-d983-43e5-9d0c-6bf49fff38d9'

	useEffect(() => {
		todolistAPI.delete(todoListID).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)

	const todoListID = '1176fd86-3ef6-483c-bcb6-f17bb06247be'
	const updatedText = 'Updated List'

	useEffect(() => {
		todolistAPI.update(todoListID, updatedText).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
