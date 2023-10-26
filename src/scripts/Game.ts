import { Projectile } from "./Projectiles"
import { Player } from "./Player"

export class Game {
	canvas: HTMLCanvasElement
	width: number
	height: number
	player: Player
	keys: String[]
	projectilesPool: Projectile[]
	numberOfProjectiles: number
	isTouchDevice: boolean // Add this property

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.width = this.canvas.width
		this.height = this.canvas.height
		this.player = new Player(this)
		this.keys = []
		this.projectilesPool = []
		this.numberOfProjectiles = 10
		this.createProjectiles()
		this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

		window.addEventListener("keydown", (e) => {
			const index = this.keys.indexOf(e.key)
			if (index === -1) this.keys.push(e.key)
			if (e.key === ' ') {
				this.player.shoot()
			}
		})
		window.addEventListener("keyup", (e) => {
			const index = this.keys.indexOf(e.key)
			if (index > -1) this.keys.splice(index, 1)
		})
		window.addEventListener("mousedown", (e) => {
			if (e.button === 0) {
				this.player.shoot()
			}
		})
	}

	render(context: CanvasRenderingContext2D) {
		this.player.draw(context)
		this.player.update()
		this.projectilesPool.forEach((projectile) => {
			projectile.update()
			projectile.draw(context)
		})
	}
	// create projectile object pool
	createProjectiles() {
		for (let i = 0; i < this.numberOfProjectiles; i++) {
			this.projectilesPool.push(new Projectile())
		}
	}
	// get free projectile object from the pool
	getProjectile() {
		for (let i = 0; i < this.projectilesPool.length; i++) {
			if (this.projectilesPool[i].free) return this.projectilesPool[i]
		}
	}
}