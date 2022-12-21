(function() {
    window.addEventListener('load', () => {
        let buttons = document.getElementsByClassName("nav_btn");

        for (let page in pages){
            if (location.pathname.includes(`${page}.html`)) {
                Array.from(buttons).find(btn => btn.dataset.nav === page).classList.add('active');
            }
        }
    })
})();

var pages = {
    about : "about",
    filmography : "filmography",
    gallery : "gallery",
    quotes : "quotes",
    table : "table",
}