const darkModeToggle = document.getElementById('dark-mode-toggle');

const toggleDarkMode = () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

darkModeToggle.addEventListener('change', toggleDarkMode);