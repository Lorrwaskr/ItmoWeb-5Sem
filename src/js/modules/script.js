(function() {
    document.addEventListener("DOMContentLoaded", () => {
        LoadingTime()
    })
})();

function LoadingTime() {
    const start = new Date().getTime()
    const selector = document.querySelector(".page-loading")

    window.addEventListener('load', () => {
        selector.innerHTML = "Loading time: " + ((new Date().getTime() - start) / 1000) + " s."
    })
}