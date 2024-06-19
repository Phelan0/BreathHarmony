document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.login-container').style.display = 'block';
    }, 1200); 
});

function redirectToMenu() {
    window.location.href = 'menu.html';
}

function redirectToRegister() {
    window.location.href = 'register.html';
}