document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const resultat = document.getElementById('submit');

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            resultat.innerHTML = '<p>Wait...</p>';
            setTimeout(() => {
                window.location.href = '/public/index.html';
            }, 3000);
        } else {
            alert('Please fill in all fields.');
        }
    }

    loginForm.addEventListener('submit', handleLogin);

    loginForm.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    });
});
