<script lang="ts">
	import { Canvas } from 'svelte-canvas'
	import { game } from '../app.svelte.ts'
	import GridTile from './GridTile.svelte'
	import GridFighter from './GridFighter.svelte'
	const tileTypes = {
		'#': { color: '#f8f9fa', walkable: false },
		'.': { color: '#ecf0f1', walkable: true },
		_: { color: '#cbd5e1', walkable: true },
		D: { color: '#dee2e6', walkable: true }
	}
	let tileSize = $state(game.grid.config.size)
	let cameraWidth = $state(14)
	let cameraHeight = $state(14)
	let cameraX = $state()
	let cameraY = $state()
	let moveCooldown = $state(0)
	let moveDelay = 150

	const updateCam = () => {
		cameraX = Math.max(0, game.grid.hero.x - Math.floor(cameraWidth / 2))
		cameraY = Math.max(0, game.grid.hero.y - Math.floor(cameraHeight / 2))
		cameraX = Math.min(cameraX, game.grid.config.width - cameraWidth)
		cameraY = Math.min(cameraY, game.grid.config.height - cameraHeight)
	}

	function handleKey(e: KeyboardEvent) {
		if (moveCooldown > Date.now()) return

		let dx = 0
		let dy = 0

		switch (e.key) {
			case 'ArrowUp':
			case 'w':
				dy = -1
				break
			case 'ArrowDown':
			case 's':
				dy = 1
				break
			case 'ArrowLeft':
			case 'a':
				dx = -1
				break
			case 'ArrowRight':
			case 'd':
				dx = 1
				break
			default:
				return
		}

		const targetX = game.grid.hero.x + dx
		const targetY = game.grid.hero.y + dy
		const hitItems = game.grid.items.filter(
			({ x, y }) => x == targetX && y == targetY
		)
		const hitEnemy = game.grid.enemys.filter(
			({ x, y }) => x == targetX && y == targetY
		)
		if (hitItems.length) {
			const { x, y } = hitItems[0]
			game.inventory = hitItems[0]
			game.grid.removeItem(x, y)
		}

		if (hitEnemy.length) {
			const { x, y } = hitEnemy[0]
			game.grid.removeEnemy(x, y)
		}
		if (tileTypes[game.grid.map[targetY][targetX]].walkable) {
			game.grid.updateHero({ x: targetX, y: targetY })
			moveCooldown = Date.now() + moveDelay
		}

		updateCam()
	}

	updateCam()

	$inspect(game.inventory)
</script>

<Canvas
	width={cameraWidth * tileSize}
	height={cameraHeight * tileSize}
	class="bg-slate-50">
	{#each game.grid.map.slice(cameraY, cameraY + cameraHeight) as row, y}
		{#each row.slice(cameraX, cameraX + cameraWidth) as col, x}
			{#if col !== '#'}
				<GridTile color={tileTypes[col].color} {x} {y} {tileSize}></GridTile>
			{/if}
		{/each}
	{/each}
	{#each game.grid.items as { x, y, slug }}
		<GridTile color="green" x={x - cameraX} y={y - cameraY} {tileSize}
		></GridTile>
	{/each}
	{#each game.grid.enemys as { x, y, slug }}
		<GridTile color="blue" x={x - cameraX} y={y - cameraY} {tileSize}
		></GridTile>
	{/each}
	<GridFighter
		col="@"
		color="red"
		x={game.grid.hero.x - cameraX}
		y={game.grid.hero.y - cameraY}
		{tileSize}></GridFighter>
</Canvas>

<svelte:window onkeydown={handleKey} />
