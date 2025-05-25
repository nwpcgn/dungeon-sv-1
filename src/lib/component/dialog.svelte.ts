type Msg = {
	type: string
	style: string
	text: string
}

class Message {
	buffer: Msg[] | [] = $state()
	list: Msg[] | [] = $state()
	dialog: HTMLDialogElement | null = $state()

	init(elem: HTMLDialogElement) {
		this.dialog = elem
	}
	add(obj) {
		const defaults = {
			type: 'info_msg',
			style: 'info',
			text: 'Empty Message'
		}
		const m = { ...defaults, ...obj }
		this.buffer.push(m)
		this.process()
	}

	process() {
		if (this.buffer.length) {
			const msg = this.buffer.shift()
			this.list = []
			this.list.push(msg)
		}
	}
}

export let msg = new Message()
