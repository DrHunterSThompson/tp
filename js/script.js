(function (global) {
	var dc = {};


	var homeHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/home-snippet.html";
	var charactersUrl = "https://github.com/DrHunterSThompson/tp/blob/with-js/data/characters.json";
	var charactersTitleHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/characters-title-snippet.html";
	var characterHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/character-snippet.html";
	var photosTitleHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/photos-title-snippet.html";
	var photoHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/photo-snippet.html";
	var musicUrl = "https://github.com/DrHunterSThompson/tp/blob/with-js/data/music.json";
	var musicTitleHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/music-title-snippet.html";
	var musicHtml = "https://github.com/DrHunterSThompson/tp/blob/with-js/snippets/music-snippet.html";


	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};
	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	};
	function setActive(id) {
		document.querySelector("#logo").classList.remove("active");
		document.querySelector("#characters").classList.remove("active");
		document.querySelector("#photos").classList.remove("active");
		document.querySelector("#music").classList.remove("active");

		var targetElem = document.querySelector(id);
		targetElem.classList.add("active");
	}

	function setTitle(title) {
		document.querySelector("title").innerHTML = title;
	}


	document.addEventListener("DOMContentLoaded", function (event) {
		$ajaxUtils.sendGetRequest(
			homeHtml,
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			},
			false);

		setActive("#logo");
	});


	dc.loadCharacters = function () {
		$ajaxUtils.sendGetRequest(charactersUrl, buildAndShowCharactersHTML);

		setActive("#characters");
		setTitle("Characters")
	};
	dc.loadPhotos = function () {
		buildAndShowPhotosHTML();
	
		setActive("#photos");
		setTitle("Photos")
	};
	dc.loadMusic = function () {
		$ajaxUtils.sendGetRequest(musicUrl, buildAndShowMusicHTML);

		setActive("#music");
		setTitle("Music")
	};


	function buildAndShowCharactersHTML(characters) {
		$ajaxUtils.sendGetRequest(
			charactersTitleHtml,
			function (charactersTitleHtml) {
				$ajaxUtils.sendGetRequest(
					characterHtml,
					function (characterHtml) {
						var charactersViewHtml = buildCharactersViewHtml(characters, charactersTitleHtml, characterHtml);
						insertHtml("#main-content", charactersViewHtml);
					},
					false
				);
			},
			false
		);
	}
	function buildCharactersViewHtml(characters, charactersTitleHtml, characterHtml) {
		var finalHtml = charactersTitleHtml;
		finalHtml += "<section id='characters' class='row'>"

		for (var i = 0; i < characters.length; i++) {
			var html = characterHtml;
			var short_name = characters[i].short_name;
			var name = characters[i].name;
			var actor = characters[i].actor;
			html = insertProperty(html, "short_name", short_name);
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "actor", actor);
			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;
	}

	function buildAndShowPhotosHTML() {
		$ajaxUtils.sendGetRequest(
			photosTitleHtml,
			function (photosTitleHtml) {
				$ajaxUtils.sendGetRequest(
					photoHtml,
					function (photoHtml) {
						var photosViewHtml = buildPhotosViewHtml(photosTitleHtml, photoHtml);
						insertHtml("#main-content", photosViewHtml);
					},
					false
				);
			},
			false
		);
	}
	function buildPhotosViewHtml(photosTitleHtml, photoHtml) {
		var finalHtml = photosTitleHtml;
		finalHtml += "<section id='photos' class='row'>";
		for (var i = 1; i <= 24; i++) {
			var html = photoHtml;
			html = insertProperty(html, "number", i);
			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;
	}

	function buildAndShowMusicHTML(music) {
		$ajaxUtils.sendGetRequest(
			musicTitleHtml,
			function (musicTitleHtml) {
				$ajaxUtils.sendGetRequest(
					musicHtml,
					function (musicHtml) {
						var musicViewHtml = buildMusicViewHtml(music, musicTitleHtml, musicHtml);
						insertHtml("#main-content", musicViewHtml);
					},
					false
				);
			},
			false
		);
	}
	function buildMusicViewHtml(music, musicTitleHtml, musicHtml) {
		var finalHtml = musicTitleHtml;
		finalHtml += "<section class='row' id='music'>";
		for (var i = 0; i < music.length; i++) {
			var html = musicHtml;
			var iframe = music[i].iframe;
			var title = music[i].title;
			var singer = music[i].singer;
			html = insertProperty(html, "iframe", iframe);
			html = insertProperty(html, "title", title);
			html = insertProperty(html, "singer", singer);
			finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}


	global.$dc = dc;
})(window);