<script lang="ts">
	import { game } from './app.svelte.ts'
	let { currentViewName = '' } = $props()
	let gameStats = $derived([
		{
			heading: true,
			label: 'View',
			value: ''
		},
		{
			label: 'Current',
			value: currentViewName
		},
		{
			label: 'Hero',
			value: `${game.grid.hero.x}/${game.grid.hero.y}`
		},
		{
			heading: true,
			label: 'Map',
			value: ''
		},
		{
			label: 'Type',
			value: `${game.grid.config.type}`
		},
		{
			label: 'Grid',
			value: `${game.grid.config.width}x${game.grid.config.height}`
		},
		{
			label: 'Items',
			value: `${game.grid.items?.length}`
		},
		{
			label: 'Monster',
			value: `${game.grid.enemys?.length}`
		},
		{
			heading: true,
			label: 'Player',
			value: ''
		},
		{
			label: 'Name',
			value: `${game.fighter.name}`
		},
		{
			label: 'Helth',
			value: `${game.fighter.hp}/${game.fighter.maxHp}`
		},
		{
			label: 'Mana',
			value: `${game.fighter.mana}/${game.fighter.maxMana}`
		},
		{
			label: 'Inventory',
			value: `${game.inventory.length}`
		},
		{
			label: 'Position',
			value: `${game.grid.hero.x}/${game.grid.hero.y}`
		}
	])
</script>

<div class="grid gap-1 p-2">
	{#each gameStats as { label, value, heading }}
		<div class="flex items-center justify-between gap-2">
			<span class:font-bold={heading}>{label}</span>
			<span>{value}</span>
		</div>
		{#if heading}
			<hr />
		{/if}
	{/each}
</div>
