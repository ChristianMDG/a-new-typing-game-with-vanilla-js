document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const resultat = document.getElementById('submit');

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            resultat.innerHTML = '<div class="loader"></div>';
            setTimeout(() => {
                window.location.href = '/public/play.html';
            }, 2000);
        } 
    }

    loginForm.addEventListener('submit', handleLogin);

    loginForm.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    });
});
