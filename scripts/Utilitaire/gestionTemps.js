// tableau des jours dans l'ordre A PARTIR du jour actuel

const joursSemaine= ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

let ajd = new Date(); // date du jour actuel
let options = {weekday: 'long'}; // option jour entier
let jourActuel= ajd.toLocaleDateString('fr-FR', options); // en francais

//premiere lettre du jour en MAJ + rajoute le reste du mot
jourActuel=jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);


// on va couper le tab de base et retourner un nouveau avec ce qui a été cut (necessite un debut / fin)
// ici on va couper a l'index qui correspond au jour retourné par notre var jourActuel (ex: si on est jeudi, on aura jeudi à dimanche)
// ET on concat une partie du tableau de base allant de l'index 0 à notre jour actuel (ex du lundi au mercredi)
let tabJoursEnOrdre= joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)))

// l'export de type default doit être unique, mais peut etre appelé avec un import n'importe quel nom from './lefichier";
// pas besoin de le link en html vu qu'on l'importe dans le main.js direct
export default tabJoursEnOrdre;