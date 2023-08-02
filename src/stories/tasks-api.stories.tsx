import React, { useEffect, useState } from 'react'
import { todolistTasksAPI } from '../api/tasks-api'

const BASE_URL = 'https://social-network.samuraijs.com/api/1.1'

export default {
	title: 'API',
}

const settings = {
	withCredentials: true,
}
export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const todoListID = 'c711b5ef-5cf1-44ab-aff2-ba30ac09741f'
	useEffect(() => {
		todolistTasksAPI.get(todoListID).then((res) => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateNewTask = () => {
	const [state, setState] = useState<any>(null)

	const todoListID = 'f1e6dd84-07c2-457f-a1a6-f4a7b62800f9'
	useEffect(() => {
		todolistTasksAPI.create(todoListID).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteOneTask = () => {
	const [state, setState] = useState<any>(null)
	const todoListID = 'c711b5ef-5cf1-44ab-aff2-ba30ac09741f'
	const taskID = 'd50703da-e71f-48c8-981c-2093c3b1b803'
	useEffect(() => {
		todolistTasksAPI.delete(todoListID, taskID).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateMyOneTask = () => {
	const [state, setState] = useState<any>(null)
	const todoListID = 'c711b5ef-5cf1-44ab-aff2-ba30ac09741f'
	const taskID = 'd50703da-e71f-48c8-981c-2093c3b1b803'
	useEffect(() => {
		todolistTasksAPI.update(todoListID, taskID).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
