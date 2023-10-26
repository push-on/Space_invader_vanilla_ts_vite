import { Game } from "./Game"

export class Player {
	game: Game
	width: number
	height: number
	x: number
	y: number
	speed: number
	touchStartX: number // Add this property
	touchStartY: number // Add this property
	constructor(game: Game) {
		this.game = game
		this.width = 50
		this.height = 50
		// Player position
		this.x = this.game.width / 2 - this.width / 2
		this.y = this.game.height + this.height
		this.speed = 5
		this.touchStartX = 0 // Initialize to zero
		this.touchStartY = 0 // Initialize to zero
	}
	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = "#d1d5db"
		context.beginPath()

		// Calculate the position of the top center of the triangle.
		const topCenterX = this.x + this.width / 2
		const topCenterY = this.y

		// Move the drawing "pen" to the top center.
		context.moveTo(topCenterX, topCenterY)

		// Draw lines to the bottom-left and bottom-right to form the triangle.
		context.lineTo(this.x, this.y + this.height)
		context.lineTo(this.x + this.width, this.y + this.height)

		context.closePath()
		context.fill()
	}

	update() {
		// Horizontal Movement
		if (this.game.keys.indexOf('ArrowLeft') > -1 || this.game.keys.indexOf('a') > -1) this.x -= this.speed
		if (this.game.keys.indexOf('ArrowRight') > -1 || this.game.keys.indexOf('d') > -1) this.x += this.speed
		// Vertical Movement
		if (this.game.keys.indexOf('ArrowUp') > -1 || this.game.keys.indexOf('w') > -1) this.y -= this.speed
		if (this.game.keys.indexOf('ArrowDown') > -1 || this.game.keys.indexOf('s') > -1) this.y += this.speed
		// Horizontal Boundary
		if (this.x < -this.width / 2) this.x = - this.width / 2
		else if (this.x > this.game.width - this.width / 2) this.x = this.game.width - this.width / 2
		// Vertical Boundary
		if (this.y < 0) this.y = 0
		else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height

		// Handle touch input
		if (this.game.isTouchDevice) {
			this.game.canvas.addEventListener('touchstart', (e) => {
				this.touchStartX = e.touches[0].clientX
				this.touchStartY = e.touches[0].clientY
			})

			this.game.canvas.addEventListener('touchmove', (e) => {
				const touchX = e.touches[0].clientX
				const touchY = e.touches[0].clientY

				// Calculate the change in touch position
				const deltaX = touchX - this.touchStartX
				const deltaY = touchY - this.touchStartY

				// You can adjust a sensitivity factor to control the speed of movement
				const sensitivity = 1.5

				// Update the player's position based on touch input
				this.x += deltaX * sensitivity
				this.y += deltaY * sensitivity

				// boundaries 
				if (this.x < -this.width / 2) this.x = - this.width / 2
				else if (this.x > this.game.width - this.width / 2) this.x = this.game.width - this.width / 2
				if (this.y < 0) this.y = 0
				else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height

				// Update the touch start position for the next frame
				this.touchStartX = touchX
				this.touchStartY = touchY
			})

			// Make sure to prevent the default touch behavior to avoid scrolling
			this.game.canvas.addEventListener('touchmove', (e) => {
				e.preventDefault()

				// Handle shooting when touching with two fingers
				if (e.touches.length === 2) {
					this.shoot()
				}
			})

		}
	}
	shoot() {
		const projectile = this.game.getProjectile()
		if (projectile) projectile.start(this.x + this.width / 2, this.y)

	}

}