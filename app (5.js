"use strict";

/* ============================================================
   TALLER 02 - Vectores en JavaScript
   Caso 5: Control de Parqueadero con Cobro por Hora
   ============================================================ */

/* ---------- Utilidades ---------- */

function $(id) {
  return document.getElementById(id);
}

function dinero(n) {
  return "$" + n.toFixed(2);
}

// Agrega una fila <tr> a un <tbody> con las celdas indicadas.
// Usa textContent para no inyectar HTML.
function agregarFila(tbody, celdas, clase) {
  const tr = document.createElement("tr");
  for (const valor of celdas) {
    const td = document.createElement("td");
    td.textContent = valor;
    if (clase) td.className = clase;
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

// Fila de "sin datos" que ocupa todas las columnas
function filaVacia(tbody, columnas, texto) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  td.colSpan = columnas;
  td.className = "vacio";
  td.textContent = texto;
  tr.appendChild(td);
  tbody.appendChild(tr);
}

// Muestra un mensaje en una caja de estado (tipo: "ok" o "error")
function mensaje(id, texto, tipo) {
  const caja = $(id);
  caja.textContent = texto;
  caja.className = "msg " + (tipo || "");
}

/* ============================================================
   CASO 5: PARQUEADERO
   ============================================================ */

const TARIFA = 0.75; // dólares por hora

// Vectores paralelos: placas[i] entró a la hora horasEntrada[i]
const placas = [];
const horasEntrada = [];

// Registro de lo cobrado en el día
let totalCobrado = 0;
const cobros = []; // cada elemento: { placa, horas, cobro }

// Placas de Ecuador: 3 letras + 3 o 4 números (ABC123 / ABC1234)
const FORMATO_PLACA = /^[A-Z]{3}[0-9]{3,4}$/;

// Verifica que la hora sea un entero entre 0 y 24
function horaValida(h) {
  return !isNaN(h) && Number.isInteger(h) && h >= 0 && h <= 24;
}

function ingresarVehiculo() {
  const placa = $("placaIngreso").value.trim().toUpperCase();
  const hora = parseFloat($("horaEntrada").value);

  if (!FORMATO_PLACA.test(placa)) {
    alert("Placa inválida. Usa 3 letras y 3 o 4 números, por ejemplo ABC123.");
    return;
  }
  if (!horaValida(hora)) {
    alert("La hora de entrada debe ser un número entero entre 0 y 24.");
    return;
  }
  // indexOf devuelve -1 si no está; si es distinto de -1 ya existe
  if (placas.indexOf(placa) !== -1) {
    alert("La placa " + placa + " ya está dentro del parqueadero.");
    return;
  }

  placas.push(placa);
  horasEntrada.push(hora);
  mensaje("msgParqueo", "Ingresó " + placa + " a las " + hora + ":00.", "ok");
  $("placaIngreso").value = "";
  $("horaEntrada").value = "";
  $("placaIngreso").focus();
  mostrarParqueadero();
}

function retirarVehiculo() {
  const placa = $("placaSalida").value.trim().toUpperCase();
  const horaSalida = parseFloat($("horaSalida").value);

  if (placa === "") {
    alert("Escribe la placa del vehículo que sale.");
    return;
  }
  if (!horaValida(horaSalida)) {
    alert("La hora de salida debe ser un número entero entre 0 y 24.");
    return;
  }

  // Búsqueda por índice
  const i = placas.indexOf(placa);
  if (i === -1) {
    alert("La placa " + placa + " no está registrada en el parqueadero.");
    return;
  }

  // La salida no puede ser antes de la entrada
  if (horaSalida < horasEntrada[i]) {
    alert("La hora de salida (" + horaSalida + ") es menor que la de entrada (" + horasEntrada[i] + ").");
    return;
  }

  // Cobro = diferencia de horas x tarifa
  const horas = horaSalida - horasEntrada[i];
  const cobro = horas * TARIFA;

  totalCobrado += cobro;
  cobros.push({ placa: placa, horas: horas, cobro: cobro });

  // Se elimina el auto de AMBOS vectores en la misma posición
  placas.splice(i, 1);
  horasEntrada.splice(i, 1);

  mensaje("msgParqueo", placa + ": " + horas + " h x " + dinero(TARIFA) + " = " + dinero(cobro), "ok");
  $("placaSalida").value = "";
  $("horaSalida").value = "";
  mostrarParqueadero();
}

function mostrarParqueadero() {
  // Autos estacionados (se recorren los dos vectores con el mismo índice)
  const tbEst = $("tablaEstacionados");
  tbEst.innerHTML = "";
  if (placas.length === 0) {
    filaVacia(tbEst, 2, "No hay autos estacionados.");
  }
  for (let i = 0; i < placas.length; i++) {
    agregarFila(tbEst, [placas[i], horasEntrada[i] + ":00"]);
  }

  // Cobros del día
  const tbCob = $("tablaCobros");
  tbCob.innerHTML = "";
  if (cobros.length === 0) {
    filaVacia(tbCob, 3, "Todavía no hay cobros.");
  }
  for (const c of cobros) {
    agregarFila(tbCob, [c.placa, c.horas, dinero(c.cobro)]);
  }

  $("cantEstacionados").textContent = placas.length;
  $("cantSalieron").textContent = cobros.length;
  $("totalCobrado").textContent = dinero(totalCobrado);
}

function reiniciarParqueadero() {
  placas.length = 0;
  horasEntrada.length = 0;
  cobros.length = 0;
  totalCobrado = 0;
  mensaje("msgParqueo", "Tarifa: " + dinero(TARIFA) + " por hora.", "");
  mostrarParqueadero();
}

/* ============================================================
   EVENTOS Y ARRANQUE
   ============================================================ */

$("btnIngreso").addEventListener("click", ingresarVehiculo);
$("btnSalida").addEventListener("click", retirarVehiculo);
$("btnReiniciarParqueo").addEventListener("click", reiniciarParqueadero);

// Estado inicial
mostrarParqueadero();
