import JQuery from 'jquery';
window.$ = window.JQuery = JQuery;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './main.css';

$(document).ready(function() {

  const apiKeyMeteo = process.env.apiKeyOpenWeatherMap;
  const apiKeyImmaginicitta = process.env.apiKeyPixaBay;
  let giorno = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];




  function prelievoImmaginicittaComparsa(citta) {
    let prelievocitta = citta;
    let datiImmaginicitta = `https://pixabay.com/api/?key=${apiKeyImmaginicitta}&q=${prelievocitta}&image_type=photo&lang=it&category=buildings`;
    $.getJSON(datiImmaginicitta, function(dati) {
      console.log(dati);
      $.each(dati.hits, function(i, hit) {
        let immaginiRandom = dati.hits[Math.floor(Math.random(dati.hits[i], dati.hits[i]))].largeImageURL;
        $('body').css({
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + immaginiRandom + ") no-repeat fixed",
          backgroundSize: "cover"
        }).fadeIn('slow');
        console.log(immaginiRandom);

      });


    });



    return prelievocitta;
  };

  function prelievoImmaginicittaScomparsa(citta) {
    let prelievocitta = citta;
    let datiImmaginicitta = `https://pixabay.com/api/?key=${apiKeyImmaginicitta}&q=${prelievocitta}&image_type=photo&lang=it&category=buildings`;
    $.getJSON(datiImmaginicitta, function(dati) {
      console.log(dati);
      $.each(dati.hits, function(i, hit) {
        let immaginiRandom = dati.hits[Math.floor(Math.random(dati.hits[i], dati.hits[i]))].largeImageURL;
        $('body').css({
          background: "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(" + immaginiRandom + ") no-repeat ",
          backgroundSize: "cover"
        }).fadeIn('slow');
        console.log(immaginiRandom);
      });


    });



    return prelievocitta;
  };




  function recuperoElemetsDom_PrevisioneAttuale_SlideDOWN(citta) {
    let prelievocitta = citta;
    let prelievoPrevisioneAttuale = `https://api.openweathermap.org/data/2.5/weather?q=${prelievocitta}&units=metric&lang=it&appid=${apiKeyMeteo}`;

    $.ajax({
      url: prelievoPrevisioneAttuale,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {

          $(".sez_carosello").addClass("d-none");
          $(".tempMIN_attuale, .tempMAX_attuale").removeClass("d-inline");
          $(".IconaGeopozione").removeClass("d-block");
          $("body").addClass("sfondobenvenuto");
          $('#modalError_NonValido').modal('show')

        },

        404: function() {
          $(".tempMIN_attuale, .tempMAX_attuale").removeClass("d-inline");
          $(".IconaGeopozione").removeClass("d-block");
          $(".sez_carosello").addClass("d-none");
          $("body").addClass("sfondobenvenuto").slideDown('slow');
          $('#modalError_CittàNonTrovata').modal('show')
        },
      }
    });

    $(".bloccoMeteo_attuale").addClass("mx-lg-0");

    $(".IMGweatherapp").addClass("float-xl-left ");
    $('.sezioneMeteoAttuale').removeClass('d-none');
    $(".benvenuto").fadeOut('slow');
    prelievoImmaginicittaComparsa(citta);
    $.getJSON(prelievoPrevisioneAttuale, function(dati_PrevisioneAttuale) {
      let prelievoData = new Date(dati_PrevisioneAttuale.dt * 1000);
      console.log(dati_PrevisioneAttuale);
      $(".cittaCercata").text(prelievocitta).fadeIn('slow').animate({
        marginTop: '60px'
      }, {
        duration: 'slow',
        easing: 'swing'
      });
      let icon = dati_PrevisioneAttuale.weather[0].icon;
      $(".IconMeteoAttuale").attr("src", `img/${icon}.svg`).fadeIn();
      $(".day_current").text(giorno[prelievoData.getDay()]).slideDown('slow');
      let descrizione = dati_PrevisioneAttuale.weather[0].description;
      $(".tempo").text(descrizione).slideDown('slow');
      let temp_min = dati_PrevisioneAttuale.main.temp_min;
      let temp_max = dati_PrevisioneAttuale.main.temp_max;
      $(".tempMAX_attuale").text(`${Math.floor(temp_min)}°/`).slideDown('slow').addClass("d-inline");
      $(".tempMIN_attuale").text(`${Math.floor(temp_max)}°`).slideDown('slow').addClass("d-inline");
      $(".IconaGeopozione").slideDown("slow").addClass("d-block");
      $(".sez_carosello").removeClass("d-none");

      return prelievocitta;
    });
  }; /* Funzione Recupero Dati e elementi Dom Previsione Meteo Principale SLIDE_DOWN*/
  function recuperoElemetsDom_PrevisioneTreOre_SlideDOWN(citta) {
    let prelievocitta = citta;
    let prelievoPrevisioneTreOre = `https://api.openweathermap.org/data/2.5/forecast?q=${prelievocitta}&cnt=6&units=metric&lang=it&appid=${apiKeyMeteo}`;
    $.ajax({
      url: prelievoPrevisioneTreOre,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {
          $('#modalError_NonValido').modal('show')
        },



        404: function() {
          $('#modalError_CittàNonTrovata').modal('show')
        },
      },
    });
    prelievoImmaginicittaComparsa(citta);
    $.getJSON(prelievoPrevisioneTreOre, function(dati_PrevisioneTreOre) {

      console.log(dati_PrevisioneTreOre);
      $.each(dati_PrevisioneTreOre.list, function(key, val) {
        console.log(dati_PrevisioneTreOre.list);
        let prelievoData = new Date(dati_PrevisioneTreOre.list[key].dt * 1000);

        $(`#${key}_icon, .icon`).each(function(key) {
          $(this).attr("src", `img/${dati_PrevisioneTreOre.list[key].weather[0].icon}.svg`).fadeIn("slow");
        });
        $(`#${key}_ora`).each(function(key) {
          $(this).text(prelievoData.getHours() + ":00").slideDown('slow');
        });
        $(`#${key}_condizioneMeteo, .condizioneMeteo`).each(function(key) {
          $(this).text(dati_PrevisioneTreOre.list[key].weather[0].description).slideDown('slow');
        });
        $(`#${key}_tempMAX_3_Ore, .treoreMax`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneTreOre.list[key].main.temp_max)}°/`).slideDown('slow').addClass('d-inline');
        });
        $(`#${key}_tempMIN_3_Ore, .treoreMin`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneTreOre.list[key].main.temp_min)}°`).slideDown('slow').addClass('d-inline');
        });
        $(`#${key}_Umidità, .Umidità`).each(function(key) {
          $(this).text(`${dati_PrevisioneTreOre.list[key].main.humidity}%`).slideDown('slow');
        });
        $(".IconaUmidità").slideDown("slow");



      });

    });

    return prelievocitta

  }; /* Funzione Recupero Dati e elementi Doms Previsione Meteo ogni tre ore SLIDE_DOWN*/


  function recuperoElemetsDom_PrevisioneGiornaliera_SlideDOWN(lat, lon) {

    let prelievoCoordinateLat = lat;
    let prelievoCoordinateLon = lon;
    let prelievoPrevisioneGiornaliera = `https://api.openweathermap.org/data/2.5/onecall?lat=${prelievoCoordinateLat}&lon=${prelievoCoordinateLon}&lang=it&units=metric&appid=${apiKeyMeteo}`;
    $.ajax({
      url: prelievoPrevisioneGiornaliera,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {
          $('#modalError_NonValido').modal('show')
        },

        404: function() {
          $('#modalError_CittàNonTrovata').modal('show')
        },
      }
    });
    $.getJSON(prelievoPrevisioneGiornaliera, function(dati_PrevisioneGiornaliera) {
      console.log(dati_PrevisioneGiornaliera);

      $.each(dati_PrevisioneGiornaliera.daily, function(key, val) {

        console.log(dati_PrevisioneGiornaliera.daily[key].temp.max);
        $(`#${key}_icon_Giornaliera, .icon_Giornaliera`).each(function(key) {
          $(this).attr("src", `img/${dati_PrevisioneGiornaliera.daily[key].weather[0].icon}.svg`).fadeIn('slow')
        });
        $(`#${key}_day, .day`).each(function(key) {
          $(this).text(giorno[new Date((dati_PrevisioneGiornaliera.daily[key].dt) * 1000).getDay()]).slideDown('slow');
        });
        $(`#${key}_condizioneMeteoGiornaliera, .condizioneMeteoGiornaliera`).each(function(key) {
          $(this).text(dati_PrevisioneGiornaliera.daily[key].weather[0].description).slideDown('slow');
        });
        $(`#${key}_tempMAX, .tempmaxGiorno`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneGiornaliera.daily[key].temp.max)}°/`).slideDown('slow').addClass('d-inline');
        });
        $(`#${key}_tempMIN, .tempminGiorno`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneGiornaliera.daily[key].temp.min)}°`).slideDown('slow').addClass('d-inline');
        });
        $(`#${key}_UmiditàGiornaliera, .UmiditàGiornaliera`).each(function(key) {
          $(this).text(`${dati_PrevisioneGiornaliera.daily[key].humidity}%`).slideDown('slow');
        });
        $(".IconaUmidità").slideDown("slow");


      });

    });

    return prelievoCoordinateLat;
    return prelievoCoordinateLon;

  }; /* Funzione Recupero Dati e elementi Doms Previsione Meteo giornaliera SLIDE_DOWN*/

  function recuperoElemetsDom_PrevisioneAttuale_SlideUP(citta) {
    let prelievocitta = citta;
    let prelievoPrevisioneAttuale = `https://api.openweathermap.org/data/2.5/weather?q=${prelievocitta}&units=metric&lang=it&appid=${apiKeyMeteo}`;
    $.ajax({
      url: prelievoPrevisioneAttuale,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {


          $('#modalError_NonValido').modal('show')
        },

        404: function() {


          $('#modalError_CittàNonTrovata').modal('show')
        },
      }
    });
    prelievoImmaginicittaScomparsa(citta);
    $.getJSON(prelievoPrevisioneAttuale, function(dati_PrevisioneAttuale) {
      let prelievoData = new Date(dati_PrevisioneAttuale.dt * 1000);
      $(".cittaCercata").text(prelievocitta).fadeOut('slow').animate({
        marginTop: '60px'
      }, {
        duration: 'slow',
        easing: 'swing'
      });
      let icon = dati_PrevisioneAttuale.weather[0].icon;
      $(".IconMeteoAttuale").attr("src", `img/${icon}.svg`).fadeOut();
      $(".day_current").text(giorno[prelievoData.getDay()]).slideUp('slow');
      let descrizione = dati_PrevisioneAttuale.weather[0].description;
      $(".tempo").text(descrizione).slideDown('slow');
      let temp_min = dati_PrevisioneAttuale.main.temp_min;
      let temp_max = dati_PrevisioneAttuale.main.temp_max;
      $(".tempMAX_attuale").text(`${Math.floor(temp_min)}°/`).slideUp('slow').addClass("d-inline");
      $(".tempMIN_attuale").text(`${Math.floor(temp_max)}°`).slideUp('slow').addClass("d-inline");
      $(".IconaUmidità").slideDown("slow").addClass("d-block");

      return prelievocitta;
    });
  }; /* Funzione Recupero Dati e elementi Dom Previsione Meteo Principale SLIDE_DOWN*/
  function recuperoElemetsDom_PrevisioneTreOre_SlideUP(citta) {
    let prelievocitta = citta;
    let prelievoPrevisioneTreOre = `https://api.openweathermap.org/data/2.5/forecast?q=${prelievocitta}&cnt=6&units=metric&lang=it&appid=${apiKeyMeteo}`;
    $.ajax({
      url: prelievoPrevisioneTreOre,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {
          $('#modalError_NonValido').modal('show')
        },

        404: function() {
          $('#modalError_CittàNonTrovata').modal('show')
        },
      }
    });
    prelievoImmaginicittaScomparsa(citta);
    $.getJSON(prelievoPrevisioneTreOre, function(dati_PrevisioneTreOre) {
      let prelievoData = new Date(dati_PrevisioneTreOre.list[key].dt * 1000);
      $.each(dati_PrevisioneTreOre.list, function(key, val) {
        $(`#${key}_icon, .icon`).each(function(key) {
          $(this).attr("src", `img/${dati_PrevisioneTreOre.list[key].weather[0].icon}.svg`).fadeOut("slow");
        });
        $(`#${key}_ora`).each(function(key) {
          $(this).text(prelievoData.getHours() + ":00").slideUp('slow');
        });
        $(`#${key}_condizioneMeteo, .condizioneMeteo`).each(function(key) {
          $(this).text(dati_PrevisioneTreOre.list[key].weather[0].description).slideUp('slow');
        });
        $(`#${key}_tempMAX_3_Ore, .treoreMax`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneTreOre.list[key].main.temp_max)}°/`).slideUp('slow').removeClass('d-inline');
        });
        $(`#${key}_tempMIN_3_Ore, .treoreMin`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneTreOre.list[key].main.temp_min)}°`).slideUp('slow').removeClass('d-inline');
        });
        $(`#${key}_Umidità, .Umidità`).each(function(key) {
          $(this).text(`${dati_PrevisioneTreOre.list[key].main.humidity}%`).slideUp('slow');
        });
        $(".IconaUmidità").slideUp("slow");

      });

    });

    return prelievocitta

  }; /* Funzione Recupero Dati e elementi Doms Previsione Meteo ogni tre ore SLIDE_DOWN*/


  function recuperoElemetsDom_PrevisioneGiornaliera_SlideUP(lat, lon) {

    let prelievoCoordinateLat = lat;
    let prelievoCoordinateLon = lon;
    let prelievoPrevisioneGiornaliera = `https://api.openweathermap.org/data/2.5/onecall?lat=${prelievoCoordinateLat}&lon=${prelievoCoordinateLon}&lang=it&units=metric&appid=${apiKeyMeteo}`;
    $.ajax({
      url: prelievoPrevisioneGiornaliera,
      type: "GET",
      dataType: "JSON",
      data: "",
      success: function() {},
      statusCode: {
        400: function() {

          $('#modalError_NonValido').modal('show')
        },

        404: function() {

          $('#modalError_CittàNonTrovata').modal('show')
        },
      }
    });
    $.getJSON(prelievoPrevisioneGiornaliera, function(dati_PrevisioneGiornaliera) {


      $.each(dati_PrevisioneGiornaliera.daily, function(key, val) {
        let prelievoData = new Array(new Date((dati_PrevisioneGiornaliera.daily[key].dt) * 1000).getDay());
        $(`#${key}_icon_Giornaliera, .icon_Giornaliera`).each(function(key) {
          $(this).attr("src", `img/${dati_PrevisioneGiornaliera.daily[key].weather[0].icon}.svg`).fadeOut('slow');
        });
        $(`#${key}_day, .day`).each(function(key) {
          $(this).text(prelievoData[key]).slideUp('slow');
        });
        $(`#${key}_condizioneMeteoGiornaliera, .condizioneMeteoGiornaliera`).each(function(key) {
          $(this).text(dati_PrevisioneGiornaliera.daily[key].weather[0].description).slideUp('slow');
        });
        $(`#${key}_tempMAX, .tempmaxGiorno`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneGiornaliera.daily[key].temp.max)}°/`).slideUp('slow').addClass('d-inline');
        });
        $(`#${key}_tempMIN, .tempminGiorno`).each(function(key) {
          $(this).text(`${Math.floor(dati_PrevisioneGiornaliera.daily[key].temp.min)}°`).slideUp('slow').addClass('d-inline');
        });
        $(`#${key}_UmiditàGiornaliera, .UmiditàGiornaliera`).each(function(key) {
          $(this).text(`${dati_PrevisioneGiornaliera.daily[key].humidity}%`).slideUp('slow');
        })
        $(".IconaUmidità").slideUp("slow");

      });

    });

    return prelievoCoordinateLat;
    return prelievoCoordinateLon;

  }; /* Funzione Recupero Dati e elementi Doms Previsione Meteo giornaliera SLIDE_DOWN*/



  /***********************Geolocalizzazione************************/
  function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=it&units=metric&appid=${apiKeyMeteo}`, function(dati_Geolocalizzazione) {
      console.log(dati_Geolocalizzazione.name);
      $('body').removeClass('sfondobenvenuto');
      recuperoElemetsDom_PrevisioneAttuale_SlideDOWN(dati_Geolocalizzazione.name);
      recuperoElemetsDom_PrevisioneTreOre_SlideDOWN(dati_Geolocalizzazione.name);
      recuperoElemetsDom_PrevisioneGiornaliera_SlideDOWN(lat, lon);
    });


  };

  function error(error) {
    console.log(error);
    if (error.code == 2) {
      $("#modalError_ConnessioneAssente").modal('show');
    } else {
      console.log("Geoposizione rifiutata")
    }



  }

  navigator.geolocation.getCurrentPosition(success, error)
  /*********************************************************************/

  /*Recupero Tutte le previsioni con un click*/
  $("#search").click(function() {

    let citta = $("input").val();

    if ($("h1,h2,h3,p,img").css({
        display: "none"
      })) {
      $("body").removeClass("sfondobenvenuto");
      recuperoElemetsDom_PrevisioneAttuale_SlideDOWN(citta);
      recuperoElemetsDom_PrevisioneTreOre_SlideDOWN(citta);
      $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${citta}&units=metric&lang=it&appid=${apiKeyMeteo}`, function(dati) {
        let latidutine = dati.coord.lat;
        let longitudine = dati.coord.lon;
        recuperoElemetsDom_PrevisioneGiornaliera_SlideDOWN(latidutine, longitudine)
      });
    } else if ($("h1,h2,h3,p,img").css({
        display: "block"
      })) {
      $("body").addClass("sfondobenvenuto");
      recuperoElemetsDom_PrevisioneAttuale_SlideUP(citta);
      recuperoElemetsDom_PrevisioneTreOre_SlideUP(citta);
      $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${citta}&units=metric&lang=it&appid=${apiKeyMeteo}`, function(dati) {
        let latidutine = dati.coord.lat;
        let longitudine = dati.coord.lon;
        recuperoElemetsDom_PrevisioneGiornaliera_SlideUP(latidutine, longitudine)
      });
    }



  });
  /*******************************************/



});
