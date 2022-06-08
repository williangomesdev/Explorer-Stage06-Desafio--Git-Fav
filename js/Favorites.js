// Classe que vai conter a lógica dos dados
// Como os dados serão estruturados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
  }
}

//Classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    console.log(this.root);
  }
}
