 var currentSongNumber = 1;
 var willLoop = 0;
 var willShuffle = 0; 



     var songs = [{
        'name': 'Good Riddance',
        'artist': 'Green Day',
        'album': 'Nimrod',
        'duration': '4:41',
       'fileName': 'song1.mp3',
         'image': 'song1.jpg'
    },
    {
        'name': 'The Wrong Direction',
        'artist': 'Passenger',
        'album': 'All The Little Lights',
        'duration': '3:53',
        'fileName': 'song2.mp3',
         'image': 'song2.jpg'
    },
    {
        'name': 'Snuff',
        'artist': 'Slipknot',
        'album': 'All Hope Is Gone',
        'duration': '3:42',
        'fileName': 'song3.flac',
         'image': 'song3.jpg'
    },
    {
        'name': 'I Bet My Life',
        'artist': 'Imagine Dragons',
        'album': 'Smoke + Mirrors',
        'duration': '3:35',
        'fileName': 'song4.mp3',
         'image': 'song4.png'

    },
	    {
        'name': 'Ode To Sleep',
        'artist': 'Twenty One Pilots',
        'album': 'Regional At Best',
        'duration': '3:35',
        'fileName': 'song5.mp3',
         'image': 'song5.jpg'

    },
	    {
        'name': 'Gone Gone Gone',
        'artist': 'Phillip Phillips',
        'album': 'The World from the Side of the Moon',
        'duration': '3:35',
        'fileName': 'song6.mp3',
         'image': 'song6.jpg'

    }]
 



		//---------------------------------------------------------------------------- Functions ------------------------------------------------------------
   
    function toggleSong() {                             
        var song = document.querySelector('audio');
        if(song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        }
        else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    }


		// -------------------------------------------------------------------------- MUSIC ICONS -----------------------------------------------------------

$(function(){
 
    $('.mute').click(function(){
        $('.mute').removeClass('fa-volume-up').addClass('fa-volume-off');
    })
})

$(function(){
    $('.shuffle').click(function(){
        $('.shuffle').fadeTo(1,.5);
    })
})



$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});



$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});


