import { Game } from "./Game"

class Enemy {
	game: Game
	width: number
	height: number
	x: number
	y: number
	constructor(game: Game) {
		this.game = game
		this.width = 50
		this.height = 50
		this.x = this.game.width
		this.y = 0
	}
	draw(context: CanvasRenderingContext2D) {

	}
	update() {

	}
}