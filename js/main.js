(function () {
	"use strict";

	var regalo = document.getElementById("regalo");
	document.addEventListener("DOMContentLoaded", function () {
		//mapa
		var map = L.map("mapa").setView([41.667911, 0.599999], 16);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		L.marker([41.667911, 0.599999])
			.addTo(map)
            .bindTooltip('ICG SOFTWARE :) <br> <b> Polígono Industrial de Torrefarrera 25123</b>')
            .openTooltip;

		//CAMPOS DATOS USUARIOS
		var nombre = document.getElementById("nombre");
		var apellido = document.getElementById("apellido");
		var email = document.getElementById("email");
		//CAMPOS PASES
		var pase_dia = document.getElementById("pase_dia");
		var pase_2dias = document.getElementById("pase_2dias");
		var pase_completo = document.getElementById("pase_completo");

		//BOTONES Y DIVS
		var calcular = document.getElementById("calcular");
		var errorDiv = document.getElementById("error");
		var btnRegistro = document.getElementById("btnRegistro");
		var resultado = document.getElementById("lista-productos");
		var suma = document.getElementById("suma-total");

		//EXTRAS
		var etiquetas = document.getElementById("etiquetas");
		var camisas = document.getElementById("camisa_evento");

		//iniciar valores en 0
		pase_dia.value = 0;
		pase_2dias.value = 0;
		pase_completo.value = 0;
		nombre.value = "";
		apellido.value = "";
		email.value = "";

		calcular.addEventListener("click", calcularMontos);

		//mostrar tickets
		pase_dia.addEventListener("blur", mostrarDias);
		pase_2dias.addEventListener("blur", mostrarDias);
		pase_completo.addEventListener("blur", mostrarDias);
		pase_dia.addEventListener("click", mostrarDias);
		pase_2dias.addEventListener("click", mostrarDias);
		pase_completo.addEventListener("click", mostrarDias);

		nombre.addEventListener("blur", validarCampos);
		apellido.addEventListener("blur", validarCampos);
		email.addEventListener("blur", validarCampos);
		email.addEventListener("blur", function () {
			if (
				this.value.indexOf("@") > -1 &&
				this.value.indexOf(".") > -1 &&
				this.value.length > 5
			) {
				errorDiv.style.display = "none";
				this.style.borderColor = "green";
			} else {
				errorDiv.style.display = "block";
				errorDiv.innerHTML =
					'<i class="fas fa-exclamation-triangle"></i> Correo no valido';
				this.style.borderColor = "red";
				errorDiv.style.color = "red";
				errorDiv.style.fontWeight = "1.2em";
			}
		});

		function validarCampos() {
			if (this.value == "") {
				errorDiv.style.display = "block";
				errorDiv.innerHTML =
					'<i class="fas fa-exclamation-triangle"></i> Este campo es obligatorio';
				this.style.borderColor = "red";
				errorDiv.style.color = "red";
				errorDiv.style.fontWeight = "1.2em";
			} else {
				errorDiv.style.display = "none";
				this.style.borderColor = "green";
			}
		}

		function calcularMontos(event) {
			event.preventDefault;
			if (
				pase_dia.value == 0 &&
				pase_2dias.value == 0 &&
				pase_completo.value == 0
			) {
				alert("Debes elegir algun ticket");
			} else if (regalo.value === "") {
				alert("Debes elegir un regalo");
				regalo.focus();
			} else {
				var boletosDia = parseInt(pase_dia.value, 10) || 0,
					boletos2dias = parseInt(pase_2dias.value, 10) || 0,
					boletoCompleto = parseInt(pase_completo.value, 10) || 0,
					cantCamisas = parseInt(camisas.value, 10) || 0,
					cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

				var totalPagar =
					boletosDia * 30 +
					boletos2dias * 45 +
					boletoCompleto * 50 +
					cantCamisas * 10 * 0.93 +
					cantEtiquetas * 2;

				var listadoProductos = [];

				if (boletosDia >= 1)
					listadoProductos.push(boletosDia + " Pases por día");
				if (boletos2dias >= 1)
					listadoProductos.push(boletos2dias + " Pases por 2 días");
				if (boletoCompleto >= 1)
					listadoProductos.push(boletoCompleto + " Pases completos");
				if (cantCamisas >= 1)
					listadoProductos.push(cantCamisas + " camisas");
				if (cantEtiquetas >= 1)
					listadoProductos.push(cantEtiquetas + " etiquetas");

				resultado.style.display = "block";
				resultado.innerHTML = "";
				for (var i = 0; i < listadoProductos.length; i++) {
					resultado.innerHTML += "+ " + listadoProductos[i] + "<br>";
				}

				suma.innerHTML = "$ " + totalPagar.toFixed(2);
			}
		}
		function mostrarDias() {
			var boletosDia = parseInt(pase_dia.value, 10) || 0,
				boletos2dias = parseInt(pase_2dias.value, 10) || 0,
				boletoCompleto = parseInt(pase_completo.value, 10) || 0;

			var diasElegidos = [];

			if (boletosDia > 0) diasElegidos.push("viernes");
			if (boletos2dias > 0) diasElegidos.push("viernes", "sabado");
			if (boletoCompleto > 0)
				diasElegidos.push("viernes", "sabado", "domingo");

			for (var i = 0; i < diasElegidos.length; i++) {
				document.getElementById(diasElegidos[i]).style.display = "block";
			}
		}
	}); //DOM CONTENT LOADED
})();
