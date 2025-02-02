document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("resumeModal");
    var btn = document.getElementById("resumeBtn");
    var span = document.getElementsByClassName("close")[0];
    var viewBtn = document.getElementById("viewResumeBtn");
    var downloadBtn = document.getElementById("downloadResumeBtn");
    var resumePreview = document.getElementById("resumePreview");
    var resumeObject = document.getElementById("resumeObject");
    var fallbackLink = document.getElementById("fallbackLink");

    var pdfPath = "resume.pdf";

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
        resumePreview.style.display = "none";
        resumeObject.data = "";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resumePreview.style.display = "none";
            resumeObject.data = "";
        }
    }

    viewBtn.onclick = function() {
        resumePreview.style.display = "block";
        resumeObject.data = pdfPath;
        fallbackLink.href = pdfPath;
    }

    downloadBtn.onclick = function(event) {
        if (isMobile()) {
            event.preventDefault();
            window.open(pdfPath, '_blank');
        }
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
            || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }
});
