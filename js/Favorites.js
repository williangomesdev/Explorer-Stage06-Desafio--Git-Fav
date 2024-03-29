import { GithubUser } from "./GithubUser.js";
// Classe que vai conter a lógica dos dados
// Como os dados serão estruturados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbody = this.root.querySelector("table tbody");
    this.load();
  }

  load() {
    /*JSON.parse = modificar um JSON para um string em um objeto*/
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  /*Salvar usuários no local Storage*/
  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  /*buscar nome do usuário digitado no input*/
  async add(username) {
    try {
      /*Verificando se o usuário que está na pesquisa existe na tabela */
      const userExists = this.entries.find((entry) => entry.login === username);
      if (userExists) {
        throw new Error("Usuário já cadastrado!");
      }

      const user = await GithubUser.search(username);
      if (user.login === undefined) {
        throw new Error("Usuário não encontrado!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}

//Classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.update();
    this.onAdd();
  }

  /*Botão favoritos*/ onAdd() {
    const favButton = document.querySelector(".search button");
    favButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");
      this.add(value);
    };
  }

  emptyMessage() {
    this.entries.length === 0
      ? document.querySelector(".empty").classList.remove("sr-only")
      : document.querySelector(".empty").classList.add("sr-only");
  }

  update() {
    this.removeAllTr();

    this.emptyMessage();

    this.entries.forEach((user) => {
      const row = this.createRow();
      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
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
    
        <td class="user">
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
