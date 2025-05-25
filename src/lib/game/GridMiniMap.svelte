<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import { game } from '../../lib/app.svelte.ts'
	import GridTile from './GridTile.svelte'
	import GridFighter from './GridFighter.svelte'
	const tileTypes = {
		'#': { color: '#f8f9fa', walkable: false },
		'.': { color: '#ecf0f1', walkable: true },
		_: { color: '#cbd5e1', walkable: true },
		D: { color: '#dee2e6', walkable: true }
	}
	let { tileSize = 4 } = $props()
</script>

<Canvas
	width={game.grid.config.width * tileSize}
	height={game.grid.config.height * tileSize}
	class="bg-neutral">
	{#each game.grid.map as row, y}
		{#each row as col, x}
			{#if col !== '#'}
				<GridTile color={tileTypes[col].color} {x} {y} {tileSize}></GridTile>
			{/if}
		{/each}
	{/each}
	{#each game.grid.items as { x, y, slug }}
		<GridTile color="green" {x} {y} {tileSize}></GridTile>
	{/each}
	{#each game.grid.enemys as { x, y, slug }}
		<GridTile color="blue" {x} {y} {tileSize}></GridTile>
	{/each}
	<GridFighter
		col="@"
		color="red"
		x={game.grid.hero.x}
		y={game.grid.hero.y}
		{tileSize}></GridFighter>
</Canvas>
