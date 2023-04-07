(function (global) {
	var dc = {};


	var homeHtml = "snippets/home-snippet.html";
	var charactersUrl = "data/characters.json";
	var charactersTitleHtml = "snippets/characters-title-snippet.html";
	var characterHtml = "snippets/character-snippet.html";
	var characterUrl = "data/characters/";
	var characterPageTitleHtml = "snippets/character-page-title-snippet.html";
	var characterPageArticleHtml = "snippets/character-page-article-snippet.html";
	var characterPagePhotoHtml = "snippets/character-page-photo-snippet.html";
	var characterPagePhotoUrl = "data/images/characters/";
	var photosTitleHtml = "snippets/photos-title-snippet.html";
	var photoHtml = "snippets/photo-snippet.html";
	var musicUrl = "data/music.json";
	var musicTitleHtml = "snippets/music-title-snippet.html";
	var musicHtml = "snippets/music-snippet.html";


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
		dc.loadHomePage();
	});

	dc.loadHomePage = function () {
		$ajaxUtils.sendGetRequest(
			homeHtml,
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			},
			false
		);

		setActive("#logo");
		setTitle("Trainspotting");
	}
	dc.loadCharacters = function () {
		$ajaxUtils.sendGetRequest(charactersUrl, buildAndShowCharactersHTML);

		setActive("#characters");
		setTitle("Characters")
	};
	dc.loadCharacterPage = function (short_name) {
		$ajaxUtils.sendGetRequest(characterUrl + short_name + ".json", buildAndShowCharacterPageHTML);
	}
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
			html = insertProperty(html, "short_name", short_name);
			html = insertProperty(html, "name", name);
			html = insertProperty(html, "actor", actor);

			if (i % 3 == 2) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}
			if (i % 2 != 0) {
				html += "<div class='clearfix visible-sm-block'></div>";
			}

			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;
	}

	function buildAndShowCharacterPageHTML(character) {
		$ajaxUtils.sendGetRequest(
			characterPageTitleHtml,
			function (characterPageTitleHtml) {
				$ajaxUtils.sendGetRequest(
					characterPageArticleHtml,
					function (characterPageArticleHtml) {
						$ajaxUtils.sendGetRequest(
							characterPagePhotoHtml,
							function(characterPagePhotoHtml) {
								var characterPageViewHtml = buildCharacterPageViewHtml(character[0], characterPageTitleHtml, characterPageArticleHtml, characterPagePhotoHtml);
								insertHtml("#main-content", characterPageViewHtml);		
							},
							false
						);
					},
					false
				);
			},
			false
		);
	}
	function buildCharacterPageViewHtml(character, characterPageTitleHtml, characterPageArticleHtml, characterPagePhotoHtml) {
		setTitle(character.name);

		var finalHtml = characterPageTitleHtml;
		finalHtml = insertProperty(finalHtml, "name", character.name);
		finalHtml = insertProperty(finalHtml, "actor", character.actor);

		finalHtml += characterPageArticleHtml;
		finalHtml = insertProperty(finalHtml, "img-src", characterPagePhotoUrl + character.short_name + ".png");
		finalHtml = insertProperty(finalHtml, "description", character.description);

		finalHtml += "<h2>Photos<hr></h2>";
		finalHtml += "<section id='photos' class='row'>";
		for (var i = 0; i < character.photos.length; i++) {
			var html = characterPagePhotoHtml;
			html = insertProperty(html, "fileName", character.short_name + "/" + character.photos[i]);
			finalHtml += html;

			if (i % 3 == 2) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}
			if (i % 2 != 0) {
				html += "<div class='clearfix visible-sm-block'></div>";
			}
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

			if (i % 3 == 2) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}
			if (i % 2 != 0) {
				html += "<div class='clearfix visible-sm-block'></div>";
			}
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

			if (i % 3 == 2) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}
			if (i % 2 != 0) {
				html += "<div class='clearfix visible-sm-block'></div>";
			}
		}
		finalHtml += "</section>";
		return finalHtml;
	}


	global.$dc = dc;
})(window);