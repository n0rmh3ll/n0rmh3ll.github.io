document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("resumeModal");
    var btn = document.getElementById("resumeBtn");
    var span = document.getElementsByClassName("close")[0];
    var resumeFrame = document.getElementById("resumeFrame");
    var downloadBtn = document.getElementById("downloadBtn");

    // Update this path to point to your resume in the content folder
    var pdfPath = "/content/resume.pdf";

    btn.onclick = function() {
        modal.style.display = "block";
        resumeFrame.src = pdfPath;
        downloadBtn.href = pdfPath;
    }

    span.onclick = function() {
        modal.style.display = "none";
        resumeFrame.src = ""; // Clear the iframe source when closing
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resumeFrame.src = ""; // Clear the iframe source when closing
        }
    }

    // Add error handling for the iframe
    resumeFrame.onerror = function() {
        console.error("Failed to load the PDF file");
        resumeFrame.srcdoc = "<p>Failed to load the resume. Please ensure the file exists and is accessible.</p>";
    };

    // Add error handling for the download button
    downloadBtn.onclick = function(event) {
        if (!pdfPath) {
            event.preventDefault();
            alert("The resume file is not available for download.");
        }
    };
});