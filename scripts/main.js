// https://home.openweathermap.org/api_keys

// EN LOCAL : L'utiliser avec le live server pour outrepasser des eventuels problemes de CORS POLICY

// One API Call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

const CLEFAPI = '31276a8162721a917f1f661d378ec0c6';
let resultatsAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long= position.coords.longitude;
        let lat= position.coords.latitude;
        AppelAPI(long,lat);

    }, () => { //else
        alert(`Mhh...  La prédiction d'un lieu inconnu est difficile, veuillez accepter la géolocalisation`);
    })
}

function AppelAPI(long, lat) { 
    // appel en ajoutant les parametres métriques / langue / retirant les minutes
    // fetch retourne une promesse, elle va se résoudre quand la requete se sera bien réalisée, que les données seront présentes
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    // si données bien recup alors on les rend lisibles en transformant en JSON :
    .then((reponse) => {
        return reponse.json();
    })
    // puis on en fait ce qu'on veut :
    .then((data) => {

        console.log(data);

       resultatsAPI = data; 
       // aller voir dans la console : on va viser la description du temps dans current>weather>0 > description
       temps.innerText = resultatsAPI.current.weather[0].description;
       // Math.trunc : enleve les chiffres apres virgule 
       temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
       localisation.innerText = resultatsAPI.timezone;

       // chaque 3 heures : 

       let heureActuelle = new Date().getHours();

       for (let i=0; i<heure.length; i++) {
           // ex : il est midi : l'heure actuelle + 0 * 3 = midi / PUIS heure actuelle + 1 * 3 = 15h / 18h / 21h
           let heureIncr = heureActuelle + i * 3;

           if (heureIncr > 24){
               heure[i].innerText = `${heureIncr - 24} h`; // si = 24 affichera 00, si =27 affichera 3 (jour suivant)
           }
           else if (heureIncr === 24) {
               heure[i].innerText= "00 h"
           }
           else {
           heure[i].innerText = `${heureIncr} h`;
            }
       }

       //  + température :

       for (let j=0; j<tempPourH.length; j++) {
           // aller voir dans la console pour le "hourly et temp"
           tempPourH[j].innerText=`${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
       }


       //trois premieres lettres du jour  :

       for (let k=0; k<tabJoursEnOrdre.length; k++){
           // on va iterer pour chaque jour du tab, prendre les 3 premieres lettres et les mettres dans la div correspondante
           joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
       }

       //temp par jour : 
       for (let m=0; m<7; m++) {
           tempJoursDiv[m].innerText= `${Math.trunc(resultatsAPI.daily[m+1].temp.day)}°`
       }

       //icone dynamique :
       // pour chaque temps qu'il fait il y a un petit code d'icone. nos icones sont enregistrées avec ce meme code pour correspondre
       // on va recuperer le code icone et on va chercher dans le dossier le svg dont le code icone correspond, puis l'appliquer
       if(heureActuelle >= 6 && heureActuelle <21) {

           // si heure = jour :
           imgIcone.src= `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
       }
       else {
             // si heure = nuit :
            imgIcone.src= `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
       }

       // seulement une fois que tout à bien chargé on add la classe disparition (voir css)
       // qui fait que le loader passe en invisible
       chargementContainer.classList.add('disparition');
    })
}
