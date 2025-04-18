
const loadingRedirects = {
    'loading.html': 'play.html',
  };
  
  window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); 
    const nextPage = loadingRedirects[currentPage];
  
    if (nextPage) {
      setTimeout(() => {
        window.location.href = nextPage;
      }, 3000); 
    }
  });
  