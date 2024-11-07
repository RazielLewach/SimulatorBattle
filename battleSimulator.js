if (document.getElementById("battleSimulatorPopup") == null) {
	// Todo el HTML y el CSS.
	var tiposInterval = null;
	document.getElementById("wrap").insertAdjacentHTML("afterend",`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><div id="battleSimulatorPopup" style="position:absolute; width:400px; font-weight:bold; font-size:12px; z-index: 999999; background-image:url('https://i.imgur.com/ph8xoAJ.png'); background-repeat: repeat;" class="colorsYsiel">
		<div style="display: flex; justify-content: flex-end;"><button id="btClose" class="colorsYsiel">X</button></div>
		<div style="display: flex; justify-content: center;"><div class="textShadow">Simulador de batallas y comparador de tipos.</div></div>
		
		<div style="margin: 5px; display: flex; flex-wrap: wrap">
			`+getPokemonLayout(true, false)+`
			<div class="divVS textShadow" title="¡VERSUS!">VS</div>
			`+getPokemonLayout(false, true)+`
		</div>
		
		<div class="divBattleTitle"><div class="textShadow">Dados de combate</div></div>
		<div style="margin: 5px;" id="tbDamages" style="display: flex;"></div>
		
		<div style="display: flex; justify-content: center;">
			<button id="btDeleteTurn" class="colorsYsiel" style="margin: 5px; padding: 2px;">Borrar turno</button>
			<button id="btNewTurn" class="colorsYsiel" style="margin: 5px; padding: 2px;">Añadir turno</button>
		</div>
	</div>
	<style>
		:root {
		  --ns: -2px;  
		}
		.divBattleTitle {
			display: flex;
			justify-content: center;
			flex-basis: 100%;
		}
		.textShadow {
			color: #FFFFFF;
			text-shadow: var(--ns) 0 0 black, 0 2px black, 2px 0 black, 0 var(--ns) black, var(--ns) var(--ns) black, 2px 2px black, var(--ns) 2px black, 2px var(--ns) black;
		}
		.divVS {
			flex-basis: 4%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.divLeyendaDamage {
			flex-basis: 25%;
			padding-left: 5px;
			white-space: break-spaces;
		}
		.divPokeResult {
			flex-basis: 60%;
			white-space: nowrap;
			margin-right: 10px;
		}
		.divPVResult {
			flex-basis: 10%;
			margin-left: 10px;
		}
		.pressed {
			border: 2px solid var(--ddtext) !important;
		}
		.buttonBonus {
			margin: 2px;
			padding: 0px;
			border: 2px solid rgba(0,0,0,0);
		}
		.colorsYsiel {
			background-color: var(--whex);
			color: var(--ddtext);
			border: 2px solid var(--ddtext);
		}
		.colorsYsielNoBorder {
			background-color: var(--whex);
			color: var(--ddtext);
		}
		.dropdown {
			height: 20px;
			width: 80px;
			border: 2px solid #FFFFFF;
			padding: 0px;
		}
		.type {
			padding: 1px;
			margin: 2px;
		}
		
		/*Los colores de los tipos.*/
		.Null {background-color:#000000; color:#000000;}
		.Steel {background-color:#AFACBB; color:#000000;}
		.Water {background-color:#319CFE; color:#000000;}
		.Bug {background-color:#A7B535; color:#000000;}
		.Dragon {background-color:#7B68E0; color:#000000;}
		.Electric {background-color:#FDE07A; color:#000000;}
		.Ghost {background-color:#6F6A99; color:#FFFFFF;}
		.Fire {background-color:#FF4422; color:#000000;}
		.Fairy {background-color:#F3AFEF; color:#000000;}
		.Ice {background-color:#82DDF9; color:#000000;}
		.Fighting {background-color:#B9594E; color:#FFFFFF;}
		.Normal {background-color:#BAB9AC; color:#000000;}
		.Grass {background-color:#7BCC56; color:#000000;}
		.Psychic {background-color:#E16591; color:#000000;}
		.Rock {background-color:#BCAA65; color:#000000;}
		.Dark {background-color:#695749; color:#FFFFFF;}
		.Ground {background-color:#DCBB52; color:#000000;}
		.Poison {background-color:#AA5E9C; color:#000000;}
		.Flying {background-color:#6B9BED; color:#000000;}
	</style>
	`);

	// El bucle principal.
	tiposInterval = setInterval(() => {
		var _left = 20+window.scrollX;
		var _top = 20+window.scrollY;
		$("#battleSimulatorPopup").css({left: _left, top: _top});
	},10);
	
	// Listeners.
	$(".dropdown").change(function() {
		$(this).removeClass();
		$(this).addClass("dropdown");
		$(this).addClass($(this).val());
		updateAllInfo();
	});
	$(".inPV").change(function() {
		updateAllInfo();
	});
	$(".buttonBonus").click(function() {
		var _isPressed = $(this).hasClass("pressed");
		$(this).removeClass();
		$(this).addClass("buttonBonus");
		if (!_isPressed) $(this).addClass("pressed");
		updateAllInfo();
	});
	$("#btClose").click(function() {
		clearInterval(tiposInterval);
		document.getElementById("battleSimulatorPopup").remove();
	});
	$("#btNewTurn").click(function() {
		// Añade la fila.
		var _table = document.getElementById("tbDamages");
		var _div = document.createElement("div");
		_div.style.cssText = "flex-basis: 100%; display: flex; margin-bottom: 8px;";
		var _iRow = _table.childElementCount;
		addTurnDiceCell(_div, String(_iRow)+"L", "de tu Poké");
		_div.innerHTML += `<div style="flex-basis: 4%; display: flex; flex-direction: column;"></div>`;
		addTurnDiceCell(_div, String(_iRow)+"R", "del Poké rival");
		
		// Añade la fila al DOM.
		_table.appendChild(_div);
		
		// Añade los listeners.
		addListenerDiceCell(String(_iRow)+"L");
		addListenerDiceCell(String(_iRow)+"R");
		
		// Actualiza valores.
		updateAllInfo();
	});
	$("#btDeleteTurn").click(function() {
		$("#tbDamages").children().last().remove();
		updateAllInfo();
	});
		
	// Añade un dropdown de tipos.
	function getDropdownTypes() {
		return `
			<option class="Null" value="Null"></option>
			<option class="Steel" value="Steel">Acero</option>
			<option class="Water" value="Water">Agua</option>
			<option class="Bug" value="Bug">Bicho</option>
			<option class="Dragon" value="Dragon">Dragón</option>
			<option class="Electric" value="Electric">Eléctrico</option>
			<option class="Ghost" value="Ghost">Fantasma</option>
			<option class="Fire" value="Fire">Fuego</option>
			<option class="Fairy" value="Fairy">Hada</option>
			<option class="Ice" value="Ice">Hielo</option>
			<option class="Fighting" value="Fighting">Lucha</option>
			<option class="Normal" value="Normal">Normal</option>
			<option class="Grass" value="Grass">Planta</option>
			<option class="Psychic" value="Psychic">Psíquico</option>
			<option class="Rock" value="Rock">Roca</option>
			<option class="Dark" value="Dark">Siniestro</option>
			<option class="Ground" value="Ground">Tierra</option>
			<option class="Poison" value="Poison">Veneno</option>
			<option class="Flying" value="Flying">Volador</option>
		`;
	}
	
	// Actualiza los PV finales.
	function updateAllInfo() {
		updateDamageCase(true);
		updateDamageCase(false);
	}
	
	// Actualiza los PV finales de un caso concreto.
	function updateDamageCase(_isYou) {
		var _iSelf = _isYou ? 0 : 3;
		var _iOther = _isYou ? 3 : 0;
		var _sufix = _isYou ? "You" : "Rival";
		var _pv = parseInt($("#inPV"+_sufix).val());
		$('#tbDamages').children().each(function () { // Iteramos cada turno...
			var _dmg = parseInt($($($(this).children()[_iOther]).children()[0])[0].dataset.value);
			_pv = String(Math.max(_pv-_dmg, 0));
			$($($($(this).children()[_iSelf]).children()[1]).children()[3]).html(_pv);
		});
	}
	
	// Añade una celda de un dado y sus botones a un turno.
	function addTurnDiceCell(_div, _sufix, _strWho) {
		_div.innerHTML += `
			<div class="colorsYsiel" style="background-position: 0 138%; flex-basis: 24%; display: flex; flex-direction: column; background-image: url(https://i.servimg.com/u/f29/19/71/18/28/0010.jpg); background-size: 100%;">
				<div id="imDamage`+_sufix+`" data-value="00" title="El dado de combate `+_strWho+`" style=" flex-basis: 100%; min-height: 25px;"></div>
				<div style="flex-basis: 100%; display: flex;">
					<button class="colorsYsiel btModifyDamage" id="btSubDamage`+_sufix+`" title="Reduce el valor del dado de combate `+_strWho+`" style="flex-basis: 25%;">-</button>
					<button class="colorsYsiel btModifyDamage" id="btAddDamage`+_sufix+`" title="Aumenta el valor del dado de combate `+_strWho+`" style="flex-basis: 25%;">+</button>
					<div class="colorsYsielNoBorder" title="Tras este turno, los PV `+_strWho+`" style="flex-basis: 25%; padding-left: 2px;">PV = </div>
					<div class="colorsYsielNoBorder" id="dvPVNext`+_sufix+`" title="Tras este turno, los PV `+_strWho+`" style="flex-basis: 25%;"></div>
				</div>
			</div>
			<div class="colorsYsiel" style="flex-basis: 24%; display: flex; flex-direction: column;">
				AAA
			</div>
		`;
	}
	
	// Añade los listeners a los botones del dado de daño.
	function addListenerDiceCell(_sufix) {
		$("#btSubDamage"+_sufix).click(function() {
			var _idImg = "#imDamage"+_sufix;
			var _val = $(_idImg)[0].dataset.value;
			if (_val == "05") $(_idImg)[0].dataset.value = "00";
			else if (_val == "10") $(_idImg)[0].dataset.value = "05";
			else if (_val == "15") $(_idImg)[0].dataset.value = "10";
			else if (_val == "20") $(_idImg)[0].dataset.value = "15";
			else if (_val == "25") $(_idImg)[0].dataset.value = "20";
			else if (_val == "9999") $(_idImg)[0].dataset.value = "25";
			setDamageDiceSrc($(_idImg)[0].parentElement, $(_idImg)[0].dataset.value);
			updateAllInfo();
		});
		$("#btAddDamage"+_sufix).click(function() {
			var _idImg = "#imDamage"+_sufix;
			var _val = $(_idImg)[0].dataset.value;
			if (_val == "00") $(_idImg)[0].dataset.value = "05";
			else if (_val == "05") $(_idImg)[0].dataset.value = "10";
			else if (_val == "10") $(_idImg)[0].dataset.value = "15";
			else if (_val == "15") $(_idImg)[0].dataset.value = "20";
			else if (_val == "20") $(_idImg)[0].dataset.value = "25";
			else if (_val == "25") $(_idImg)[0].dataset.value = "9999";
			setDamageDiceSrc($(_idImg)[0].parentElement, $(_idImg)[0].dataset.value);
			updateAllInfo();
		});
	}
	
	// Modifica el sprite de un dado según su valor.
	function setDamageDiceSrc(_idParent, _val) {
		if (_val == "00") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/0010.jpg')";
		else if (_val == "05") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/0510.jpg')";
		else if (_val == "10") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/1010.jpg')";
		else if (_val == "15") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/1510.jpg')";
		else if (_val == "20") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/2010.jpg')";
		else if (_val == "25") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/2510.jpg')";
		else if (_val == "9999") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/jirach10.gif')";
	}
	
	// Añade una casilla de Pokémon.
	function getPokemonLayout(_isYours, _isNumberLeft) {
		var _strWho = _isYours ? "de tu Poké" : "del Poké rival";
		var _idYours = _isYours ? "You" : "Rival";
		
		// Construye la barra de vida y el número.
		var _space = `<div style="flex-basis: 70%;"></div>`;
		var _drops = `<div style="flex-basis: 30%;">PV: <input class="inPV" id="inPV`+_idYours+`" title="Los puntos de vida `+_strWho+`" value="40" style="margin-left: 3px; margin-right: 3px; width: 26px;"/></div>`;
		var _bar = String(_isNumberLeft ? _space+_drops : _drops+_space);
		var _buttons =
			`<input class="buttonBonus pressed" type="image" src="https://i.imgur.com/wbnNZSi.png" title="Indicador de aplicar ventaja de tipo al atacar `+_strWho+`" style="flex-basis: 5%;"/>`+
			`<div style="flex-basis: 95%;"></div>`;
		
		// Devuelve el conjunto.
		return
			`<div class="colorsYsiel" style="flex-basis: 48%; display: flex; flex-wrap: wrap; padding: 5px;">`+
				_bar+
				`<select name="ddType`+_idYours+`Primary" id="ddType`+_idYours+`Primary" class="dropdown Null" title="El primer tipo `+_strWho+`" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>
				<select name="ddType`+_idYours+`Secondary" id="ddType`+_idYours+`Secondary" class="dropdown Null" title="El segundo tipo `+_strWho+`" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>`+
				_buttons+
			`</div>`;
	}
	
	// Calcula la ventaja.
	function getVentaja(_t1, _t2) {
		if (
			(_t1 == "Acero" && (_t2 == "Hada" || _t2 == "Hielo" || _t2 == "Roca")) ||
			(_t1 == "Agua" && (_t2 == "Fuego" || _t2 == "Roca" || _t2 == "Tierra")) ||
			(_t1 == "Bicho" && (_t2 == "Planta" || _t2 == "Psiquico" || _t2 == "Siniestro")) ||
			(_t1 == "Dragon" && (_t2 == "Dragon")) ||
			(_t1 == "Electrico" && (_t2 == "Agua" || _t2 == "Volador")) ||
			(_t1 == "Fantasma" && (_t2 == "Fantasma" || _t2 == "Psiquico")) ||
			(_t1 == "Fuego" && (_t2 == "Acero" || _t2 == "Bicho" || _t2 == "Hielo" || _t2 == "Planta")) ||
			(_t1 == "Hada" && (_t2 == "Dragon" || _t2 == "Lucha" || _t2 == "Siniestro")) ||
			(_t1 == "Hielo" && (_t2 == "Dragon" || _t2 == "Planta" || _t2 == "Tierra" || _t2 == "Volador")) ||
			(_t1 == "Lucha" && (_t2 == "Acero" || _t2 == "Hielo" || _t2 == "Normal" || _t2 == "Roca" || _t2 == "Siniestro")) ||
			(_t1 == "Planta" && (_t2 == "Agua" || _t2 == "Roca" || _t2 == "Tierra")) ||
			(_t1 == "Psiquico" && (_t2 == "Lucha" || _t2 == "Veneno")) ||
			(_t1 == "Roca" && (_t2 == "Bicho" || _t2 == "Fuego" || _t2 == "Hielo" || _t2 == "Volador")) ||
			(_t1 == "Siniestro" && (_t2 == "Fantasma" || _t2 == "Psiquico")) ||
			(_t1 == "Tierra" && (_t2 == "Acero" || _t2 == "Electrico" || _t2 == "Fuego" || _t2 == "Roca" || _t2 == "Veneno")) ||
			(_t1 == "Veneno" && (_t2 == "Hada" || _t2 == "Planta")) ||
			(_t1 == "Volador" && (_t2 == "Bicho" || _t2 == "Lucha" || _t2 == "Planta"))
		)
			return 5;
		else if (
			(_t1 == "Acero" && (_t2 == "Acero" || _t2 == "Agua" || _t2 == "Electrico" || _t2 == "Fuego")) ||
			(_t1 == "Agua" && (_t2 == "Agua" || _t2 == "Dragon" || _t2 == "Planta")) ||
			(_t1 == "Bicho" && (_t2 == "Acero" || _t2 == "Fantasma" || _t2 == "Fuego" || _t2 == "Hada" || _t2 == "Lucha" || _t2 == "Veneno" || _t2 == "Volador")) ||
			(_t1 == "Dragon" && (_t2 == "Acero" || _t2 == "Hada")) ||
			(_t1 == "Electrico" && (_t2 == "Dragon" || _t2 == "Electrico" || _t2 == "Planta" || _t2 == "Tierra")) ||
			(_t1 == "Fantasma" && (_t2 == "Normal" || _t2 == "Siniestro")) ||
			(_t1 == "Fuego" && (_t2 == "Agua" || _t2 == "Dragon" || _t2 == "Fuego" || _t2 == "Roca")) ||
			(_t1 == "Hada" && (_t2 == "Acero" || _t2 == "Fuego" || _t2 == "Veneno")) ||
			(_t1 == "Hielo" && (_t2 == "Acero" || _t2 == "Agua" || _t2 == "Fuego" || _t2 == "Hielo")) ||
			(_t1 == "Lucha" && (_t2 == "Bicho" || _t2 == "Fantasma" || _t2 == "Hada" || _t2 == "Psiquico" || _t2 == "Veneno" || _t2 == "Volador")) ||
			(_t1 == "Normal" && (_t2 == "Acero" || _t2 == "Fantasma" || _t2 == "Roca")) ||
			(_t1 == "Planta" && (_t2 == "Acero" || _t2 == "Bicho" || _t2 == "Dragon" || _t2 == "Fuego" || _t2 == "Planta" || _t2 == "Veneno" || _t2 == "Volador")) ||
			(_t1 == "Psiquico" && (_t2 == "Acero" || _t2 == "Psiquico" || _t2 == "Siniestro")) ||
			(_t1 == "Roca" && (_t2 == "Acero" || _t2 == "Lucha" || _t2 == "Tierra")) ||
			(_t1 == "Siniestro" && (_t2 == "Hada" || _t2 == "Lucha" || _t2 == "Siniestro")) ||
			(_t1 == "Tierra" && (_t2 == "Bicho" || _t2 == "Planta" || _t2 == "Volador")) ||
			(_t1 == "Veneno" && (_t2 == "Acero" || _t2 == "Fantasma" || _t2 == "Roca" || _t2 == "Tierra" || _t2 == "Veneno")) ||
			(_t1 == "Volador" && (_t2 == "Acero" || _t2 == "Electrico" || _t2 == "Roca"))
		)
			return -5;
		return 0;
	}
}




































