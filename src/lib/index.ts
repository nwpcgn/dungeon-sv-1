// Reexport your entry components here
//@index('./**/*.svelte', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}${f.ext}'`)
export { default as Box } from './Box.svelte'
export { default as AppBar } from './component/AppBar.svelte'
export { default as Dialog } from './component/Dialog.svelte'
export { default as Loader } from './component/Loader.svelte'
export { default as Message } from './component/Message.svelte'
export { default as GridFighter } from './game/GridFighter.svelte'
export { default as GridMap } from './game/GridMap.svelte'
export { default as GridMiniMap } from './game/GridMiniMap.svelte'
export { default as GridTile } from './game/GridTile.svelte'
export { default as Sprites } from './icons/sprites.svelte'
export { default as PageLayout } from './PageLayout.svelte'
//@endindex

//@index('./utils/*.js', (f, _) => `export { default as ${f.name} } from '${f.path}'`)
export { default as clickOutside } from './utils/clickOutside'
export { default as copyToClip } from './utils/copyToClip'
export { default as depaginate } from './utils/depaginate'
export { default as distance } from './utils/distance'
export { default as fetchData } from './utils/fetchData'
export { default as gArr } from './utils/gArr'
export { default as groupArray } from './utils/groupArray'
export { default as loadImage } from './utils/loadImage'
export { default as paginate } from './utils/paginate'
export { default as randInt } from './utils/randInt'
export { default as randNum } from './utils/randNum'
export { default as shuffle } from './utils/shuffle'
export { default as sleep } from './utils/sleep'
export { default as uuid } from './utils/uuid'
//@endindex

//@index('./data/*.json', (f, _) => `export { default as ${f.name} } from '${f.path}'`)
export { default as alerts } from './data/alerts'
export { default as assets } from './data/assets'
export { default as loot } from './data/loot'
//@endindex

export const nav = [
	{
		name: 'Start',
		href: '/',
		icon: 'nwp-start',
		hidden: false
	},
	{
		name: 'Game',
		href: '/game',
		icon: 'nwp-game',
		hidden: false
	},
	{
		name: 'Map',
		href: '/map',
		icon: 'nwp-map-1',
		hidden: false
	}
	// {
	// 	name: 'Settings',
	// 	href: '/settings',
	// 	icon: 'nwp-options',
	// 	hidden: false
	// }
]
