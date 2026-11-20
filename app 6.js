"use strict";

/* ============================================================
   TALLER 02 - Vectores en JavaScript
   Caso 6: Registro de Calificaciones con Estadísticas
   ============================================================ */

/* ---------- Vectores paralelos ----------
   nombres[i] y notas[i] pertenecen al MISMO estudiante.
   Siempre se agregan juntos, así comparten la misma posición. */
const nombres = [];
const notas = [];

const NOTA_MINIMA = 0;
const NOTA_MAXIMA = 10;
const NOTA_APROBACION = 7; // aprueba con nota >= 7

/* ---------- Utilidades ---------- */

function $(id) {
  return document.getElementById(id);
}

// Redondea a 2 decimales y quita ceros sobrantes: 7.50 -> 7.5, 33.333 -> 33.33
function redondear(n) {
  return Number(n.toFixed(2));
}

/* ---------- Registro ---------- */

function agregarEstudiante() {
  const nombre = $("nombreEstudiante").value.trim();
  const textoNota = $("notaEstudiante").value.trim();
  const nota = parseFloat(textoNota);

  // Validación 1: nombre obligatorio
  if (nombre === "") {
    alert("Escribe el nombre del estudiante.");
    return;
  }

  // Validación 2: la nota debe ser un número
  if (textoNota === "" || isNaN(nota)) {
    alert("Escribe una nota numérica.");
    return;
  }

  // Validación 3: la nota debe estar en el rango permitido (0 a 10)
  if (nota < NOTA_MINIMA || nota > NOTA_MAXIMA) {
    alert("La nota debe estar entre " + NOTA_MINIMA + " y " + NOTA_MAXIMA + ".");
    return;
  }

  // Se guarda en los dos vectores, en la misma posición
  nombres.push(nombre);
  notas.push(nota);

  $("nombreEstudiante").value = "";
  $("notaEstudiante").value = "";
  $("nombreEstudiante").focus();

  mostrarEstudiantes();
  limpiarEstadisticas(); // las estadísticas anteriores ya no son válidas
}

// Dibuja la tabla recorriendo los dos vectores con el mismo índice
function mostrarEstudiantes() {
  const tbody = $("tablaEstudiantes");
  tbody.innerHTML = "";

  if (nombres.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.className = "vacio";
    td.textContent = "Todavía no hay estudiantes registrados.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  for (let i = 0; i < nombres.length; i++) {
    const estado = notas[i] >= NOTA_APROBACION ? "Aprobado" : "Reprobado";
    const tr = document.createElement("tr");
    const celdas = [i + 1, nombres[i], notas[i], estado];
    for (const valor of celdas) {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    }
    tr.lastChild.className = estado === "Aprobado" ? "" : "agotado";
    tbody.appendChild(tr);
  }
}

/* ---------- Estadísticas ---------- */

/*
  Un solo recorrido del vector notas[] para obtener:
    - la sumatoria (acumulador) -> promedio
    - la nota más alta y su posición (para saber a quién pertenece)
    - cuántos aprobados hay (contador)
*/
function calcularEstadisticas() {
  if (notas.length === 0) {
    alert("Primero registra al menos un estudiante.");
    return;
  }

  let suma = 0;
  let maxima = notas[0];
  let indiceMax = 0;
  let aprobados = 0;

  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];

    if (notas[i] > maxima) {
      maxima = notas[i];
      indiceMax = i;
    }

    if (notas[i] >= NOTA_APROBACION) {
      aprobados++;
    }
  }

  const total = notas.length;
  const promedio = suma / total;
  const porcentaje = (aprobados / total) * 100;

  // Si hay empate en la nota más alta, se muestran todos los que la tienen
  let duenos = nombres[indiceMax];
  for (let i = indiceMax + 1; i < notas.length; i++) {
    if (notas[i] === maxima) {
      duenos += ", " + nombres[i];
    }
  }

  $("promedio").textContent = redondear(promedio);
  $("notaMax").textContent = maxima + " (" + duenos + ")";
  $("aprobados").textContent = aprobados + "/" + total;
  $("reprobados").textContent = total - aprobados;
  $("porcentaje").textContent = redondear(porcentaje) + "%";
}

function limpiarEstadisticas() {
  for (const id of ["promedio", "notaMax", "aprobados", "reprobados", "porcentaje"]) {
    $(id).textContent = "—";
  }
}

function reiniciar() {
  nombres.length = 0;
  notas.length = 0;
  mostrarEstudiantes();
  limpiarEstadisticas();
}

/* ---------- Eventos y arranque ---------- */

$("btnAgregar").addEventListener("click", agregarEstudiante);
$("btnCalcular").addEventListener("click", calcularEstadisticas);
$("btnReiniciar").addEventListener("click", reiniciar);
$("notaEstudiante").addEventListener("keydown", function (e) {
  if (e.key === "Enter") agregarEstudiante();
});

mostrarEstudiantes();
