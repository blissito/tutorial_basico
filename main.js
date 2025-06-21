console.log("Working!! Blissmo");

// Función para calcular ROI personalizado
function calcularROIPersonalizado() {
  // Obtener valores del formulario
  const empleados = parseInt(document.getElementById("empleados")?.value) || 50;
  const salario = parseInt(document.getElementById("salario")?.value) || 25000;
  const horas = parseInt(document.getElementById("horas")?.value) || 10;
  const costosActuales =
    parseInt(document.getElementById("costos-actuales")?.value) || 500000;
  const industria =
    parseFloat(document.getElementById("industria")?.value) || 1.0;

  // Cálculos
  const costoHora = salario / 160; // 160 horas mensuales promedio
  const ahorroTiempo = horas * empleados * costoHora * 52;
  const reduccionCostos = costosActuales * 0.6;
  const ahorroBase = ahorroTiempo + reduccionCostos;
  const ahorroTotal = ahorroBase * industria;
  const inversionPhi4 = 499999;
  const roi = ((ahorroTotal - inversionPhi4) / inversionPhi4) * 100;
  const tiempoRecuperacion = (inversionPhi4 / (ahorroTotal / 12)).toFixed(1);
  const ahorroMensual = (ahorroTotal / 12).toFixed(0);

  // Formatear números
  const formatearNumero = (num) => {
    return new Intl.NumberFormat("es-MX").format(Math.round(num));
  };

  // Actualizar resultados
  const resultadosHTML = `
    <div class="grid grid-cols-1 gap-4">
      <div class="bg-green-100 border-4 border-green-400 p-4 rounded-lg text-center">
        <div class="text-3xl mb-2">💰</div>
        <div class="text-xl font-black text-green-700">Ahorro Anual</div>
        <div class="text-3xl font-black text-green-600">$${formatearNumero(
          ahorroTotal
        )} MXN</div>
      </div>

      <div class="bg-blue-100 border-4 border-blue-400 p-4 rounded-lg text-center">
        <div class="text-3xl mb-2">📈</div>
        <div class="text-xl font-black text-blue-700">ROI</div>
        <div class="text-3xl font-black text-blue-600">${roi.toFixed(0)}%</div>
      </div>

      <div class="bg-purple-100 border-4 border-purple-400 p-4 rounded-lg text-center">
        <div class="text-3xl mb-2">⏱️</div>
        <div class="text-xl font-black text-purple-700">Recuperación</div>
        <div class="text-3xl font-black text-purple-600">${tiempoRecuperacion} meses</div>
      </div>

      <div class="bg-orange-100 border-4 border-orange-400 p-4 rounded-lg text-center">
        <div class="text-3xl mb-2">💵</div>
        <div class="text-xl font-black text-orange-700">Ahorro Mensual</div>
        <div class="text-3xl font-black text-orange-600">$${formatearNumero(
          ahorroMensual
        )} MXN</div>
      </div>

      <div class="bg-[#85ddcb] bg-opacity-20 border-4 border-[#85ddcb] p-4 rounded-lg text-center">
        <div class="text-3xl mb-2">🎯</div>
        <div class="text-xl font-black text-[#85ddcb]">Inversión Phi-4</div>
        <div class="text-3xl font-black text-[#85ddcb]">$${formatearNumero(
          inversionPhi4
        )} MXN</div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 border-4 border-[#85ddcb] rounded-lg text-center">
      <p class="text-lg font-black text-fixter-primary">
        🚀 <strong>¡Tu empresa ahorrará $${formatearNumero(
          ahorroTotal - inversionPhi4
        )} MXN en el primer año!</strong>
      </p>
    </div>
  `;

  const resultadosElement = document.getElementById("resultados-roi");
  if (resultadosElement) {
    resultadosElement.innerHTML = resultadosHTML;

    // Animación de los números
    const numeros = document.querySelectorAll("#resultados-roi .text-3xl");
    numeros.forEach((numero) => {
      numero.style.transform = "scale(1.1)";
      setTimeout(() => {
        numero.style.transform = "scale(1)";
      }, 200);
    });
  }
}

// Inicializar la calculadora cuando se carguen los componentes
function inicializarCalculadoraROI() {
  const inputs = [
    "empleados",
    "salario",
    "horas",
    "costos-actuales",
    "industria",
  ];

  inputs.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", calcularROIPersonalizado);
      element.addEventListener("change", calcularROIPersonalizado);
    }
  });

  // Añadir event listener al botón
  const botonCalcular = document.querySelector(
    'button[onclick="calcularROIPersonalizado()"]'
  );
  if (botonCalcular) {
    botonCalcular.onclick = calcularROIPersonalizado;
  }
}

// Hacer la función global
window.calcularROIPersonalizado = calcularROIPersonalizado;
