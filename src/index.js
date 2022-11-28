import Chart from 'chart.js/auto';

//La lluvia debe ser bien distribuida, con un mínimo de 1,200 mm anual.
//Para el abono, primero se aplica 1 oz de abono a los 60 dias de sembrado
//Luego se aplican 2 oz de abono cada 6 meses o 180 dias despues de la primera aplicacion de abono hasta el final de la cosecha
//Periodo de germinacion de las semillas de cacao: Las semillas de cacao suelen dar frutos en un periodo de 2 veces al año o 1 vez al año
//El porcentaje de perdida como maximo que tienen las semillas de cacao es de un 4%, esta es una de las plantas que menos perdidas tiene
//El terreno en el cual se basara el programa es de 4 tareas lo que equivale a 2,515.44 m2
//Una mata de cacao ocupa aproximadamente un espacio de 3x3 m2 entre hileras, lo que nos equivale a un total de 279 matas de cacao como maximo en la plantacion
//Las plantaciones de cacao no necesitan regado de agua, solo se necesita que el terreno este bien drenado y que tenga un buen suelo
//La unica agua que ven estas matas es la que cae de la lluvia
//Datos en tiempo real: terreno sembrado, porcentaje de terreno con abono, porcentaje de semillas recuperadas, porcentaje de perdida, cantidad de semillas recuperadas, cantidad de semillas sembradas, cantidad de agua caida, cantidad de abono aplicado
//Datos al finalizar: Total de cosecha, total de agua caida, total de terreno sembrado, total de abono utilizado


//Constantes para calculos
//Las areas estan en metros cuadrados
const areaTareas = 2515.44;
const areaMata = 9;
//La cantidad de abono estan en onzas
const primerAbono = 1;
const abonosRestantes = 2;

//Variables de control
//La cantidad de lluvia que debe caer en un año esta en mm
var cantidadLluvia = 0;
var terrenoSembrado = 0;
var terrenoPorcentaje = 0;
var terrenoAbonado = 0;
var semillasSembradas = 0;
var semillasRecuperadas = 0;
var cantidadSemillasRecuperadas = 0;
var aguaUtilizada = 0;

//Totalas para imprimir al final
var totalCosecha = 0;
var totalAguaUtilizada = 0;
var totalTerrenoUtilizado = 0;
var totalAbonoUtilizado = 0;

//Funcion que genera semillas de manera aleatoria en un rango de 1 a 279
function generarSemillas() {
    var semillas = 279;
    return semillas;
}

//Funcion que determina el espacio que ocuparan las semillas generadas
function calcularTerreno(semillas) {
    var terreno = semillas * areaMata;
    return terreno;
}

//Funcion que determina el porcentaje de terreno que ocuparan las semillas generadas
function calcularPorcentajeTerreno(terreno) {
    terrenoPorcentaje = (terreno * 100) / areaTareas;
    return terrenoPorcentaje;
}

//Funcion que genera la cantidad de abono que se aplicara a las semillas generadas por primera vez
function calcularAbono(semillas) {
    var abono = semillas * primerAbono;
    return abono;
}

//Funcion que genera la cantidad de abono que se aplicara a las semillas hasta el final de la cosecha
function calcularAbonoRestante(semillas) {
    var abono = semillas * abonosRestantes;
    return abono;
}

//Funcion que determina que porcentaje de la cosecha se perdio en un rango de 0 a 4%
function calcularPerdida() {
    var perdida = Math.floor(Math.random() * 4);
    return perdida;
}

//Funcion que suma 600mm de lluvia a la cantidad de lluvia que ya habia caido
function calcularLluvia() {
    cantidadLluvia += 150;
    return cantidadLluvia;
}

//Funcion que determina la cantidad de semillas que se recuperan de la perdida con el tratamiento de abono
function calcularRecuperacion(perdida) {
    var recuperadas = Math.floor(Math.random() * perdida);
    //var recuperacion = semillas - (semillas * perdida) / 100;
    return recuperadas;
}

//Funcion que calcula la cantidad de semillas que se recuperan de la perdida con el tratamiento de abono
function calcularSemillasRecuperadas(semillas, recuperadas) {
    var semillasRecuperadas = semillas - recuperadas;
    return semillasRecuperadas;
}

//Funcion que realiza una grafica con los datos que hay que mostrar en tiempo real
function graficar() {
    var myChart = new Chart(document.getElementById('myChart'), {
        type: 'line',
        data: {
            labels: ['Terreno sembrado', 'Terreno abonado', 'Semillas recuperadas', 'Semillas sembradas', 'Agua utilizada', 'Abono utilizado'],
            datasets: [{    
                label: 'Datos en tiempo real',
                data: [terrenoSembrado, terrenoAbonado, cantidadSemillasRecuperadas, semillasSembradas, aguaUtilizada, totalAbonoUtilizado],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'logarithmic',
                }
            }
        }
    });
    return myChart;
}

