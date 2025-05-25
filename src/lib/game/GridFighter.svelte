<script lang="ts">
	import { Canvas, Layer } from 'svelte-canvas'
	let { x, y, color, tileSize } = $props()
	import { Tween, Spring } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	let _x = new Tween(x * tileSize, {
		duration: 600,
		easing: cubicOut
	})
	let _y = new Tween(y * tileSize, {
		duration: 600,
		easing: cubicOut
	})
	let coords = new Spring(
		{ x: x * tileSize, y: y * tileSize },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	)
	$effect(() => {
		coords.target = { x: x * tileSize, y: y * tileSize }
	})

	const render = ({ context }) => {
		context.fillStyle = color
		context.fillRect(coords.current.x, coords.current.y, tileSize, tileSize)
	}
</script>

<Layer {render}></Layer>
