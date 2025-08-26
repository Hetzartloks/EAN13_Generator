// Modo oscuro
const darkBtn = document.getElementById('dark-toggle');
const iconSol = document.getElementById('icon-sol');
const iconLuna = document.getElementById('icon-luna');
let darkMode = false;
darkBtn.onclick = function() {
	darkMode = !darkMode;
	if(darkMode) {
		document.documentElement.classList.add('dark-mode');
		iconSol.style.display = 'none';
		iconLuna.style.display = 'inline';
	} else {
		document.documentElement.classList.remove('dark-mode');
		iconSol.style.display = 'inline';
		iconLuna.style.display = 'none';
	}
};

// Limitar el input de cantidad al máximo permitido
const cantidadInput = document.getElementById('cantidad');
const errorDiv = document.getElementById('error-msg');

cantidadInput.addEventListener('input', function() {
	// Sanitizar: solo números enteros positivos
	let valor = cantidadInput.value.replace(/[^0-9]/g, '');
	cantidadInput.value = valor;
	valor = parseInt(valor);
	if (isNaN(valor) || valor < 1) {
		cantidadInput.value = 1;
		errorDiv.textContent = 'Solo se permiten números enteros positivos.';
		errorDiv.style.display = 'block';
		return;
	}
	if (valor > 15) {
		cantidadInput.value = 15;
		errorDiv.textContent = 'El máximo permitido es 15.';
		errorDiv.style.display = 'block';
	} else {
		errorDiv.style.display = 'none';
	}
});

// Ejecutar generación al presionar Enter en el input de cantidad
cantidadInput.addEventListener('keydown', function(e) {
	if (e.key === 'Enter') {
		document.getElementById('generar').click();
	}
});

function mostrarCodigos(codigos) {
	const lista = document.getElementById('ean-list');
	lista.innerHTML = '';
	codigos.forEach((codigo, idx) => {
		// Sanitizar: solo mostrar si es EAN-13 válido (13 dígitos)
		if (!/^[0-9]{13}$/.test(codigo)) return;
		const li = document.createElement('li');
		li.className = 'ean-item';
		const btn = document.createElement('button');
		btn.className = 'copy-btn';
		btn.textContent = 'Copiar';
		btn.onclick = function() {
			// Sanitizar: solo copiar si es EAN-13 válido
			if (/^[0-9]{13}$/.test(codigo)) {
				navigator.clipboard.writeText(codigo);
			}
			btn.textContent = 'Copiado!';
			btn.classList.add('copied');
			setTimeout(() => {
				btn.textContent = 'Copiar';
				btn.classList.remove('copied');
			}, 1500);
		};
		// Usar textContent para evitar inyección
		const span = document.createElement('span');
		span.textContent = codigo;
		li.appendChild(span);
		li.appendChild(btn);
		lista.appendChild(li);
	});
}
let codigosGenerados = [];
document.getElementById('generar').onclick = function() {
	let cantidad = parseInt(cantidadInput.value);
	errorDiv.style.display = 'none';
	if(isNaN(cantidad) || cantidad < 1) return;
	if(cantidad > 15) {
		cantidadInput.value = 15;
		errorDiv.textContent = 'El máximo permitido es 15.';
		errorDiv.style.display = 'block';
		cantidad = 15;
	}
	codigosGenerados = [];
	for(let i=0; i<cantidad; i++) codigosGenerados.push(generarEAN13());
	mostrarCodigos(codigosGenerados);
};
document.getElementById('limpiar').onclick = function() {
	codigosGenerados = [];
	mostrarCodigos(codigosGenerados);
};
// ...existing code...
