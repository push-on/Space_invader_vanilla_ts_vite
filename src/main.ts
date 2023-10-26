import './style.css'


class Projectile {
  width: number
  height: number
  x: number
  y: number
  speed: number
  free: boolean
  constructor() {
    this.width = 4
    this.height = 10
    this.x = 0
    this.y = 0
    this.speed = 10
    this.free = true
  }
  draw(context: CanvasRenderingContext2D) {
    if (!this.free) {
      context.fillStyle = "rgb(239 68 68)"
      context.fillRect(this.x, this.y, this.width, this.height)
    }
  }
  update() {
    if (!this.free) this.y -= this.speed
    if (this.y < - this.height) this.reset()
  }
  start(x: number, y: number) {
    this.x = x - this.width / 2
    this.y = y
    this.free = false
  }
  reset() {
    this.free = true
  }
}

class Player {
  game: Game
  width: number
  height: number
  x: number
  y: number
  speed: number
  constructor(game: Game) {
    this.game = game
    this.width = 50
    this.height = 50
    // Player position
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height - this.height
    this.speed = 5
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "rgb(251, 191, 36)"
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
    if (this.x < 0) this.x = 0
    else if (this.x > this.game.width - this.width) this.x = this.game.width - this.width
    // Vertical Boundary
    if (this.y < 0) this.y = 0
    else if (this.y > this.game.height - this.height) this.y = this.game.height - this.height
  }
  shoot() {
    const projectile = this.game.getProjectile()
    if (projectile) projectile.start(this.x + this.width / 2, this.y)

  }
}

class Game {
  canvas: HTMLCanvasElement
  width: number
  height: number
  player: Player
  keys: String[]
  projectilesPool: Projectile[]
  numberOfProjectiles: number
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.player = new Player(this)
    this.keys = []
    this.projectilesPool = []
    this.numberOfProjectiles = 10
    this.createProjectiles()

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


window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  const game = new Game(canvas)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.render(ctx)
    requestAnimationFrame(animate)
  }
  animate()
})