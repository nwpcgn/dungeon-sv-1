<script lang="ts">
	import { game } from './app.svelte.ts'
	const genTypes = ['Uniform', 'Digger']
	let type = $state(game.grid.config.type)
	let width = $state(game.grid.config.width)
	let height = $state(game.grid.config.height)
	let size = $state(game.grid.config.size)
	let map = $state(game.grid.config.map)
	const saveConfig = () => {
		const obj = {
			type,
			width,
			height,
			size,
			map
		}

		game.grid.updateConfig(obj)
		game.grid.createMap()
	}
</script>

<div class="grid w-[300px] gap-2">
	<div class="flex w-full items-center justify-between gap-4">
		<span class="font-bold"> Generator </span>
		<span class="join">
			{#each genTypes as value, i}
				<label class="join-item btn btn-sm" class:btn-info={type === value}>
					<span>{value}</span>
					<input type="radio" {value} bind:group={type} class="sr-only" />
				</label>
			{/each}
		</span>
	</div>
	<div class="flex w-full items-center justify-between gap-4">
		<span class="font-bold"> Width </span>
		<input class="input-sm input w-1/3" type="number" bind:value={width} />
	</div>
	<div class="flex w-full items-center justify-between gap-4">
		<span class="font-bold"> Height </span>
		<input class="input-sm input w-1/3" type="number" bind:value={height} />
	</div>
	<div class="flex w-full items-center justify-between gap-4">
		<span class="font-bold"> TileSize </span>
		<input class="input-sm input w-1/3" type="number" bind:value={size} />
	</div>
	<div class="flex w-full items-center justify-between gap-4">
		<span class="font-bold"> MiniMap </span>
		<input class="input-sm input w-1/3" type="number" bind:value={map} />
	</div>
	<div class="flex w-full items-center justify-end gap-4">
		<input onclick={saveConfig} class="btn btn-sm" type="button" value="Save" />
	</div>
</div>
