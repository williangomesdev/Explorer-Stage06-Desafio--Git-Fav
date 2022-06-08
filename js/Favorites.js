// Classe que vai conter a lógica dos dados
// Como os dados serão estruturados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbody = this.root.querySelector("table tbody");
    this.load();
  }

  load() {
    this.entries = [
      {
        login: "williangomesdev",
        name: "Willian Amaro Gomes ",
        public_repos: "100",
        followers: "1000",
      },
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "100",
        followers: "1000",
      },
    ];
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntries;
    this.update();
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

    this.entries.forEach((user) => {
      const row = this.createRow();
      row.querySelector(
        ".users img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".users img").alt = `Imagem de ${user.name}`;
      row.querySelector(".users p").textContent = user.name;
      row.querySelector(".users span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;
      row.querySelector(".action").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar esse usuário?");
        if (isOk) {
          this.delete(user);
        }
      };

      /*receber um elemento HTML criado na DOM*/ this.tbody.append(row);
    });
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
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
