# Weather Finder 🌤️

![GitHub Repo Size](https://img.shields.io/github/repo-size/laurindolucas/projeto-EngenhariaDeSoftware)
![GitHub last commit](https://img.shields.io/github/last-commit/laurindolucas/projeto-EngenhariaDeSoftware)
![GitHub issues](https://img.shields.io/github/issues/laurindolucas/projeto-EngenhariaDeSoftware)
![GitHub Actions](https://img.shields.io/github/workflow/status/laurindolucas/projeto-EngenhariaDeSoftware/Testes%20Automáticos)

## Descrição do Projeto
O **Weather Finder** é um site de busca de clima que permite ao usuário consultar informações meteorológicas de qualquer cidade ou CEP.  
Exibe temperatura, umidade, chances de chuva e condições gerais do tempo, de forma rápida e prática.

O projeto foi desenvolvido como parte da disciplina de **Engenharia de Software**, utilizando **HTML, CSS e JavaScript**, com funcionalidades de histórico de buscas e favoritos, armazenadas via **LocalStorage**.

---

## Funcionalidades
- Busca por **CEP** ou **nome da cidade**.
- Exibição de informações climáticas:
  - Temperatura
  - Umidade
  - Chances de chuva
  - Condições gerais do tempo
- Adicionar buscas via CEP aos **favoritos**.
- Histórico de buscas armazenado localmente.
- Interface intuitiva e responsiva.

---

## Tecnologias Utilizadas
- **HTML, CSS, JavaScript** – Desenvolvimento front-end.
- **GitHub** – Controle de versão e colaboração.
- **GitHub Actions** – Testes automáticos.
- **API OpenWeather** – Dados meteorológicos.
- **LocalStorage** – Armazenamento de favoritos e histórico.

---
🚀 Como Usar

### Configuração Local

1. **Crie uma conta no OpenWeather**
   - Acesse [OpenWeather](https://openweathermap.org/)
   - Obtenha sua API Key

2. **Configure a API Key**
   - Adicione a chave no arquivo de configuração
   - Ou insira diretamente no código onde é feita a requisição à API

3. **Execute o projeto**
   - Abra `index.html` no seu navegador

### Deploy Online

Você pode acessar o site diretamente através do link de deploy:

**[Acesse o Weather Finder](#)** 
---

## 📁 Estrutura do Projeto
```
weather-finder/
│
├─ github               # Configuração do actions
├─ index.html           # Página principal
├─ style.css            # Estilos do projeto
├─ script.js            # Lógica JavaScript
├─ README.md            # Este arquivo
└─ assets/              # Imagens e ícones utilizados
```

---

## 🤝 Contribuição

Siga os passos abaixo para contribuir com o projeto:

1. **Faça um fork do repositório**

2. **Crie uma branch para sua feature:**
```bash
   git checkout -b minha-feature
```

3. **Faça suas alterações e commit:**
```bash
   git commit -m "Descrição da alteração"
```

4. **Envie para o repositório remoto:**
```bash
   git push origin minha-feature
```

5. **Abra um Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