function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}




 $('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < 4) {
          console.log('if');
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        console.log('else if');
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
          console.log('else ');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
          console.log(' shuffle if');
        var nextSongNumber = randomExcluded(1,4,currentSongNumber);
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 4) {
         console.log('if else current song');
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
         console.log('else if willloop');
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
         console.log(' shuffle else');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

		// ------------------------------------------------------------------MUSIC ICONS END-----------------------------------------------------------
    
		// ----------------------------------------------------------FANCY TIME FORMAT FUNCTION--------------------------------------------------------
    
    function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
 
    
 // ----------------------------------------------------------------FANCY TIME FORMAT FUNCTION END------------------------------------------------------  
    
    function updateCurrentTime(){
        var song = document.querySelector("audio");
      //  console.log(song.currentTime);
      //  console.log(song.duration);
        var currentTime = Math.floor(song.currentTime);
        currentTime = fancyTimeFormat(currentTime);
        var duration = Math.floor(song.duration);
        duration = fancyTimeFormat(duration);
        $(".time-elapsed").text(currentTime);
        $(".song-duration").text(duration);
    }

  // ------------------------------------------------------------ CHANGE CURRENT SONG DETAILS FUNCTION----------------------------------------------------

   function changeCurrentSongDetails(songs) {
    $('.current-song-image').attr('src','images/' + songs.image);
    $('.current-song-name').text(songs.name);
    $('.current-song-album').text(songs.album);
   }

       
 // --------------------------------------------------------------CHANGE CURRENT SONG DETAILS FUNCTION END-------------------------------------------------

    
 // ------------------------------------------------------------- addSongNameClickEvent FUNCTION-----------------------------------------------------------  
    
//    function addSongNameClickEvent(songName, position){
//        var id = '#song'+ position;
//        $(id).click(function() {
//        var audio = document.querySelector('audio');
//        var currentSong = audio.src;
//        if(currentSong.search(songName) != -1)              
//        {
//        toggleSong();
//        }
//        else {
//        audio.src = songName ;
//        toggleSong();
//        }
//        });
//      }}
    


    function addSongNameClickEvent(songObj,position) {
         var songName = songs.fileName; // New Variable
         var songName = songObj.fileName; // New Variable 
        var id = '#song'+ position;
      $(id).click(function() {
         var audio = document.querySelector('audio');
        var currentSong = audio.src;
          if(currentSong.search(songName) != -1)          
        {
        toggleSong();
        
        }
        else {
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(songObj); 
        
       }
      });
    };

    
    
    
 //---------------------------------------------------------------------FUNCTION END------------------------------------------------------------------------



 // --------------------------------------------------------------- INPUT NAME FUNCTION---------------------------------------------------------------------
   

    $('.welcome-screen button').on('click', function() {
    var name = $('#name-input').val();                           
         var email = $('#email-input').val();  
         var pass = $('#pass-input').val();           
       
    if(name.length > 3){
      var message = "Welcome, " + name;                          
        
      $('.main .user-name').text(message);
      $('.welcome-screen').addClass('hidden');
      $('.main').removeClass('hidden');
      $(".content h1").text(message);
     }
     else{
         $("#name-input").addClass("error"); 
     }
       
});


 // -------------------------------------------------------------- INPUT NAME FUNCTION END-------------------------------------------------------------------

  
 
 //---------------------------------------------------------------------PLAY ICON ON CLICK =-----------------------------------------------------------------
 
   $(".play-icon").click(function(){
       toggleSong();                            
    
    });  

 // --------------------------------------------------------------------PLAY ICON ON CLICK END------------------------------------------------------------------
    
 // -------------------------------------------------------------------------- SPACE BAR-----------------------------------------------------------------------
     $("body").keypress(function(event){
         var target = event.target;
        if( event.keyCode == 32 && target.tagName !='INPUT')
            {
                toggleSong();                 
      }
    });
    
 // ------------------------------------------------------------------- PLAY A LOCAL SONG FUNC-------------------------------------------------------------------

 
var $audio = $('#myAudio');
$('input').on('change', function(e) {
  var target = e.currentTarget;
  var file = target.files[0];
  var reader = new FileReader();
  
  console.log($audio[0]);
   if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio.attr('src', e.target.result);
            $audio.play();
        }
        reader.readAsDataURL(file);
    }
});

 // ----------------------------------------------------------------------- TOTAL SONGS --------------------------------------------------------------------------- 
 $(function(){
     var totalSongs = songs.length;
     $('#num-songs').text(totalSongs);
 });


 // -------------------------------------------------------------------------- FORWARD------------------------------------------------------------------------------
   $('.fa-step-forward').click(function(){
        var audio = document.querySelector("audio");
        if(currentSongNumber <songs.length) {
          
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
       else{
           $('.fa-step-forward').addClass('disabled');
       }
 
      });   
       
        $('.fa-step-backward').click(function(){
        var audio = document.querySelector("audio");
        if(currentSongNumber <songs.length) {
      
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber - 1;
    }
       else{
           $('.fa-step-backward').addClass('disabled');
       }
       
       
        });
       
       
       
 


// ------------------------------------- Current time & duration of song ------------
 
//   var songList = ['Tamma song','humma song','Nashe si chad gayi','The breakup song']; 

//   var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];                  

//   var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal,'Arijit Singh'];

//   var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];

//   var durationList = ['2:56','3:15','2:34','2:29'];



   window.onload = function()
   {  
         changeCurrentSongDetails(songs[0]);
        
//       for(var i =0; i < songList.length;i++) {
//        var name = '#song' + (i+1);
//        var song = $(name);x
//        song.find('.song-name').text(songList[i]);
//        song.find('.song-artist').text(artistList[i]);
//        song.find('.song-album').text(albumList[i]); // Added
//        song.find('.song-length').text(durationList[i]); // Added
//    }
       
       for(var i =0; i < songs.length;i++) {      // array of objects is being used
        var obj = songs[i];                       // var obj will store song[0]  and so on 
        var name = '#song' + (i+1);
        var song = $(name);                       // song = id of song ( e.g # song1)
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);               
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }
       
      updateCurrentTime();
      setInterval(function(){
           updateCurrentTime();
      },1000);
       $('#songs').DataTable({
        paging: false
        });
   }
   
   
       

 // ---------------------------------------------------------------------PLAYLIST SONGS --------------------------------------------------------------------
      
       
  
//    addSongNameClickEvent(fileNames[0],1);                    
//    addSongNameClickEvent(fileNames[1],2);
//    addSongNameClickEvent(fileNames[2],3);
//    addSongNameClickEvent(fileNames[3],4); 
    
      
//      for (var i = 0; i < fileNames.length ; i++) {
//           addSongNameClickEvent(fileNames[i],i+1)
//          } 

 
