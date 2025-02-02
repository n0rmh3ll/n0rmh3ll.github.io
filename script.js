document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("resumeModal")
  const btn = document.getElementById("resumeBtn")
  const span = document.getElementsByClassName("close")[0]
  const viewBtn = document.getElementById("viewResumeBtn")
  const downloadBtn = document.getElementById("downloadResumeBtn")

  // Replace this with your actual Google Drive file ID
  const fileId = "1_qa6W2q_3wImiBqLfT3URBoetGx1xFjK"
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view`
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`

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

  viewBtn.onclick = (e) => {
    e.preventDefault()
    window.open(viewUrl, "_blank")
  }

  downloadBtn.onclick = (e) => {
    e.preventDefault()
    window.open(downloadUrl, "_blank")
  }

  viewBtn.href = viewUrl
  downloadBtn.href = downloadUrl
})

