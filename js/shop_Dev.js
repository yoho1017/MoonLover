function doFirst() {

    let cartItems = JSON.parse(storage.getItem("cartItems")) || [];






















}
window.addEventListener('load', doFirst);