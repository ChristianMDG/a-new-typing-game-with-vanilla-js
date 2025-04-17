const nameEl=document.getElementById('name')
const resultat = document.getElementById('question')
document.addEventListener('keydown',
(evenement)=>{
    const keyName=evenement.key
    if(keyName==="Enter"){
        function chargement(){
            resultat.innerHTML=`  <img src="./preloader.gif" alt="">
            <p>Wait...</p>`

        }
        setTimeout(chargement,1000)
       
        function affiche(){
            resultat.innerHTML=`<h4>Hello ${nameEl.value}!</h4>`   
        }
        setTimeout(affiche,3000)
    }
}
)


