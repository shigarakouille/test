// VOTRE NOM A COMPLETER ICI

// ===  variables globales === 

// constantes
const MAX_QTY = 9;
const IndexCat = [
	{
		name : "Peluches",
		data : cata1,
		img : cata1[0].image
	},
		{
		name : "Chaises",
		data : cata2,
		img : cata2[0].image
	}
]

//  tableau des produits à acheter
const cart = []

// total actuel des produits dans le panier
let total = 0;

// Choix initial du catalog
let catalog = IndexCat[0].data;

// === initialisation au chargement de la page ===

/**
* Création du Magasin, mise à jour du total initial
* Mise en place du gestionnaire d'événements sur filter
*/
const ToMenue = function() {
	catalog = [];
	ClearShop();
	const shop = document.getElementById("boutique");

	for (var bdd of IndexCat){
		var item = document.createElement("div");
		item.data = bdd.data
		item.className = "data";
		
		var image = document.createElement("img");
		image.src = bdd.img;
		image.style.height = "80%";
		image.style.width = "auto";
		image.style.marginTop = "5px";
		item.appendChild(image);

		var title = document.createElement("div");
		title.textContent = bdd.name;
		title.style.fontWeight = "bold";
		item.appendChild(title);

		item.addEventListener("click", function (){ClearShop() ; catalog = this.data; LoadShop()})

		shop.appendChild(item);

	};
	
}

const init = function () {
	LoadShop();
	updateTotal();
	const filter = document.getElementById("filter");
	filter.addEventListener("keyup", filterDisplaidProducts);
}


// ==================== fonctions utiles ======================= 

const ClearShop = function () {
	const shop = document.getElementById("boutique");
	shop.innerHTML = "";
}

