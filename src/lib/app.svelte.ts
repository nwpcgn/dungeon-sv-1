import createMap from './game/createMap'
function shuffle(array) {
	let currentIndex = array.length
	let temporaryValue, randomIndex

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}
export interface Game {
	grid: Grid
	fighter: Fighter
	inventory?: InvenEntity[] | null
}
export interface Grid {
	config: Config
	map?: (string[] | null)[] | null
	items?: ItemEntity[] | null
	enemys?: ItemEntity[] | null
	hero: Hero
	style: string | ''
}
export interface Config {
	width: number
	height: number
	size: number
	type: string
}
export interface ItemEntity {
	x: number
	y: number
	slug: string
}
export interface Hero {
	x: number
	y: number
}
export interface Fighter {
	id: number
	name: string
	hp: number
	atk: number
	def: number
	mana: number
	sp: number
	maxHp: number
	maxMana: number
}
export interface InvenEntity {
	name: string
	type: string
	value: number
}
export interface Loot {
	id: number
	name: string
	rarity: string
	type: string
	dropChance: number
	value: number
}

class Fighter {
	id = $state()
	name = $state()
	hp = $state()
	atk = $state()
	def = $state()
	mana = $state()
	maxHp = $state()
	maxMana = $state()
	constructor({ id, name, hp, atk, def, mana }) {
		this.id = id
		this.name = name
		this.hp = hp
		this.atk = atk
		this.def = def
		this.mana = mana
		this.maxHp = this.hp
		this.maxMana = this.mana
	}
}

class Grid {
	config: Config = $state({
		width: 40,
		height: 40,
		size: 40,
		map: 6,
		type: 'Uniform'
	})
	hero: Hero | null = $state()
	items: ItemEntity[] | null = $state()
	enemys: ItemEntity[] | null = $state()
	map: string[][] | null = $state()
	style: string = $derived(
		`--grid-cols: ${this.config.width};--grid-rows: ${this.config.height};--grid-size: ${Math.floor(this.config.size / 2)}px;}`
	)

	constructor() {
		this.createMap()
	}

	createMap() {
		const data = createMap(
			this.config.width,
			this.config.height,
			this.config.type
		)
		this.map = data.map
		this.items = data.items
		this.enemys = data.enemys
		this.hero = data.position
	}
	updateHero(obj = { x: 0, y: 0 }) {
		this.hero = obj
	}
	removeItem(x = 0, y = 0) {
		this.items = this.items.filter((d) => d.x != x || d.y != y)
	}
	removeEnemy(x = 0, y = 0) {
		this.enemys = this.enemys.filter((d) => d.x != x || d.y != y)
	}
	updateConfig(obj: Config) {
		this.config = { ...this.config, ...obj }
	}
}

