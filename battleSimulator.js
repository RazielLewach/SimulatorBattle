if (document.getElementById("battleSimulatorPopup") == null) {
	/*TODO
		
	*/
	// Todo el HTML y el CSS.
	var tiposInterval = null;
	document.getElementById("wrap").insertAdjacentHTML("afterend",`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><div id="battleSimulatorPopup" style="position:absolute; width:400px; font-weight:bold; font-size:12px; z-index: 999999; background-image:url('https://i.imgur.com/ph8xoAJ.png'); background-repeat: repeat;" class="colorsYsiel">
		<div style="display: flex; justify-content: flex-end;"><button id="btClose" class="colorsYsiel">X</button></div>
		<div style="display: flex; justify-content: center;"><div class="textShadow">Comparador de tipos</div></div>
		
		<div style="margin: 5px; display: flex; flex-wrap: wrap">
			`+getPokemonLayout(true, false)[0]+`
			<div class="divVS textShadow" title="¡VERSUS!" style="flex-basis: 4%; display: flex; flex-wrap: wrap;">VS</div>
			`+getPokemonLayout(false, true)[0]+`
		</div>
		<div></div>
		<div style="margin: 5px; display: flex; flex-wrap: wrap">
			`+getPokemonLayout(true, false)[1]+`
			<div style="flex-basis: 4%; display: flex; flex-wrap: wrap;"></div>
			`+getPokemonLayout(false, true)[1]+`
		</div>
		
		<div class="divBattleTitle"><div class="textShadow">Simulador de batallas</div></div>
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
		.Nulo {background-color:#000000; color:#000000;}
		.Acero {background-color:#AFACBB; color:#000000;}
		.Agua {background-color:#319CFE; color:#000000;}
		.Bicho {background-color:#A7B535; color:#000000;}
		.Dragon {background-color:#7B68E0; color:#000000;}
		.Electrico {background-color:#FDE07A; color:#000000;}
		.Fantasma {background-color:#6F6A99; color:#FFFFFF;}
		.Fuego {background-color:#FF4422; color:#000000;}
		.Hada {background-color:#F3AFEF; color:#000000;}
		.Hielo {background-color:#82DDF9; color:#000000;}
		.Lucha {background-color:#B9594E; color:#FFFFFF;}
		.Normal {background-color:#BAB9AC; color:#000000;}
		.Planta {background-color:#7BCC56; color:#000000;}
		.Psiquico {background-color:#E16591; color:#000000;}
		.Roca {background-color:#BCAA65; color:#000000;}
		.Siniestro {background-color:#695749; color:#FFFFFF;}
		.Tierra {background-color:#DCBB52; color:#000000;}
		.Veneno {background-color:#AA5E9C; color:#000000;}
		.Volador {background-color:#6B9BED; color:#000000;}
		.typeText {padding: 0 2px 0 2px; margin: 1px 2px 1px 2px; text-align: center;}
	</style>
	`);
	updateAllInfo();

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
	$(".inUpdate").change(function() {
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
		addTurnDiceCell(_div, String(_iRow)+"L", true);
		_div.innerHTML += `<div style="flex-basis: 4%; display: flex; flex-direction: column;"></div>`;
		addTurnDiceCell(_div, String(_iRow)+"R", false);
		
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
			<option class="Nulo" value="Nulo"></option>
			<option class="Acero" value="Acero">Acero</option>
			<option class="Agua" value="Agua">Agua</option>
			<option class="Bicho" value="Bicho">Bicho</option>
			<option class="Dragon" value="Dragon">Dragón</option>
			<option class="Electrico" value="Electrico">Eléctrico</option>
			<option class="Fantasma" value="Fantasma">Fantasma</option>
			<option class="Fuego" value="Fuego">Fuego</option>
			<option class="Hada" value="Hada">Hada</option>
			<option class="Hielo" value="Hielo">Hielo</option>
			<option class="Lucha" value="Lucha">Lucha</option>
			<option class="Normal" value="Normal">Normal</option>
			<option class="Planta" value="Planta">Planta</option>
			<option class="Psiquico" value="Psiquico">Psíquico</option>
			<option class="Roca" value="Roca">Roca</option>
			<option class="Siniestro" value="Siniestro">Siniestro</option>
			<option class="Tierra" value="Tierra">Tierra</option>
			<option class="Veneno" value="Veneno">Veneno</option>
			<option class="Volador" value="Volador">Volador</option>
		`;
	}
	
	// Actualiza los PV finales.
	function updateAllInfo() {
		updateParticipant(true);
		updateParticipant(false);
	}
	
	// Actualiza los PV finales de un caso concreto.
	function updateParticipant(_isYou) {
		// Variables.
		var _iOtherDamage = _isYou ? 4 : 0;
		var _iSelfPV = _isYou ? 1 : 3;
		var _iOtherModif = _isYou ? 1 : 0;
		var _sSelf = _isYou ? "You" : "Rival";
		var _sOther = _isYou ? "Rival" : "You";
		var _typeSelfPrimary = $('#ddType'+_sSelf+'Primary').val();
		var _typeSelfSecondary = $('#ddType'+_sSelf+'Secondary').val();
		var _typeOtherPrimary = $('#ddType'+_sOther+'Primary').val();
		var _typeOtherSecondary = $('#ddType'+_sOther+'Secondary').val();
		
		// La vida.
		var _pv = parseInt($("#inPV"+_sSelf).val());
		$("#tbDamages").children().each(function () { // Iteramos cada turno...		
			// Obtén el daño del rival.
			var _dmg = parseInt($(this).find(".dvTurnDamages"+_sOther).find(".dvDiceValue")[0].dataset.value);
			if (_dmg > 0) {
				if ($("#btAppliesType"+_sOther).hasClass("pressed")) {
					var _ventaja = Math.max(
						getVentaja(_typeOtherPrimary, _typeSelfPrimary) + getVentaja(_typeOtherPrimary, _typeSelfSecondary),
						getVentaja(_typeOtherSecondary, _typeSelfPrimary) + getVentaja(_typeOtherSecondary, _typeSelfSecondary)
					);
					if (_ventaja > 0) _dmg += 5;
				}
				_dmg += parseInt($("#inDamageModif"+_sOther).val());
			}
			_dmg += parseInt($(this).find(".dvTurnDamages"+_sOther).find(".inDamageModif").val());
			
			// Resta los PV y aplícalos.
			_pv = String(Math.max(_pv-_dmg, 0));
			$(this).find(".dvTurnPV"+_sSelf).find(".inTurnPV").html(_pv);
		});
		
		// Las comparaciones de tipos.
		var _arrTypeNames = getArrayOfTypes(0);
		var _arrTypeStyles = getArrayOfTypes(1);
		
		var _txtEffective = "";
		for (var _i = 0; _i < _arrTypeNames.length; ++_i) {
			if (getVentaja(_typeSelfPrimary, _arrTypeNames[_i]) > 0 || getVentaja(_typeSelfSecondary, _arrTypeNames[_i]) > 0)
				_txtEffective += _arrTypeStyles[_i];
		}
		$("#dvEffective"+_sSelf).html("<div class='typeText' style='color:#00FF00;'>★</div> " + _txtEffective);
		
		var _txtWeak = "";
		for (var _i = 0; _i < _arrTypeNames.length; ++_i)
			if (getVentaja(_arrTypeNames[_i], _typeSelfPrimary) + getVentaja(_arrTypeNames[_i], _typeSelfSecondary) > 0)
				_txtWeak += _arrTypeStyles[_i];
		$("#dvWeak"+_sSelf).html("<div class='typeText' style='color:#FF0000;'>☓</div> " + _txtWeak);
		
		// Texto de ventaja de tipo.
		$("#txtTypeBonus"+_sSelf).html(
			getVentaja(_typeSelfPrimary, _typeOtherPrimary)+getVentaja(_typeSelfPrimary, _typeOtherSecondary) > 0 ||
			getVentaja(_typeSelfSecondary, _typeOtherPrimary)+getVentaja(_typeSelfSecondary, _typeOtherSecondary) > 0 ?
			"<div style='color:#00FF00;'>¡Con ventaja de tipo!</div>" : "<div style='color:#888888;'>Sin ventaja de tipo...</div>"
		);
	}
	
	function getArrayOfTypes(_showStyles) {
		var _preA = "<div class='typeText ";
		var _preB = "'>";
		var _suf = _showStyles ? "</div>" : "";
		return [
			(_showStyles ? (_preA + "Acero" + _preB) : "") + "Acero" + _suf,
			(_showStyles ? (_preA + "Agua" + _preB) : "") + "Agua" + _suf,
			(_showStyles ? (_preA + "Bicho" + _preB) : "") + "Bicho" + _suf,
			(_showStyles ? (_preA + "Dragon" + _preB) : "") + "Dragon" + _suf,
			(_showStyles ? (_preA + "Electrico" + _preB) : "") + "Electrico" + _suf,
			(_showStyles ? (_preA + "Fantasma" + _preB) : "") + "Fantasma" + _suf,
			(_showStyles ? (_preA + "Fuego" + _preB) : "") + "Fuego" + _suf,
			(_showStyles ? (_preA + "Hada" + _preB) : "") + "Hada" + _suf,
			(_showStyles ? (_preA + "Hielo" + _preB) : "") + "Hielo" + _suf,
			(_showStyles ? (_preA + "Lucha" + _preB) : "") + "Lucha" + _suf,
			(_showStyles ? (_preA + "Planta" + _preB) : "") + "Planta" + _suf,
			(_showStyles ? (_preA + "Psiquico" + _preB) : "") + "Psiquico" + _suf,
			(_showStyles ? (_preA + "Roca" + _preB) : "") + "Roca" + _suf,
			(_showStyles ? (_preA + "Siniestro" + _preB) : "") + "Siniestro" + _suf,
			(_showStyles ? (_preA + "Tierra" + _preB) : "") + "Tierra" + _suf,
			(_showStyles ? (_preA + "Veneno" + _preB) : "") + "Veneno" + _suf,
			(_showStyles ? (_preA + "Volador" + _preB) : "") + "Volador" + _suf
		];
	}
	
	// Añade una celda de un dado y sus botones a un turno.
	function addTurnDiceCell(_div, _sufix, _isYours) {
		var _strWho = getWhoStrPoke(_isYours);
		var _idYours = getWhoId(_isYours);
		var _title = `"La suma total de modificadores de daño para este turno `+_strWho+`. Aumentos de daño suman, mientras que reducciones de daño restan. El uso de ítems curativos por el otro bando contaría como una resta. Este valor siempre aplica aún si el dado de combate falla."`;
		var _modifText = `<div style="flex-basis: 55%;" title=`+_title+`>Modificadores</div>`;
		var _modifIn = `
			<div style="flex-basis: 20%;"><input class="inDamageModif" id="inDamageModif`+_sufix+`" title=`+_title+` value="0" style="margin-left: 3px; margin-right: 3px; width: 26px;"/></div>
		`;
		var _dice = `
			<div class="colorsYsiel dvTurnDamages`+_idYours+`" style="flex-basis: 40%; display: flex; flex-direction: column;">
				<div style="flex-basis: 100%; display: flex; flex-direction: row; background-position: 0 91%; background-image: url(https://i.servimg.com/u/f29/19/71/18/28/1010.jpg); background-size: 100%;">
					<button class="colorsYsiel btModifyDamage btSubDamage" id="btSubDamage`+_sufix+`" title="Reduce el valor del dado de combate `+_strWho+`" style="flex-basis: 15%;">-</button>
					<div class="dvDiceValue" id="imDamage`+_sufix+`" data-value="10" title="El dado de combate `+_strWho+`" style="flex-basis: 70%; min-height: 25px;"></div>
					<button class="colorsYsiel btModifyDamage btAddDamage" id="btAddDamage`+_sufix+`" title="Aumenta el valor del dado de combate `+_strWho+`" style="flex-basis: 15%;">+</button>
				</div>
				<div style="flex-basis: 100%; display: flex; justify-content: center; margin-top: 3px;">
		`
		+ (_isYours ? _modifIn+_modifText : _modifText+_modifIn) +
		`
				</div>
			</div>
		`;
		var _pv = `
			<div class="colorsYsiel dvTurnPV`+_idYours+`" style="flex-basis: 8%; display: flex; flex-direction: column; align-items: center;">
				<div class="colorsYsielNoBorder" title="Tras este turno, los PV `+_strWho+`" style="flex-basis: 25%; padding-left: 2px;">PV</div>
				<div class="colorsYsielNoBorder inTurnPV" id="dvPVNext`+_sufix+`" title="Tras este turno, los PV `+_strWho+`" style="flex-basis: 25%;"></div>
			</div>
		`;
		_div.innerHTML += _isYours ? _dice+_pv : _pv+_dice;
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
		$("#inDamageModif"+_sufix).change(function() {
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
		var _strWho = getWhoStrPoke(_isYours);
		var _idYours = getWhoId(_isYours);
		
		// Construye la barra de vida y el número. Indica si hay ventaja de tipo.
		var _space = `<div style="flex-basis: 70%;" id="txtTypeBonus`+_idYours+`"></div>`;
		var _drops = `<div style="flex-basis: 30%;">PV: <input class="inUpdate" id="inPV`+_idYours+`" title="Los puntos de vida `+_strWho+`" value="40" style="margin-left: 3px; margin-right: 3px; width: 26px;"/></div>`;
		var _bar = String(_isNumberLeft ? _space+_drops : _drops+_space);
		var _title = `"La suma total de modificadores de daño `+_strWho+` (potenciadores, bonos legendarios, mecánicas...). Aplica de base a todos los turnos. Aumentos de daño suman, mientras que reducciones de daño restan. Este valor solo aplica si el dado de combate acierta."`;
		var _modifText = `<div style="flex-basis: 50%; margin-top: 3px;" title=`+_title+`>Modificadores</div>`;
		var _modifIn = `
			<div style="flex-basis: 20%;"><input class="inUpdate inDamageModif" id="inDamageModif`+_idYours+`" title=`+_title+` value="0" style="margin-left: 3px; margin-right: 3px; margin-top: 3px; width: 26px;"/></div>
		`;
		var _btType = `<input class="buttonBonus pressed" id="btAppliesType`+_idYours+`" type="image" src="https://i.imgur.com/wbnNZSi.png" title="Indicador de aplicar ventaja de tipo al atacar `+_strWho+`. Solo aplica si el dado de combate acierta." style="flex-basis: 5%;"/>`;
		var _sep = `<div style="flex-basis: 15%;"></div>`;
		var _buttons = _isYours ? (_btType + _sep + _modifText + _modifIn) : (_modifIn + _modifText + _sep + _btType);
		
		// Devuelve el conjunto.
		return [
			`<div class="colorsYsiel" style="flex-basis: 48%; display: flex; flex-wrap: wrap; padding: 5px;">`+
				_bar+
				`<select name="ddType`+_idYours+`Primary" id="ddType`+_idYours+`Primary" class="dropdown Nulo" title="El primer tipo `+_strWho+`" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>
				<select name="ddType`+_idYours+`Secondary" id="ddType`+_idYours+`Secondary" class="dropdown Nulo" title="El segundo tipo `+_strWho+`" style="flex-basis: 50%;">`+getDropdownTypes()+`</select>`+
				_buttons+
			`</div>`,
			`<div class="colorsYsiel" style="flex-basis: 48%; display: flex; flex-wrap: wrap; padding: 5px;">
				<div id="dvEffective`+_idYours+`" style="flex-basis: 50%; display: flex; flex-direction: column;" title="Estos son los tipos contra los cuales tienen ventaja ambos tipos `+_strWho+`"></div>
				<div id="dvWeak`+_idYours+`" style="flex-basis: 50%; display: flex; flex-direction: column;" title="Estos son los tipos efectivos contra la combinación de tipos `+_strWho+`"></div>
			</div>`
		];
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
	
	// Obtén strings para referencias.
	function getWhoStrPoke(_isYours) {
		return _isYours ? "de tu Poké" : "del Poké rival";
	}
	function getWhoId(_isYours) {
		return _isYours ? "You" : "Rival";
	}
}




































