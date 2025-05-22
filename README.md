# 🎴 Juju Flashcards - App Desktop com Áudio

> Aplicativo desktop para criação de flashcards com áudio na frente e no verso, usando **Angular** + **Electron**.

---

## 🚀 Começando

Siga o passo a passo para rodar, construir e empacotar seu app.

---

## 🛠️ Ferramentas necessárias

| Ferramenta        | Versão recomendada       | Link para instalação                         |
|-------------------|--------------------------|----------------------------------------------|
| Node.js           | >= 16.x                  | [https://nodejs.org/](https://nodejs.org/)   |
| Angular CLI       | 15.x                     | `npm install -g @angular/cli`                |
| Electron          | 28.x                     | Instalado via `npm install electron`         |
| Electron Builder  | 26.x                     | Instalado via `npm install electron-builder` |

---

## 📥 Instalação

Clone o projeto e instale dependências:

```bash
git clone https://github.com/seuusuario/juju-flashcards.git
cd juju-flashcards/frontend
npm install

🏃‍♂️ Rodando localmente (modo dev)
Para rodar o app localmente: npm start


## 📦 Gerando build para produção

1. Build do Angular: npm run ng-build
2. Empacotando com Electron Builder: npm run electron-build
3. Build completo (Angular + Electron):npm run build-all

📁 Estrutura do projeto

juju-flashcards/
├── frontend/           # Código Angular + Electron
│   ├── src/            # Código fonte Angular
│   ├── dist/frontend/  # Build Angular (gerado)
│   ├── main.js         # Arquivo principal Electron
│   ├── preload.js      # Bridge entre Electron e Angular
│   └── package.json    # Configuração do npm
└── README.md           # Você está aqui :)

🎯 Funcionalidades atuais

Criar cards com texto frente/verso
Gravar áudio para frente e verso
Salvar cards localmente (texto + áudio)
Listar cards salvos
Tocar áudio dos cards

🧰 Scripts disponíveis

| Comando                  | O que faz                            |
| ------------------------ | ------------------------------------ |
| `npm start`              | Build Angular + roda app no Electron |
| `npm run ng-build`       | Só build Angular (produção)          |
| `npm run electron-build` | Empacota app com Electron Builder    |
| `npm run build-all`      | Build Angular + empacotamento juntos |


⚠️ Avisos importantes

Certifique-se de rodar npm run ng-build antes de empacotar.
O app salva os arquivos localmente na pasta do usuário (userData/cards).
Use o modo dev (npm start) para testar sem empacotar.
Electron pode exibir avisos de segurança, normais em dev.
