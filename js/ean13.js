// Módulo para generar códigos EAN-13
function generarEAN13() {
	let ean = [Math.floor(Math.random()*9)+1];
	for(let i=0; i<11; i++) ean.push(Math.floor(Math.random()*10));
	let odd_sum = 0, even_sum = 0;
	for(let i=0; i<12; i++) {
		if(i%2===0) odd_sum += ean[i];
		else even_sum += ean[i];
	}
	let check_digit = (10 - (odd_sum + 3 * even_sum) % 10) % 10;
	ean.push(check_digit);
	return ean.join('');
}
window.generarEAN13 = generarEAN13;
// ...existing code...
