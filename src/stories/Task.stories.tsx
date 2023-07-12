import type { Meta, StoryObj } from '@storybook/react'

import { Task } from '../Task'
import { action } from '@storybook/addon-actions'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
	title: 'TODOLIST/Task',
	component: Task,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	args: {
		/*    addItem:action ('button clicked inside form')*/

		changeTaskStatus: action('ChangeTaskStatus'),
		changeTaskTitle: action('ChangeTaskTitle'),
		removeTask: action('RemoveTask'),
		task: { id: '222', title: 'JS', isDone: true },
		todoListId: 'todoListID',
	},
}

export default meta
type Story = StoryObj<typeof Task>
args: {
}
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const TaskIsDone: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
}
export const TaskIsNotDone: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
	args: {
		/*    addItem:action ('button clicked inside form')*/
		task: { id: '222', title: 'JS', isDone: false },
	},
}
