
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        function chargement() {
            btnEl.innerHTML=`...`
      }
      setTimeout(chargement,1000)
    function callpage() {
        window.location.href = '/public/index.html';
    }
    setTimeout(callpage,3000)
       
    } else {
        alert('Please fill in all fields.');
    }
});
document.addEventListener('DOMContentLoaded', function() {

});
