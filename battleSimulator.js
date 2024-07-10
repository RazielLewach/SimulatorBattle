if (document.getElementById("battleSimulatorPopup") == null) {
	var tiposInterval = null;
	document.getElementById("wrap").insertAdjacentHTML("afterend",`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><div id="battleSimulatorPopup" style="position:absolute; width:400px; font-weight:bold; font-size:12px; z-index: 999999; background-image:url('https://i.imgur.com/ph8xoAJ.png'); background-repeat: repeat;" class="colorsYsiel">
		<div style="display: flex; justify-content: flex-end;"><button id="btClose" class="colorsYsiel">X</button></div>
		<div style="display: flex; justify-content: center;"><div class="textShadow">Simulador de batallas y comparador de tipos.</div></div>
		
		<div style="margin: 5px; display: flex; flex-wrap: wrap">
			<div class="divBattleTitle"><div class="textShadow">Primera batalla</div></div>
			`+getPokemonLayout(true, true, false)+`
			<div class="divVS textShadow">VS</div>
			`+getPokemonLayout(false, true, true)+`
			
			<div class="divBattleTitle"><div class="textShadow">Segunda batalla <input type="checkbox" id="chSecondFight" value="chSecondFight" style="margin-left: 2px;"/></div></div>
			<div id="dvSecondFight">
				`+getPokemonLayout(true, false, false)+`
				<div class="divVS textShadow">VS</div>
				`+getPokemonLayout(false, false, true)+`
			</div>
		</div>
		
		<div class="divBattleTitle"><div class="textShadow">Dados de combate</div></div>
		<div class="colorsYsiel" style="display: flex;">
			<div class="divLeyendaDamage">De tu Poke [1]</div>
			<div class="divLeyendaDamage">Del Poke rival [1]</div>
			<div class="divLeyendaDamage">De tu Poke [2]</div>
			<div class="divLeyendaDamage">Del Poke rival [2]</div>
		</div>
		<div style="margin: 5px;" id="tbDamages" class="colorsYsiel" style="display: flex;"></div>
		<button id="btDeleteTurn" class="colorsYsiel" style="margin: 5px; padding: 2px;">Borrar turno</button>
		<button id="btNewTurn" class="colorsYsiel" style="margin: 5px; padding: 2px;">Añadir turno</button>
		<div class="colorsYsiel" style="display: flex; margin: 5px 100px 5px 100px; flex-direction: column; align-items: center;">
			<div style="flex-basis: 100%;">RESULTADO</div>
			<div style="flex-basis: 100%; display: flex;">
				<div class="divPokeResult">Tu Pokémon 1:</div><div id="dvFinalYou1" style="flex-basis: 30%;">0</div><div class="divPVResult">PV</div>
			</div>
			<div style="flex-basis: 100%; display: flex;">
				<div class="divPokeResult">Tu Pokémon 2:</div><div id="dvFinalYou2" style="flex-basis: 30%;">0</div><div class="divPVResult">PV</div>
			</div>
			<div style="flex-basis: 100%; display: flex;">
				<div class="divPokeResult">Pokémon rival 1:</div><div id="dvFinalRival1" style="flex-basis: 30%;">0</div><div class="divPVResult">PV</div>
			</div>
			<div style="flex-basis: 100%; display: flex;">
				<div class="divPokeResult">Pokémon rival 2:</div><div id="dvFinalRival2" style="flex-basis: 30%;">0</div><div class="divPVResult">PV</div>
			</div>
		</div>
	</div>
	<style>
		.divBattleTitle {
			display: flex;
			justify-content: center;
			flex-basis: 100%;
		}
		.textShadow {
			color: #FFFFFF;
			text-shadow: -2px +0px +0px black, +0px +2px black, +2px +0px black, +0px -2px black, -2px -2px black, +2px +2px black, -2px +2px black, +2px -2px black;
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

	tiposInterval = setInterval(() => {
		var _left = 20+window.scrollX;
		var _top = 20+window.scrollY;
		$("#battleSimulatorPopup").css({left: _left, top: _top});
	},10);
	
	// Listeners.
	$("#chSecondFight").change(function () {
		if ($(this).is(':checked')) $("#dvSecondFight").show();
		else $("#dvSecondFight").hide();
	});
	$(".dropdown").change(function() {
		$(this).removeClass();
		$(this).addClass("dropdown");
		$(this).addClass($(this).val());
		updateDamages();
	});
	$(".inPV").change(function() {
		updateDamages();
	});
	$(".buttonBonus").click(function() {
		var _isPressed = $(this).hasClass("pressed");
		$(this).removeClass();
		$(this).addClass("buttonBonus");
		if (!_isPressed) $(this).addClass("pressed");
		updateDamages();
	});
	$("#btClose").click(function() {
		clearInterval(tiposInterval);
		document.getElementById("battleSimulatorPopup").remove();
	});
	$("#btNewTurn").click(function() {
		// Añade la fila.
		var _table = document.getElementById("tbDamages");
		var _div = document.createElement("div");
		_div.style.cssText = "flex-basis: 100%; display: flex; border-bottom: 3px solid #FF00FF;";
		var _iRow = _table.childElementCount;
		addTurnDiceCell(_div, String(_iRow)+"BL", "De tu Poké [1]");
		addTurnDiceCell(_div, String(_iRow)+"BR", "Del Poké rival [1]");
		addTurnDiceCell(_div, String(_iRow)+"TL", "De tu Poké [2]");
		addTurnDiceCell(_div, String(_iRow)+"TR", "Del Poké rival [2]");
		
		// Añade la fila al DOM.
		_table.appendChild(_div);		
		
		// Añade los listeners.
		addListenerDiceCell(String(_iRow)+"BL");
		addListenerDiceCell(String(_iRow)+"BR");
		addListenerDiceCell(String(_iRow)+"TL");
		addListenerDiceCell(String(_iRow)+"TR");
		
		updateDamages();
	});
	$("#btDeleteTurn").click(function() {
		$("#tbDamages").children().last().remove();
		updateDamages();
	});
	
	// Código inicial.
	$("#dvSecondFight").hide();
	
	// Muestra el daño que se causa.
	function setDanyo(_p,_dp1,_dp2,_de1,_de2) {
		// Los tipos.
		var _tp1 = document.getElementById(_dp1).value;
		var _tp2 = document.getElementById(_dp2).value;
		var _te1 = document.getElementById(_de1).value;
		var _te2 = document.getElementById(_de2).value;
		var _v1 = 0, _v2 = 0;
		
		// Comprueba el bono de ventaja para cada tipo por separado.
		var _v1a = getVentaja(_tp1,_te1);
		var _v1b = getVentaja(_tp1,_te2);
		if (_v1a+_v1b >= 5) _v1 = 5;
		
		var _v2a = getVentaja(_tp2,_te1);
		var _v2b = getVentaja(_tp2,_te2);
		if (_v2a+_v2b >= 5) _v2 = 5;
		
		var _ventaja = Math.max(_v1,_v2);
		
		// Suma y muestra el resultado.
		document.getElementById(_p).innerHTML = _ventaja == 5 ? "Ventaja de tipo (+5)" : "Neutral (+0)";
		$("#"+String(_p)).css("background-color", _ventaja == 5 ? "#00FF00" : "#000000");
		$("#"+String(_p)).css("color", _ventaja == 5 ? "#000000" : "#FFFFFF");
	}
	
	// Actualiza toda la info de enemigo y usuario segun los datos.
	function updateAllInfo() {
		// Setea los daños.
		setDanyo("showDanyosUsuario","ddTipoPlayer1","ddTipoPlayer2","ddTipoEnemy1","ddTipoEnemy2");
		setDanyo("showDanyosEnemigo","ddTipoEnemy1","ddTipoEnemy2","ddTipoPlayer1","ddTipoPlayer2");
		
		// Setea las debilidades y efectividades.
		seteaDebilidades("debilidadesEnemigo","ddTipoEnemy1","ddTipoEnemy2");
		seteaDebilidades("debilidadesPlayer","ddTipoPlayer1","ddTipoPlayer2");
		seteaEfectividades("efectividadesPlayer","ddTipoPlayer1","ddTipoPlayer2");
		seteaEfectividades("efectividadesEnemigo","ddTipoEnemy1","ddTipoEnemy2");
	}
	
	// Setea debilidades nomás.
	function seteaDebilidades(_p,_dr1,_dr2) {
		var _deb = "";
		var _arrTipos = ["Acero", "Agua", "Bicho", "Dragon", "Electrico", "Fantasma", "Fuego", "Hada", "Hielo", "Lucha", "Normal", "Planta", "Psiquico", "Roca", "Siniestro", "Tierra", "Veneno", "Volador"];
		var _firstComma = false;
		// Comprueba para cada tipo si es efectivo contra los dos tipos del enemigo, y lo añade a la lista.
		_arrTipos.forEach(_tipo =>
		{
			if (getVentaja(_tipo,document.getElementById(_dr1).value)+getVentaja(_tipo,document.getElementById(_dr2).value) >= 5)
			{
				if (_firstComma) _deb += ", ";
				_deb += getTypeButton(_tipo);
				_firstComma = true;
			}
		});
		document.getElementById(_p).innerHTML = String(_deb);
	}
	
	// Setea efectividades nomás.
	function seteaEfectividades(_p,_dr1,_dr2) {
		var _deb = "";
		var _arrTipos = ["Acero", "Agua", "Bicho", "Dragon", "Electrico", "Fantasma", "Fuego", "Hada", "Hielo", "Lucha", "Normal", "Planta", "Psiquico", "Roca", "Siniestro", "Tierra", "Veneno", "Volador"];
		var _firstComma = false;
		// Comprueba para cada tipo si los tuyos son efectivos contra él, y lo añade a la lista.
		_arrTipos.forEach(_tipo =>
		{
			if (getVentaja(document.getElementById(_dr1).value,_tipo) == 5 || getVentaja(document.getElementById(_dr2).value,_tipo) == 5)
			{
				if (_firstComma) _deb += ", ";
				_deb += getTypeButton(_tipo);
				_firstComma = true;
			}
		});
		document.getElementById(_p).innerHTML = String(_deb);
	}
	
	// Code del botón para cada tipo en debilidades y tal.
	function getTypeButton(_type) {
		return "<font class='"+String(_type)+" type' style='width:30px; height:18px;'>"+String(_type)+"</font>";
	}
	
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
	function updateDamages() {
		updateDamageCase("dvFinalYou1", "B1", 1);
		updateDamageCase("dvFinalYou2", "B2", 3);
		updateDamageCase("dvFinalRival1", "T1", 0);
		updateDamageCase("dvFinalRival2", "T2", 2);
	}
	
	// Actualiza los PV finales de un caso concreto.
	function updateDamageCase(_idPV, _prefix, _iDamager) {
		var _pv = parseInt($("#inPV"+_prefix).val());
		$('#tbDamages').children().each(function () { // Iteramos cada turno...
			var _dmg = parseInt($(this).children()[_iDamager].children[0].dataset.value);
			_pv = String(Math.max(_pv-_dmg, 0));
		});
		$("#"+_idPV).html(_pv);
	}
	
	// Añade una celda de un dado y sus botones a un turno.
	function addTurnDiceCell(_div, _sufix, _strWho) {
		_div.innerHTML += `
			<div style="flex-basis: 25%; display: flex; flex-direction: column; background-image: url(https://i.servimg.com/u/f29/19/71/18/28/0010.jpg); background-position: 0 130%; background-size: 100%;">
				<div id="imDamage`+_sufix+`" data-value="00" title="El dado de combate del Pokémon" style=" flex-basis: 100%; min-height: 25px;"></div>
				<div style="flex-basis: 100%; display: flex;">
					<button class="colorsYsiel btModifyDamage" id="btSubDamage`+_sufix+`" title="Reduce el valor del dado de combate" style="flex-basis: 50%;">-</button>
					<button class="colorsYsiel btModifyDamage" id="btAddDamage`+_sufix+`" title="Aumenta el valor del dado de combate" style="flex-basis: 50%;">+</button>
				</div>
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
			else if (_val == "99") $(_idImg)[0].dataset.value = "25";
			setDamageDiceSrc($(_idImg)[0].parentElement, $(_idImg)[0].dataset.value);
			updateDamages();
		});
		$("#btAddDamage"+_sufix).click(function() {
			var _idImg = "#imDamage"+_sufix;
			var _val = $(_idImg)[0].dataset.value;
			if (_val == "00") $(_idImg)[0].dataset.value = "05";
			else if (_val == "05") $(_idImg)[0].dataset.value = "10";
			else if (_val == "10") $(_idImg)[0].dataset.value = "15";
			else if (_val == "15") $(_idImg)[0].dataset.value = "20";
			else if (_val == "20") $(_idImg)[0].dataset.value = "25";
			else if (_val == "25") $(_idImg)[0].dataset.value = "99";
			setDamageDiceSrc($(_idImg)[0].parentElement, $(_idImg)[0].dataset.value);
			updateDamages();
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
		else if (_val == "99") _idParent.style.backgroundImage = "url('https://i.servimg.com/u/f29/19/71/18/28/jirach10.gif')";
	}
	
	// Añade una casilla de Pokémon.
	function getPokemonLayout(_isYours, _isLeft, _isNumberLeft) {
		// Valores de idNotation: BL0, BR0, TL1, TR1 (bot, top, 0 izk, 1 der)
		var _strYours = _isYours ? "propio" : "rival";
		var _strId = (_isYours ? "B" : "T") + (_isLeft ? "1" : "2");
		
		// Construye la barra de vida y el número.
		var _n1 = `<div style="flex-basis: 10%;">[1]</div>`;
		var _n2 = `<div style="flex-basis: 10%;">[2]</div>`;
		var _space = `<div style="flex-basis: 60%;"></div>`;
		var _drops = `<div style="flex-basis: 30%;">PV: <input class="inPV" id="inPV`+_strId+`" title="Los puntos de vida del Pokémon" value="40" style="margin-left: 3px; width: 30px;"/></div>`;
		var _bar = String(_isNumberLeft ? _n2+_space+_drops : _drops+_space+_n1);
		var _buttons =
			`<input class="buttonBonus pressed" type="image" src="https://i.imgur.com/wbnNZSi.png" title="Puede recibir daño adicional por ventaja de tipo" style="flex-basis: 5%;"/>`+
			`<div style="flex-basis: 95%;"></div>`;
		
		// Devuelve el conjunto.
		return
			`<div class="colorsYsiel" style="flex-basis: 48%; display: flex; flex-wrap: wrap; padding: 5px;">`+
				String(_isYours ? _bar : _buttons)+
				`<select name="ddType`+_strId+`Primary" id="ddType`+_strId+`Primary" class="dropdown Null" title="El primer tipo del Pokémon `+_strYours+` de la izquierda" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>
				<select name="ddType`+_strId+`Secondary" id="ddType`+_strId+`Secondary" class="dropdown Null" title="El segundo tipo del Pokémon `+_strYours+` de la izquierda" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>`+
				String(_isYours ? _buttons : _bar)+
			`</div>`;
	}
	
	// Calcula la ventaja.
	function getVentaja(_t1,_t2) {
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




































