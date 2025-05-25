<script lang="ts">
	import { fade, fly } from 'svelte/transition'
</script>

<section
	class="loader bg"
	in:fade={{ duration: 400 }}
	out:fade={{ duration: 200 }}>
</section>

<section
	class="loader"
	in:fly={{ duration: 400, y: 200, delay: 200 }}
	out:fly={{ duration: 400, y: 200 }}>
	<div class="spinner"></div>
</section>

<style>
	:root {
		--loader-color: oklch(65.6% 0.241 354.308);
		--loader-bg: oklch(26.9% 0 0);
		--loader-size: 78px;
	}

	.loader {
		position: fixed;
		inset: 0;
		overflow: hidden;
		display: grid;
		place-content: center;
	}

	.loader.bg {
		background-color: var(--loader-bg);
	}

	.spinner {
		position: relative;
		width: var(--loader-size);
		height: var(--loader-size);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner::before,
	.spinner::after {
		border: calc(var(--loader-size) * 0.12) solid var(--loader-color);
		border-radius: 50%;
		position: absolute;
		content: '';
		display: block;
	}

	.spinner::before {
		width: calc(var(--loader-size) * 0.6);
		height: calc(var(--loader-size) * 0.6);
		border-bottom-color: transparent;
		border-left-color: transparent;
		animation: spinner-1o3y8q 0.8999999999999999s infinite linear reverse;
	}

	.spinner::after {
		animation: spinner-1o3y8q 0.6s infinite linear;
		height: var(--loader-size);
		width: var(--loader-size);
		border-right-color: transparent;
		border-top-color: transparent;
	}

	@keyframes spinner-1o3y8q {
		to {
			transform: rotate(360deg);
		}
	}
</style>
