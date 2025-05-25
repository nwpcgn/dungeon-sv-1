<script lang="ts">
	import Settings from './lib/Settings.svelte'
	import GameStats from './lib/GameStats.svelte'
	import { Sprites } from './lib'
	import { game } from './lib/app.svelte.ts'
	import { GridMiniMap, GridMap } from './lib/'
	const views = [
		{
			name: 'Start',
			href: '/',
			component: startView,
			icon: 'nwp-start',
			hidden: false
		},
		{
			name: 'Game',
			href: '/game',
			component: gameView,
			icon: 'nwp-game',
			hidden: false
		},
		{
			name: 'Map',
			href: '/map',
			component: mainView,
			icon: 'nwp-map-1',
			hidden: false
		},
		{
			name: 'Settings',
			href: '/settings',
			component: settingsView,
			icon: 'nwp-options',
			hidden: false
		}
	]
	let currentView = $state(0)

	const changeView = (e) => {
		e.preventDefault()
		const id = parseInt(e.currentTarget.dataset.id)
		currentView = id
	}

	const newMap = () => {
		game.grid.createMap()
	}

	const playMap = () => {
		currentView = 1
	}
	const playDom = () => {
		currentView = 2
	}
	const openSettings = () => {
		currentView = 3
	}
</script>

{#snippet iconT(name, style = '')}
	<svg class="nwp-icon" {style}><use xlink:href="#{name}"></use></svg>
{/snippet}

<div class="main-grid" data-theme="retro">
	<aside class="aside border-r">
		<nav class="grid gap-2 p-2">
			{#each views as { name, icon }, i}
				<button
					onclick={changeView}
					data-id={i}
					class="btn btn-square btn-lg"
					class:btn-info={currentView == i}>
					{@render iconT(icon)}
					<span class="sr-only">{name}</span>
				</button>
			{/each}
		</nav>
	</aside>
	<main class="main">
		{#key currentView}
			{#each views as { name, icon, component }, i}
				{#if currentView == i}
					{@render component({ name, icon })}
				{/if}
			{/each}
		{/key}
	</main>
	<aside class="sb border-l">
		<div class="flex justify-center p-2">
			<GridMiniMap tileSize={5}></GridMiniMap>
		</div>
		<GameStats currentViewName={views[currentView].name}></GameStats>
	</aside>
</div>
<Sprites></Sprites>

{#snippet settingsView({ name, icon })}
	<section class="nwp page center">
		<article class="flex max-w-xl flex-col items-center gap-4 p-4">
			<hgroup>
				<h3>{name}</h3>
			</hgroup>
			<Settings></Settings>
		</article>
	</section>
{/snippet}

{#snippet startView({ name })}
	<section class="nwp page center">
		<article class="flex max-w-xl flex-col items-center gap-4 p-4">
			<hgroup>
				<h1>{name}</h1>
			</hgroup>
			<p>Create a Level Map</p>
			<nav class="grid grid-cols-3 gap-2">
				<button onclick={newMap} class="btn btn-neutral">Generate</button>
				<button onclick={playMap} class="btn btn-neutral">Play</button>
				<button onclick={openSettings} class="btn btn-neutral">Options</button>
			</nav>
		</article>
	</section>
{/snippet}

{#snippet gameView({ name, icon })}
	<section class="nwp page center">
		<article>
			<GridMap></GridMap>
		</article>
	</section>
{/snippet}
{#snippet mainView({ name, icon })}
	<section class="nwp page">
		<div class="content">
			<hgroup>
				<h1>{name}</h1>
			</hgroup>
			<div class="rogue" style={game.grid.style}>
				<div class="rogue-grid">
					{#each game.grid.map as row, y}
						{#each row as col, x}
							{#if col === '#'}
								<div class="bg-base-100">
									<span class="sr-only">{col}</span>
								</div>
							{:else}
								<div
									class:room={col === '_'}
									class:door={col === 'D'}
									class:floor={col === '.'}>
									{#if game.grid.hero.x == x && game.grid.hero.y == y}
										<div class="bg-info">
											<span class="sr-only">{col}</span>
										</div>
									{:else}
										<span class="sr-only">{col}</span>
									{/if}
								</div>
							{/if}
						{/each}
					{/each}
				</div>
			</div>
		</div>
	</section>
{/snippet}
