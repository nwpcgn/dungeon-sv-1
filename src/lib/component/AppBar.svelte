<script lang="ts">
	let { children, data } = $props()
</script>

<div class="navbar bg-neutral text-neutral-content">
	<button class="btn btn-neutral text-xl">nwp-app</button>
	{@render children?.()}
</div>
