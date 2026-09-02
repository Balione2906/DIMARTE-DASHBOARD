# Painel do Guincho

Painel web para acompanhar os atendimentos de guincho: carro, placa, local de
retirada/entrega, valor, data e status de pagamento. Atualiza em tempo real —
o que você lança no celular ou notebook aparece na hora para quem estiver
com a página aberta (você e seu pai), em qualquer lugar.

Site estático (HTML/CSS/JS puro, sem build) usando **Firebase** apenas como
banco de dados em tempo real + login. Funciona perfeitamente hospedado no
GitHub Pages.

## Estrutura do projeto

```
guincho-dashboard/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── firebase-config.js   ← você vai colar suas chaves aqui
│   └── app.js
└── README.md
```

## 1. Criar o projeto no Firebase (gratuito)

1. Acesse https://console.firebase.google.com e crie um projeto novo.
2. No menu lateral, abra **Authentication** → aba **Sign-in method** →
   ative **E-mail/senha**.
3. Ainda em Authentication, aba **Users**, clique em **Add user** e crie
   duas contas: uma para você e uma para seu pai (e-mail + senha).
4. No menu lateral, abra **Firestore Database** → **Create database** →
   escolha o modo **produção** e a região mais próxima (ex: `southamerica-east1`).
5. Vá em **Configurações do projeto** (ícone de engrenagem) → role até
   **Seus apps** → clique no ícone `</>` (Web) → dê um nome (ex: "painel") →
   **Registrar app**. O Firebase vai mostrar um objeto `firebaseConfig`.

## 2. Colar as chaves no projeto

Abra `js/firebase-config.js` no VS Code e substitua os valores `"COLE_AQUI"`
pelos dados que o Firebase te deu no passo anterior. Exemplo:

```js
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "meu-guincho.firebaseapp.com",
  projectId: "meu-guincho",
  storageBucket: "meu-guincho.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

Essas chaves **não são segredo** — o Firebase foi desenhado para elas
ficarem visíveis no código do site. Quem protege os dados de verdade são as
**regras do Firestore** do próximo passo (só quem faz login consegue ler ou
escrever).

## 3. Configurar as regras de segurança do Firestore

No console do Firebase, vá em **Firestore Database** → aba **Regras** e
cole:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guinchos/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Isso garante que só quem estiver logado (você e seu pai) pode ver ou
alterar os registros. Clique em **Publicar**.

## 4. Testar localmente no VS Code

Como o site usa `type="module"`, ele precisa ser aberto por um servidor
local (não funciona clicando duas vezes no `index.html`). No VS Code:

1. Instale a extensão **Live Server** (Ritwick Dey).
2. Clique com o botão direito em `index.html` → **Open with Live Server**.
3. Faça login com um dos usuários criados no passo 1 e cadastre um guincho
   de teste.

## 5. Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser público — as chaves do
   Firebase podem ficar públicas, como explicado acima).
2. No terminal, dentro da pasta `guincho-dashboard`:
   ```bash
   git init
   git add .
   git commit -m "Painel do guincho"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages** → em **Source** escolha a branch
   `main` e a pasta `/ (root)` → **Save**.
4. Depois de 1–2 minutos o link aparece na mesma tela, no formato:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`
5. Volte no Firebase, em **Authentication → Settings → Authorized domains**,
   e adicione esse domínio do GitHub Pages (ex:
   `seu-usuario.github.io`), senão o login é bloqueado por segurança.

Pronto: você e seu pai acessam esse link em qualquer navegador, fazem
login e veem o mesmo painel atualizando em tempo real.

## Como usar o painel

- **+ Novo guincho**: abre o formulário para lançar um atendimento manualmente
  (modelo, placa, valor, data, retirada, entrega e se já foi pago).
- **Card**: mostra o valor e a data em destaque, com o modelo e o status ao
  lado. Clicar em qualquer parte do card expande e mostra retirada, entrega
  e as ações.
- **Marcar como pago / pendente**: é o gatilho de pagamento — um clique
  alterna o status, e some/atualiza nos totais de "Pago" e "Pendente" na
  hora, para quem estiver olhando de qualquer lugar.
- **Editar / Excluir**: dentro do card expandido.
- **Filtros** (Todos / Pendentes / Pagos): no topo da lista de cards.

## Personalizar

- Cores e fontes: `css/style.css`, bloco `:root` no topo do arquivo.
- Campos do formulário: `index.html` (seção `#form-guincho`) e
  `js/app.js` (função de salvar, `dados = {...}`).
