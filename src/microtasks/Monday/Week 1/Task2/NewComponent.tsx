import React from 'react'

/*type NewComponentPropsType = {
	students: Array<StudentType>
}
type StudentType = {
	id: number
	name: string
	age: number
}*/

type NewComponentPropsType = {
	students: { id: number; name: string; age: number }[]
}
type MyCars = { manufacturer: string; model: string }[]
export const NewComponent = (props: NewComponentPropsType) => {
	const topCars: MyCars = [
		{ manufacturer: 'BMW', model: 'm5cs' },
		{ manufacturer: 'Mercedes', model: 'e63s' },
		{ manufacturer: 'Audi', model: 'rs6' },
	]
	return (
		<>
			<ul>
				{props.students.map((el) => (
					<li key={el.id}>
						Name: {el.name}, Age: {el.age}
					</li>
				))}
			</ul>

			<h2>HTML Table</h2>
			<table>
				<thead>
					<tr>
						<th>№</th>
						<th>Concern</th>
						<th>Model</th>
					</tr>
				</thead>
				<tbody>
					{topCars.map((el, index, array) => {
						return (
							<tr key={index}>
								<th>{index + 1}</th>
								<th>{el.manufacturer}</th>
								<th>{el.model}</th>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
