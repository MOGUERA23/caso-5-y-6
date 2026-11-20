Funcionamiento. El sistema usa dos vectores paralelos: placas[] guarda la placa de cada auto y horasEntrada[] guarda su hora de entrada. Los dos se llenan juntos, así que la posición i en ambos corresponde al mismo vehículo.

Ingreso: el guardia escribe la placa y la hora de entrada. El programa valida que la placa tenga formato ecuatoriano (3 letras y 3 o 4 números), que la hora sea un entero entre 0 y 24, y que la placa no esté ya dentro del parqueadero. Si todo está bien, push() agrega los datos a los dos vectores.
Salida: el guardia escribe la placa y la hora de salida. Con indexOf() se busca la placa en el vector. Si no existe, o si la hora de salida es menor a la de entrada, se muestra una alerta. Si es válida, se calculan las horas (salida − entrada) y el cobro (horas × $0.75). Luego splice() elimina el auto de ambos vectores en la misma posición.
Pantalla: se muestran los autos estacionados, la cantidad de autos que ya salieron, el detalle de cada cobro y el total cobrado en el día.

Prueba realizada. Ingresé ABC123 a las 9 y XYZ999 a las 10. Al retirar ABC123 a las 12, el sistema calculó 3 horas × $0.75 = $2.25, dejó solo XYZ999 estacionado y el total cobrado quedó en $2.25. También probé una placa con formato incorrecto (“AB12”) y el sistema la rechazó con una alerta.

Caso 6: Registro de calificaciones con estadísticas

Funcionamiento. El sistema usa dos vectores paralelos: nombres[] y notas[]. El docente escribe el nombre y la nota de cada estudiante y presiona “Agregar estudiante”. El programa valida que el nombre no esté vacío y que la nota sea un número entre 0 y 10. Si pasa las validaciones, se guarda en ambos vectores y aparece en la tabla con su estado (Aprobado si la nota es mayor o igual a 7, Reprobado si no).

Al presionar “Calcular estadísticas”, un solo ciclo for recorre el vector notas[] y va acumulando:

la suma de las notas, que dividida entre la cantidad de estudiantes da el promedio,
la nota más alta y su posición, que sirve para sacar el nombre del estudiante en nombres[],
un contador de aprobados, con el que se calcula el porcentaje.

Prueba realizada. Con los datos Ana (9), Luis (6), Marta (8) y José (7), el sistema mostró:

Promedio general: 7.5
Nota más alta: 9 (Ana)
Aprobados: 3/4 = 75%

También probé notas fuera de rango (11 y -1), una nota vacía, un nombre vacío y calcular sin estudiantes registrados. En todos esos casos el sistema mostró una alerta y no guardó nada.
