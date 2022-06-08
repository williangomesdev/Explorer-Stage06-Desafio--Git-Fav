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
    this.update();
  }

  update() {
    this.removeAllTr();
  }

  createRow() {
    /*Criar conteúdo HTML na DOM*/ const tr = document.createElement("tr");
    /*Adicionando conteúdo HTML em uma variável*/ const content = `
    
        <td class="users">
            <img src="https://github.com/williangomesdev.png" alt="imagem github profile"/>
            <a href="https://github.com/williangomesdev" target="_blank">
                <p>Willian Amaro Gomes</p>
                <span>/williangomesdev</span>
            </a>
        </td>
        <td class="repositories">100</td>
        <td class="followers">1000</td>
        <td class="action"><button>Remover</button></td>
    
    `;
    /*Colocando conteúdo dentro do documento*/ tr.innerHTML = content;
    return tr;
  }

  removeAllTr() {
    const tbody = this.root.querySelector("table tbody");
    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
