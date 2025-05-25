<script lang="ts">
	let modalElem: HTMLDialogElement
	let modalText = $state('')

	// Dynamic data array
	let items = $state([
		{ id: 1, name: 'Item 1' },
		{ id: 2, name: 'Item 2' },
		{ id: 3, name: 'Item 3' }
	])

	let currentItemID: number | null = null

	async function handleModal(itemId: number, itemName: string) {
		currentItemID = itemId
		modalText = `Are you sure you want to perform an action on "${itemName}"?`
		modalElem.showModal()

		const action = await new Promise<string>((resolve) => {
			const handleClose = () => {
				modalElem.removeEventListener('close', handleClose)
				resolve(modalElem.returnValue)
			}
			modalElem.addEventListener('close', handleClose)
		})

		switch (action) {
			//Handle deletion of an item
			case 'delete':
				console.log('Deleting item with ID:', currentItemID)
				// Update the items array by filtering out the deleted item and reassigning IDs
				items = items
					.filter((item) => item.id !== currentItemID)
					.map((item, index) => ({
						...item,
						id: index + 1,
						name: `Item ${index + 1}`
					}))
				break
			//Handle copying of an item
			case 'copy':
				console.log('Copying item with ID:', currentItemID)
				const itemToCopy = items.find((item) => item.id === currentItemID)
				if (itemToCopy) {
					items = [
						...items,
						{ id: items.length + 1, name: `Item ${items.length + 1}` }
					].map((item, index) => ({
						...item,
						id: index + 1,
						name: `Item ${index + 1}`
					}))
				}
				break
			//Handle default action/canceling of an item action aka do nothing :D
			default:
				console.log('Action canceled for item with ID:', currentItemID)
		}
	}
</script>

<!-- Render a list of items -->
<ul>
	{#each items as item}
		<li>
			<button class="btn" onclick={() => handleModal(item.id, item.name)}
				>Action</button>
		</li>
	{/each}
</ul>

<!-- The modal -->
<dialog id="my_modal_1" class="modal" bind:this={modalElem}>
	<div class="modal-box">
		<h3>{modalText}</h3>
		<p class="py-4">What would you like to do?</p>
		<div class="modal-action">
			<!-- Each action passes a different value -->
			<button class="btn" onclick={() => modalElem.close('delete')}
				>Delete</button>
			<button class="btn" onclick={() => modalElem.close('copy')}>Copy</button>
			<button class="btn" onclick={() => modalElem.close('false')}
				>Cancel</button>
		</div>
	</div>
</dialog>
