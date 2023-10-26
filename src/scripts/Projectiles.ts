export class Projectile {
	width: number
	height: number
	x: number
	y: number
	speed: number
	free: boolean
	constructor() {
		this.width = 8
		this.height = 18
		this.x = 0
		this.y = 0
		this.speed = 10
		this.free = true
	}
	draw(context: CanvasRenderingContext2D) {
		if (!this.free) {
			context.fillStyle = "#e11d48"
			context.fillRect(this.x, this.y, this.width, this.height)
		}
	}
	update() {
		// move projectile
		if (!this.free) this.y -= this.speed
		// auto reload 
		if (this.y < - this.height) this.reset()
	}
	start(x: number, y: number) {
		// center projectile
		this.x = x - this.width / 2
		this.y = y
		this.free = false
	}
	reset() {
		this.free = true
	}
}