class Game {
	assets: Loot[] = $state([
		{
			id: 1,
			name: 'Rusty Sword',
			rarity: 'common',
			type: 'weapon',
			dropChance: 40,
			value: 9
		},
		{
			id: 2,
			name: 'Iron Axe',
			rarity: 'uncommon',
			type: 'weapon',
			dropChance: 30,
			value: 9
		},
		{
			id: 3,
			name: 'Flame Bow',
			rarity: 'rare',
			type: 'weapon',
			dropChance: 20,
			value: 2
		},
		{
			id: 4,
			name: 'Shadow Dagger',
			rarity: 'epic',
			type: 'weapon',
			dropChance: 7,
			value: 5
		},
		{
			id: 5,
			name: 'Blade of Eternity',
			rarity: 'legendary',
			type: 'weapon',
			dropChance: 3,
			value: 9
		},
		{
			id: 6,
			name: 'Leather Armor',
			rarity: 'common',
			type: 'armor',
			dropChance: 50,
			value: 3
		},
		{
			id: 7,
			name: 'Iron Plate',
			rarity: 'uncommon',
			type: 'armor',
			dropChance: 25,
			value: 2
		},
		{
			id: 8,
			name: 'Magic Robe',
			rarity: 'rare',
			type: 'armor',
			dropChance: 15,
			value: 5
		},
		{
			id: 9,
			name: 'Dragon Scale Armor',
			rarity: 'epic',
			type: 'armor',
			dropChance: 7,
			value: 5
		},
		{
			id: 10,
			name: 'Aegis of the Ancients',
			rarity: 'legendary',
			type: 'armor',
			dropChance: 3,
			value: 5
		},
		{
			id: 11,
			name: 'Health Potion',
			rarity: 'common',
			type: 'potion',
			dropChance: 60,
			value: 5
		},
		{
			id: 12,
			name: 'Mana Potion',
			rarity: 'common',
			type: 'potion',
			dropChance: 20,
			value: 5
		},
		{
			id: 13,
			name: 'Stamina Elixir',
			rarity: 'uncommon',
			type: 'potion',
			dropChance: 10,
			value: 6
		},
		{
			id: 14,
			name: 'Potion of Invincibility',
			rarity: 'epic',
			type: 'potion',
			dropChance: 5,
			value: 10
		},
		{
			id: 15,
			name: 'Elixir of Time',
			rarity: 'legendary',
			type: 'potion',
			dropChance: 5,
			value: 7
		},
		{
			id: 16,
			name: 'Bronze Spear',
			rarity: 'common',
			type: 'weapon',
			dropChance: 35,
			value: 9
		},
		{
			id: 17,
			name: 'Silver Hammer',
			rarity: 'uncommon',
			type: 'weapon',
			dropChance: 25,
			value: 8
		},
		{
			id: 18,
			name: 'Storm Staff',
			rarity: 'rare',
			type: 'weapon',
			dropChance: 20,
			value: 7
		},
		{
			id: 19,
			name: 'Vampire Fang Blade',
			rarity: 'epic',
			type: 'weapon',
			dropChance: 10,
			value: 10
		},
		{
			id: 20,
			name: 'Phoenix Claw',
			rarity: 'legendary',
			type: 'weapon',
			dropChance: 5,
			value: 9
		},
		{
			id: 21,
			name: 'Chainmail Vest',
			rarity: 'common',
			type: 'armor',
			dropChance: 45,
			value: 3
		},
		{
			id: 22,
			name: 'Runed Cloak',
			rarity: 'uncommon',
			type: 'armor',
			dropChance: 25,
			value: 8
		},
		{
			id: 23,
			name: 'Obsidian Shield',
			rarity: 'rare',
			type: 'armor',
			dropChance: 15,
			value: 4
		},
		{
			id: 24,
			name: 'Celestial Plate',
			rarity: 'epic',
			type: 'armor',
			dropChance: 10,
			value: 8
		},
		{
			id: 25,
			name: 'Astral Shell',
			rarity: 'legendary',
			type: 'armor',
			dropChance: 5,
			value: 2
		},
		{
			id: 26,
			name: 'Minor Healing Potion',
			rarity: 'common',
			type: 'potion',
			dropChance: 55,
			value: 4
		},
		{
			id: 27,
			name: 'Energy Tonic',
			rarity: 'uncommon',
			type: 'potion',
			dropChance: 20,
			value: 3
		},
		{
			id: 28,
			name: 'Shield Elixir',
			rarity: 'rare',
			type: 'potion',
			dropChance: 15,
			value: 5
		},
		{
			id: 29,
			name: 'Fire Resistance Brew',
			rarity: 'epic',
			type: 'potion',
			dropChance: 7,
			value: 2
		},
		{
			id: 30,
			name: 'Void Brew',
			rarity: 'legendary',
			type: 'potion',
			dropChance: 3,
			value: 6
		}
	])
	heroes: Fighter[] = $state([
		{
			id: 1,
			name: 'Bulbasaur',
			hp: 29,
			atk: 8,
			def: 5,
			mana: 7,
			sp: 4
		},
		{
			id: 2,
			name: 'Ivysaur',
			hp: 25,
			atk: 5,
			def: 4,
			mana: 3,
			sp: 4
		},
		{
			id: 3,
			name: 'Gigantamax Venusaur',
			hp: 25,
			atk: 6,
			def: 5,
			mana: 3,
			sp: 3
		},
		{
			id: 4,
			name: 'Charmander',
			hp: 32,
			atk: 5,
			def: 6,
			mana: 8,
			sp: 4
		},
		{
			id: 5,
			name: 'Charmeleon',
			hp: 28,
			atk: 5,
			def: 5,
			mana: 4,
			sp: 7
		},
		{
			id: 6,
			name: 'Charizard',
			hp: 34,
			atk: 5,
			def: 4,
			mana: 9,
			sp: 6
		},
		{
			id: 7,
			name: 'Squirtle',
			hp: 28,
			atk: 7,
			def: 4,
			mana: 3,
			sp: 7
		},
		{
			id: 8,
			name: 'Wartortle',
			hp: 25,
			atk: 6,
			def: 6,
			mana: 7,
			sp: 5
		},
		{
			id: 9,
			name: 'Blastoise',
			hp: 27,
			atk: 6,
			def: 3,
			mana: 9,
			sp: 8
		},
		{
			id: 10,
			name: 'Gigantamax Blasoise',
			hp: 30,
			atk: 6,
			def: 6,
			mana: 5,
			sp: 7
		},
		{
			id: 11,
			name: 'Mega Blastoise',
			hp: 26,
			atk: 7,
			def: 4,
			mana: 5,
			sp: 8
		},
		{
			id: 12,
			name: 'Caterpie',
			hp: 28,
			atk: 4,
			def: 3,
			mana: 4,
			sp: 7
		},
		{
			id: 13,
			name: 'Metapod',
			hp: 31,
			atk: 8,
			def: 3,
			mana: 8,
			sp: 7
		},
		{
			id: 14,
			name: 'Butterfree',
			hp: 29,
			atk: 7,
			def: 4,
			mana: 4,
			sp: 3
		},
		{
			id: 15,
			name: 'Gigantamax Butterfree',
			hp: 31,
			atk: 8,
			def: 3,
			mana: 9,
			sp: 5
		},
		{
			id: 99,
			name: 'Muk',
			hp: 28,
			atk: 8,
			def: 6,
			mana: 4,
			sp: 8
		},
		{
			id: 100,
			name: 'Shellder',
			hp: 28,
			atk: 6,
			def: 6,
			mana: 6,
			sp: 9
		},
		{
			id: 101,
			name: 'Cloyster',
			hp: 28,
			atk: 4,
			def: 3,
			mana: 6,
			sp: 3
		},
		{
			id: 102,
			name: 'Gastly',
			hp: 33,
			atk: 6,
			def: 3,
			mana: 8,
			sp: 3
		},
		{
			id: 103,
			name: 'Haunter',
			hp: 30,
			atk: 5,
			def: 5,
			mana: 6,
			sp: 3
		},
		{
			id: 104,
			name: 'Gengar',
			hp: 31,
			atk: 8,
			def: 3,
			mana: 3,
			sp: 6
		},
		{
			id: 105,
			name: 'Gigantamax Gengar',
			hp: 31,
			atk: 4,
			def: 6,
			mana: 9,
			sp: 9
		},
		{
			id: 106,
			name: 'Mega Gengar',
			hp: 33,
			atk: 7,
			def: 4,
			mana: 9,
			sp: 6
		},
		{
			id: 107,
			name: 'Onix',
			hp: 29,
			atk: 8,
			def: 4,
			mana: 9,
			sp: 6
		},
		{
			id: 108,
			name: 'Drowzee',
			hp: 33,
			atk: 6,
			def: 3,
			mana: 9,
			sp: 5
		},
		{
			id: 109,
			name: 'Hypno',
			hp: 25,
			atk: 7,
			def: 6,
			mana: 3,
			sp: 7
		},
		{
			id: 110,
			name: 'Krabby',
			hp: 25,
			atk: 4,
			def: 6,
			mana: 5,
			sp: 4
		},
		{
			id: 111,
			name: 'Gigantamax Kingler',
			hp: 28,
			atk: 8,
			def: 5,
			mana: 3,
			sp: 9
		},
		{
			id: 112,
			name: 'Kingler',
			hp: 28,
			atk: 5,
			def: 6,
			mana: 6,
			sp: 5
		},
		{
			id: 113,
			name: 'Mew',
			hp: 29,
			atk: 7,
			def: 3,
			mana: 3,
			sp: 8
		}
	])
	grid: Grid = $state()
	fighter: Fighter = $state()
	#inventory: InvenEntity[] = $state()
	constructor() {
		this.grid = new Grid()
		this.#inventory = []
		this.fighter = new Fighter({
			id: 113,
			name: 'Mew',
			hp: 35,
			atk: 4,
			def: 4,
			mana: 9,
			sp: 4
		})
		this.grid.createMap()
		shuffle(this.assets)
		shuffle(this.heroes)
	}

	get inventory() {
		return this.#inventory
	}
	set inventory(value) {
		this.#inventory.push(value)
	}
}

export let game = new Game()
