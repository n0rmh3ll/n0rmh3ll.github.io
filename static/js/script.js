document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("resumeModal")
  const btn = document.getElementById("resumeBtn")
  const span = document.getElementsByClassName("close")[0]

  btn.onclick = () => {
    modal.style.display = "block"
  }

  span.onclick = () => {
    modal.style.display = "none"
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
})
