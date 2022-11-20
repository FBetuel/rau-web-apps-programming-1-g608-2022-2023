function js_open_modal(e) {
    // Cancel the href solution when JS is enabled
    e.preventDefault(); 

    // JS solution
    const modal = document.getElementsByClassName("modal-container")[0];
    modal.classList.add("show");
}

function js_close_modal(e) {
    // Cancel the href solution when JS is enabled
    e.preventDefault(); 

    // JS solution
    const modal = document.getElementsByClassName("modal-container")[0];
    modal.classList.remove("show");
}