//Funcion que realiza una grafica con los datos que hay que mostrar al finalizar
function graficarFinal() {
    var finalChart = new Chart(document.getElementById('finalChart'), {
        type: 'line',
        data: {
            labels: ['Total cosecha', 'Total agua utilizada', 'Total terreno utilizado', 'Total abono utilizado'],
            datasets: [{
                label: 'Datos al finalizar',
                data: [totalCosecha + "", totalAguaUtilizada, totalTerrenoUtilizado, totalAbonoUtilizado],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
    return finalChart;
}

//Funcion que realiza la simulacion del programa por 10 años
//Cada mes equivale a 3 segundos
//La funcion controlara el tiempo con un hilo de ejecucion
function simulacion() {
    var contador = 0;
    var contadorMeses = 1;
    document.getElementById("year").innerHTML = "Año: " + contador;
    document.getElementById("month").innerHTML = "Mes: "+ contadorMeses;
    //Se generan las semillas
    semillasSembradas = generarSemillas();
    //Se calcula el porcentaje de perdida de las semillas
    var perdida = calcularPerdida();
    //Se calcula el porcentaje de semillas que se recuperan de la perdida
    semillasRecuperadas = calcularRecuperacion(perdida);
    //Se calcula la cantidad de semillas que se recuperan de la perdida
    cantidadSemillasRecuperadas = calcularSemillasRecuperadas(semillasSembradas, semillasRecuperadas);
    //Se calcula el terreno que ocuparan las semillas
    terrenoSembrado = calcularTerreno(semillasSembradas);
    //Se calcula el porcentaje de terreno que ocuparan las semillas
    terrenoPorcentaje = calcularPorcentajeTerreno(terrenoSembrado);
    var myChart = graficar();
    var hilo = setInterval(function () {
        //El primer abono se aplica el segundo mes despues de sembrar las semillas
        if (contadorMeses == 2) {
            //Se calcula la cantidad de abono que se aplicara a las semillas
            terrenoAbonado = calcularAbono(semillasSembradas);
        }
        //Los abonos restantes se aplican cada 6 meses despues de la primera aplicacion de abono
        //En este caso hipotetico supongamos que le llueve cada 6 meses
        if (contadorMeses % 6 == 0) {
            //Se calcula la cantidad de abono que se aplicara a las semillas
            terrenoAbonado = calcularAbonoRestante(semillasSembradas);
            //Se calcula la cantidad de lluvia que cae cada seis meses
            cantidadLluvia = calcularLluvia();
        }
        //Se calcula la cantidad de agua que le llovio a todas las matas de cacao
        aguaUtilizada = cantidadLluvia * semillasSembradas;
        //Se calcula el total de agua utilizada
        totalAguaUtilizada += aguaUtilizada;
        //Se calcula el total de terreno utilizado
        totalTerrenoUtilizado += terrenoSembrado;
        //Se calcula el total de abono utilizado
        totalAbonoUtilizado += terrenoAbonado;
        //Create an array with the data to be updated in the chart
        var data = [terrenoSembrado, terrenoAbonado, cantidadSemillasRecuperadas, semillasSembradas, aguaUtilizada, totalAbonoUtilizado];
        //Recreate the labels array
        var labels = ['Terreno sembrado', 'Terreno abonado', 'Semillas recuperadas', 'Semillas sembradas', 'Agua utilizada', 'Abono utilizado'];
        //Se actualizan los datos de la grafica que cambiaron
        myChart.data.datasets.forEach((dataset) => {
            dataset.data = data;
        });
        myChart.data.labels = labels;
        myChart.update();
        
        //Se imprime la informacion de cada año
        console.log("Año: " + contador);
        console.log("Mes: " + contadorMeses);
        console.log("Cantidad de terreno sembrado: " + terrenoSembrado.toFixed(2) + " m2");
        console.log("Porcentaje de terreno abonado: " + terrenoPorcentaje.toFixed(2) + " %");
        console.log("Porcentaje de semillas dañadas: " + perdida.toFixed(2) + " %");
        console.log("Porcentaje de semillas recuperadas: " + semillasRecuperadas + " %");
        console.log("Cantidad de semillas recuperadas: " + cantidadSemillasRecuperadas);
        console.log("Cantidad de semillas sembradas: " + semillasSembradas.toFixed(0));
        console.log("Cantidad de lluvia que cayo: " + cantidadLluvia + " mm");
        console.log("Cantidad de agua utilizada: " + aguaUtilizada + " mm");
        console.log("--------------------------------------------------");
        //Se aumenta el contador de meses
        contadorMeses++;
        //Se aumenta el contador de años cada 12 meses
        //Se realiza una cosecha cada año
        if (contadorMeses % 12 == 0) {
            contador++;
            //Se calcula la cantidad de cosecha que se obtiene
            var cosecha = semillasSembradas * 2;
            //Se calcula el total de cosecha
            totalCosecha += cosecha;
            console.log("Cantidad de cosecha obtenida: " + cosecha + "kg");
        }
        //Se detiene el hilo de ejecucion cuando se llega a 10 años
        if (contador == 2) {
            clearInterval(hilo);
            var finalChart = graficarFinal();
            //Create an array with the data to be updated in the chart
            //Se imprime la informacion total de los 10 años
            console.log("Total de cosecha obtenida: " + totalCosecha + " kg");
            console.log("Total de agua utilizada: " + totalAguaUtilizada + " mm");
            console.log("Total de abono utilizado: " + totalAbonoUtilizado + " kg");
            console.log("Total de terreno utilizado: " + totalTerrenoUtilizado + " %");
        }
        document.getElementById("year").innerHTML = "Año: " + contador;
        document.getElementById("month").innerHTML = "Mes: "+ contadorMeses;
    }, 3000);
}

simulacion();
