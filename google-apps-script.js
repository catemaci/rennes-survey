/**
 * Rennes Quiz — Google Apps Script
 *
 * Come usarlo:
 * 1. Vai su script.google.com → Nuovo progetto
 * 2. Incolla tutto questo codice
 * 3. Cambia SHEET_NAME se vuoi un nome diverso per il foglio
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copia l'URL /exec e mettilo in index.html come SUBMIT_URL
 */

const SHEET_NAME = "Risposte";

// Dimensioni — devono corrispondere a quelle in index.html
const DIMENSIONS = [
  "sex_appeal",
  "parental",
  "anima_festa",
  "prestante",
  "pucciosa",
  "antitetico",
  "teatrale",
  "diplomatico",
  "malizioso",
  "gossipparo",
  "proplayer",
  "eterosessualita",
];

// Persone — devono corrispondere alle chiavi in index.html
const PEOPLE_KEYS = [
  "persona1",
  "persona2",
  "persona3",
  "persona4",
  "persona5",
];

function doPost(e) {
  try {
    const raw = e.parameter.payload;
    if (!raw) return jsonResponse({ ok: false, error: "No payload" });

    const data = JSON.parse(raw);

    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Crea il foglio con intestazioni se non esiste
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      writeHeaders(sheet);
    } else if (sheet.getLastRow() === 0) {
      writeHeaders(sheet);
    }

    // Costruisci la riga
    const row = buildRow(data);
    sheet.appendRow(row);

    return jsonResponse({ ok: true });

  } catch (err) {
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

function doGet(e) {
  return jsonResponse({ ok: true, message: "Rennes Quiz endpoint attivo!" });
}

// ── HELPERS ──────────────────────────────────────────────

function writeHeaders(sheet) {
  const headers = ["sessionId", "startedAt", "completedAt"];

  PEOPLE_KEYS.forEach(personKey => {
    DIMENSIONS.forEach(dim => {
      headers.push(personKey + "__" + dim);
    });
  });

  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function buildRow(data) {
  const row = [
    data.sessionId   || "",
    data.startedAt   || "",
    data.completedAt || "",
  ];

  PEOPLE_KEYS.forEach(personKey => {
    const caseData = data.cases && data.cases[personKey];
    DIMENSIONS.forEach(dim => {
      if (caseData && caseData.sliders && caseData.sliders[dim]) {
        row.push(caseData.sliders[dim].value);
      } else {
        row.push("");
      }
    });
  });

  return row;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
