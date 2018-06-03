function clearElement(e) {
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
}
