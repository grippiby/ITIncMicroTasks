// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).
export function sum(...nums: Array<number>): number {
	let total = 0
	for (let i = 0; i < nums.length; i++) {
		total += nums[i]
	}
	return total
	/*return nums.reduce((total, num) => total + num, 0)
	 */
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
	if (a === b && b === c) {
		return '10'
	} else if (a + b <= c || a + c <= b || b + c <= a) {
		return '00'
	} else if (a === b || a === c || b === c) {
		return '01'
	} else {
		return '11'
	}
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
	//...здесь пишем код.
	let sum = 0
	const myNum = number.toString()
	for (let i = 0; i < myNum.length; i++) {
		sum += Number(myNum[i])
	}
	return sum
}

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
	let sumOdd = 0
	let sumEven = 0
	arr.map((el, ind) => {
		if (ind % 2 === 0) {
			sumOdd += el
		}
		if (ind % 2 !== 0) {
			sumEven += el
		}
	})
	return sumOdd >= sumEven
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив.
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.

export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
	return array
		.filter((el) => el >= 0 && Number.isInteger(el))
		.map((el) => Math.pow(el, 2))
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
	return Array.from({ length: N + 1 }, (v, k) => k).reduce(
		(total, num) => total + num,
		0
	)
}

// ...и "лапку" вверх!!!!

// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
	//...здесь пишем код.
	// В return стоит "заглушка", чтоб typescript не ругался
	return [1]
}
