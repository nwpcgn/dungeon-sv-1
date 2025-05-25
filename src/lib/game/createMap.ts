import * as ROT from 'rot-js'
import randNum from '../utils/randNum.js'
import loot from '../data/loot.json'
function randomIndex(length: number): number {
	if (length <= 0) throw new Error('Array length must be greater than 0')
	return Math.floor(Math.random() * length)
}

export function generateMap(width = 40, height = 20, type = 'Uniform') {
	const digger = new ROT.Map[type](width, height)
	const map: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(' ')
	)
	const freeCells: string[] = []
	const zeroCells: string[] = []
	const rooms = []
	const items = []
	const enemys = []
	let position = { x: 0, y: 0 }

	const digCallback = (x, y, value) => {
		map[y][x] = value ? '#' : '.'
		const key = `${x},${y}`
		if (value) {
			zeroCells.push(key)
		} else {
			freeCells.push(key)
		}
	}

	const createRooms = () => {
		const sy = {
			'0': '╔',
			'1': '╗',
			'2': '╝',
			'3': '╚',
			'4': '═',
			'5': '║',
			'6': 'o'
		}
		digger.getRooms().forEach((room, roomId) => {
			const result = convertRoom(room)
			const [centerX, centerY] = room.getCenter()
			rooms.push({ ...result, centerX, centerY, roomId })
		})
	}
	const convertRoom = (r) => {
		const doors = Object.keys(r._doors).map((key) => {
			const [x, y] = key.split(',').map(Number)
			return { x, y }
		})

		doors.forEach(({ x, y }) => {
			// const key = `${x},${y}`
			map[y][x] = 'D'
		})

		for (let y = r._y1; y <= r._y2; y++) {
			for (let x = r._x1; x <= r._x2; x++) {
				map[y][x] = '_'
			}
		}

		return {
			x1: r._x1,
			y1: r._y1,
			x2: r._x2,
			y2: r._y2,
			doors
		}
	}
	const generateBoxes = (freeCells) => {
		let length1 = randNum(6, 10)
		for (let i = 0; i < length1; i++) {
			const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
			const key = freeCells.splice(index, 1)[0]
			const [x, y] = key.split(',')
			// map[y][x] = '*'
			items.push({ x: parseInt(x), y: parseInt(y), slug: '*' })
		}
		let length2 = randNum(1, 3)
		for (let i = 0; i < length2; i++) {
			const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
			const key = freeCells.splice(index, 1)[0]
			const [x, y] = key.split(',')
			// map[y][x] = '€'
			enemys.push({ x: parseInt(x), y: parseInt(y), slug: '€' })
		}
	}

	const placeFighter = (freeCells) => {
		const index = Math.floor(ROT.RNG.getUniform() * freeCells.length)
		const key = freeCells.splice(index, 1)[0]
		const [x, y] = key.split(',')
		position = { x: parseInt(x), y: parseInt(y) }
	}

	digger.create(digCallback)
	createRooms()
	generateBoxes(freeCells)
	placeFighter(freeCells)
	return { map, rooms, items, freeCells, zeroCells, enemys, position }
}

export default generateMap
