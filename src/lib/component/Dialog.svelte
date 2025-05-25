<script lang="ts">
	let { modal1 = $bindable(), children, handleClose } = $props()
</script>

<dialog class="modal" bind:this={modal1} onclose={handleClose}>
	<div class="modal-box">
		{@render children?.()}
	</div>
</dialog>
