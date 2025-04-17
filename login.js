const resultatEl = document.querySelector('.resultat')
const emailEl= document.querySelector('.email')
const passwdEl= document.querySelector('.password')
const btnEl = document.querySelector('.btn')
const formEl = document.getElementById('formulaire')
if (formEl) {
  formEl.addEventListener('submit',function login(e){
    e.preventDefault()
    if (emailEl.value=="christian@gmail.com" && passwdEl.value=="/*christian*/") {
      function chargement() {
            btnEl.innerHTML=`...`
      }
      setTimeout(chargement,1000)
    function callpage() {
      window.open('../acceuil.html')
    }
    setTimeout(callpage,3000)
     
  }else{
      function alerte(){
          resultatEl.innerHTML=` <h5>Email or Password Invalid</h5>`
          resultatEl.style.background="red"
         resultatEl.style.color="white"
        location.reload()
        }
        setTimeout(alerte,200);
      
  }
  }
)
formEl.addEventListener('keydown',
  (evenement)=>{
      const keyName=evenement.key
      if(keyName==="Enter"){
        e.preventDefault()
        if (emailEl.value=="christian@gmail.com" && passwdEl.value=="/*christian*/") {
          function chargement() {
                btnEl.innerHTML=`...`
          }
          setTimeout(chargement,1000)
        function callpage() {
          window.open('../acceuil.html')
        }
        setTimeout(callpage,3000)
         
      }else{
          function alerte(){
              resultatEl.innerHTML=` <h5>Email or Password Invalid</h5>`
              resultatEl.style.background="red"
              resultatEl.style.color="white"
            location.reload()
            }
            setTimeout(alerte,200);
          
      }
}}
  )
  
  
}



