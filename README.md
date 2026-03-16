# Rennes — Un covo di italiani 🇮🇹

Quiz anonimo tra amici per valutare le persone del gruppo su 12 dimensioni.

## Come pubblicare su GitHub Pages

1. Crea un repo su GitHub (es. `rennes-quiz`)
2. Carica tutti i file di questa cartella
3. Vai su **Settings → Pages → Branch: main → Save**
4. Il sito sarà live su `https://TUO_USERNAME.github.io/rennes-quiz/`

## Come personalizzare

### Aggiungere le persone
Modifica l'array `PEOPLE` in `index.html`:
```js
const PEOPLE = [
  { key: "persona1", name: "Marco",  img: "images/marco.jpg" },
  { key: "persona2", name: "Sofia",  img: "images/sofia.jpg" },
  // ...
];
```
Metti le foto nella cartella `images/`.

### Cambiare gli estremi degli slider
Modifica i campi `low` e `high` nell'array `DIMENSIONS` in `index.html`.

### Collegare Google Sheets
1. Apri [script.google.com](https://script.google.com)
2. Crea un nuovo progetto e incolla il contenuto di `google-apps-script.js`
3. Clicca **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copia l'URL `/exec` e incollalo in `index.html` nella variabile `SUBMIT_URL`

## Struttura file
```
rennes-quiz/
├── index.html              # Il quiz completo
├── images/                 # Foto delle persone (crea tu questa cartella)
│   └── .gitkeep
├── google-apps-script.js   # Script da incollare su script.google.com
└── README.md
```
