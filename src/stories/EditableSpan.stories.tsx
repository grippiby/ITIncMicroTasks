import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from '../EditableSpan'

const meta: Meta<typeof EditableSpan> = {
	title: 'TODOLIST/EditableSpan',
	component: EditableSpan,

	tags: ['autodocs'],

	argTypes: {
		value: {
			description: 'Start value empty. Add value push button set string.',
		},
		/*	value: { defaultValue: 'Click me' },*/
		onChange: action('Value EditableSpan changed'),
	},
}

export default meta
type Story = StoryObj<typeof EditableSpan>
args: {
}

export const SpanIsNotEditable: Story = {
	args: {
		value: 'my value',
	},
}
export const EditableSpanStory: Story = {
	args: {
		onChange: action('Value EditableSpan changed'),
	},
}