/**
* Crée et ajoute tous les éléments div.produit à l'élément div#boutique
* selon les objets présents dans la variable 'catalog'
*/
const LoadShop = function () {
	const shop = document.getElementById("boutique");

	const ReturnButton = document.createElement("button");
	ReturnButton.style.width = "7%";
	ReturnButton.style.height = "22px";
	ReturnButton.textContent = "Return"
	ReturnButton.style.backgroundColor = "rgba(255,0,0,0.7)"
	ReturnButton.style.fontWeight =  "Bold";
	ReturnButton.style.borderRadius = "5px"
	ReturnButton.style.marginRight = "95%";
	ReturnButton.addEventListener("click",ToMenue);
	shop.appendChild(ReturnButton);

	for(let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/**
* Crée un élément div.produit qui posséde un id de la forme "i-produit" où l'indice i 
* est correpond au paramètre index
* @param {Object} product - le produit pour lequel l'élément est créé
* @param {number} index - l'indice (nombre entier) du produit dans le catalogue (utilisé pour l'id)
* @return {Element} une div.produit
*/
const createProduct = function (product, index) {
	// créer la div correpondant au produit
	const divProd = document.createElement("div");
	divProd.className = "produit";
	// fixe la valeur de l'id pour cette div
	divProd.id = index + "-product";
	// crée l'élément h4 dans cette div
	divProd.appendChild(createBlock("h4", product.name));
	
	// Ajoute une figure à la div.produit... 
	// /!\ non fonctionnel tant que le code de createFigureBlock n'a pas été modifié /!\ 
	divProd.appendChild(createFigureBlock(product));

	// crée la div.description et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.description, "description"));
	// crée la div.prix et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.price, "prix"));
	// crée la div.controle et l'ajoute à la div.produit
	divProd.appendChild(createOrderControlBlock(index));
	return divProd;
}


/** Crée un nouvel élément avec son contenu et éventuellement une classe
 * @param {string} tag - le type de l'élément créé (example : "p")
 * @param {string} content - le contenu html de l'élément a créé  (example : "bla bla")
 * @param {string} [cssClass] - (optionnel) la valeur de l'attribut 'classe' de l'élément créé
 * @return {Element} élément créé
 */
const createBlock = function (tag, content, cssClass) {
	const element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/** Met à jour le montant total du panier en utilisant la variable globale total
 */
const updateTotal = function () {
	const montant = document.getElementById("montant");
	montant.textContent = total;
}

// ======================= fonctions à compléter =======================


/**
* Crée un élément div.controle pour un objet produit
* @param {number} index - indice du produit considéré
* @return {Element}
* TODO : AJOUTER les gestionnaires d'événements
*/
const createOrderControlBlock = function (index) {
	const control = document.createElement("div");
	control.className = "controle";

	// crée l'élément input permettant de saisir la quantité
	const input = document.createElement("input");
	input.id = index + "-qte";
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	
	input.max = MAX_QTY.toString();

	// TODO :  Q5 mettre en place le gestionnaire d'événément pour input permettant de contrôler les valeurs saisies
	control.appendChild(input);
	input.addEventListener("change", function () {verifQuantity( this,index)});

	// Crée le bouton de commande
	const button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-order";
	button.disabled = true;
	control.appendChild(button);
	button.addEventListener("click",orderProduct);

	return control;
}


/** 
* Crée un élément figure correspondant à un produit
* @param {Object} product -  le produit pour lequel la figure est créée
* @return {Element}
*/
const createFigureBlock = function (product) {
	// TODO : code incorrect : à modifier Q4 
	const result = document.createElement("figure");
	const image = document.createElement("img");
	image.src =  product.image;
	result.appendChild(image)
	return result;
}


/** 
* @todo Q8
*/

const orderProduct = function () {
	const idx = parseInt(this.id);
	const Elqty = document.getElementById(idx + "-qte");
	if (Elqty.value > 0) {
		addProductToCart(idx, Elqty.value); // ajoute un produit au panier
		Elqty.value = 0;
		const CommandButton = document.getElementById(idx + "-order");
		CommandButton.style.opacity = "0.25";
		CommandButton.disabled = true;
	}
}


// ======================= fonctions à coder =======================

/**
* @todo Q6- Q7
*/
const verifQuantity = function (ThisElt,index) {

	var IndCat = null;

	for (var i = 0; i<IndexCat.length;i++){
		if (IndexCat[i].data == catalog){
			IndCat = i
		}
	}
	
	const eltInPanier = document.getElementById(String(index) + "-achat"  + " " + String(IndCat));
	if (eltInPanier != null){
		var PanierQty = Number(eltInPanier.querySelector(".quantite").textContent);
		var max = catalog[index].qty - PanierQty;
	}
	else{
		var max = catalog[index].qty;
	}
	if (ThisElt.value > max){
		ThisElt.value = max;
	}
	if (ThisElt.value == max){
		ThisElt.max = max;
	}

	const CommandeButton = document.querySelector("div[id='" + String(index) + "-product'] .commander");

	if (ThisElt.value != 0){
		 	CommandeButton.style.opacity = "1";
		CommandeButton.disabled = false;
	}
	else{
		CommandeButton.style.opacity = "0.25";
		CommandeButton.disabled = true;
	}
};

const removeProductFromCart = function () {
	const ProdAchat = this.parentElement.parentElement;
	const qty = parseInt(this.parentElement.parentElement.getElementsByClassName("quantite")[0].textContent);
	const price = parseInt(this.parentElement.parentElement.getElementsByClassName("prix")[0].textContent);
	const total = document.getElementById("montant");
	total.textContent = String(parseInt(total.textContent) - (qty * price));
	ProdAchat.remove();
}

/**
* @todo Q9
* @param {number} index
* @param {number} qty
*/
const addProductToCart = function (index, qty) {
	const achats = document.querySelector("div#panier>div.achats");
	var IndCat = null;

	for (var i = 0; i<IndexCat.length;i++){
		if (IndexCat[i].data == catalog){
			IndCat = i
		}
	}

	
	const verif = document.getElementById(String(index) + "-achat" + " " + String(IndCat));

	if (verif == null){
		/* créer l'objet */
		const achat = document.createElement("div");
		achat.id = String(index) + "-achat" + " " + String(IndCat);
		achat.className = "achat" ;

		/* ajoute l'image */
		const figure = document.createElement("figure");
		const image = document.createElement("img");
		image.src = catalog[index].image;
		achat.appendChild(figure);
		figure.appendChild(image);

		/* ajoute la description */
		const desc = document.createElement("h4");
		desc.textContent = catalog[index].description;
		achat.appendChild(desc);

		/* ajoute la quantite*/ 
		const quantite = document.createElement("div");
		quantite.className = "quantite";
		quantite.textContent = qty;
		achat.appendChild(quantite);

		/* ajoute le prix*/ 
		const prix = document.createElement("div");
		prix.className = "prix";
		prix.textContent = catalog[index].price;
		achat.appendChild(prix);
		
		/* ajoute le bouton suppr*/
		const control = document.createElement("div");
		const suppress = document.createElement("button")
		control.className = "controle";
		suppress.id = String(index) + "-remove";
		suppress.className = "retirer";
		suppress.addEventListener("click",removeProductFromCart);
		control.appendChild(suppress);
		achat.appendChild(control);

		achats.appendChild(achat);
		}
	
	else {
		verif.getElementsByClassName("quantite")[0].textContent = String(parseInt(verif.getElementsByClassName("quantite")[0].textContent) + parseInt(qty));
	}

	const tot = document.getElementById("montant");
	var somme = 0;
	for (var elt of achats.children){
		somme += (parseInt(elt.getElementsByClassName("quantite")[0].textContent) * parseInt(elt.getElementsByClassName("prix")[0].textContent));
	}
	tot.textContent = String(somme);
} 




/**
* @todo Q10
*/
const filterDisplaidProducts = function () {
	const boutique = document.querySelector("div#boutique");
	const search = this.value.toLowerCase();

	for (var elt of boutique.children){
		// on ne filtre que les div.produit
		if (elt.classList.contains("produit")) {
			const idx = parseInt(elt.id.split("-")[0]); // extrait l'indice
			const name = catalog[idx].name.toLowerCase();

			if (!name.includes(search)){
				elt.style.display = "none";
			} else {
				elt.style.display = "";
			}
		}
	}
}


// ====================  Exécuter l'initialisation ======================= 
/*Q1*/
console.log(document.readyState); // Vérification du chargement du DOM 
//("loading" not OK; "interactive" ou "loaded": OK)
window.onload = function () {
	init()
};
