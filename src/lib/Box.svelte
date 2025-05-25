<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		children,
		aside,
		header
	}: {
		children: Snippet
		aside: Snippet
		header: Snippet
	} = $props()
</script>

<div box-="square contain:!top">
	{#if header}
		<div class="header">{@render header()}</div>
	{/if}

	<article>
		{@render children?.()}
		{#if aside}
			<nav>{@render aside()}</nav>
		{/if}
	</article>
</div>
