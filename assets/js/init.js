$(document).ready(function() {
  
  //Inicializacao visual
  menu_scroll();

  //Load participantes
  load_user();

});

function menu_scroll() {

  $('.parallax').parallax();

  $('.button-collapse').sideNav();
 
  $('.scrollspy').scrollSpy({
    scrollOffset: 0
  });

  var controleNav = false;
  
  $(document).scroll(function(e) {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > 100) {
      if (controleNav == false) {
        $('nav').first().removeClass('transparent');
        controleNav = true;
      }
    } else {
      if (controleNav == true) {
        $('nav').first().addClass('transparent');
        controleNav = false;
      }
    }
  });

}

function load_user() {
  
    setInterval(function() {
       
       $.ajax({
        url: 'https://api.github.com/repos/allythy/Minicurso-de-git-e-Github/contents/participantes',
        dataType: 'json',
          success: function(data){             

              var element_html = '<h2 class="light">Participantes</h2>';

              [].forEach.call( data , function(e){                  

                  if( e.path.indexOf('html') != -1 )
                    readFileHtml(e.path, function(argument) {                   

                        element_html += argument;

                    })

              });  

              $('#user').html( element_html );          

          },
      }) 

    }, 1000); 

}

function readFileHtml(file, callback) {

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);

    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {                              
                callback(rawFile.responseText);
            }
        }
    }

    rawFile.send(null);

}