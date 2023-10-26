import { Game } from './scripts/Game'
import './style.css'

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