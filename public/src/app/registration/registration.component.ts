import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  play = false;
  src_img = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  newUser:object = {fname:"", lname:"", email:"", password:""};
  constructor( private _httpService:HttpService , private _route: ActivatedRoute ) { }

  ngOnInit() {
    let self = this;
      // CAMERA JQUERY 
      console.log('self', self);
      $("#cam").click(function () {
        // use MediaDevices API
        // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        if (navigator.mediaDevices) {
          console.log(navigator.mediaDevices)
          // access the web cam
          navigator.mediaDevices.getUserMedia({ video: true })
            // permission granted:
            .then(function (stream) {
              $(this).toggleClass('start');
              $("#cam i").toggleClass('play stop');
              video.srcObject = stream;
              let take_picture = document.getElementById('take-picture');
              take_picture.addEventListener('click', takeSnapshot);
              if (self.play) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
              }
              self.play = !self.play;
            })
            // permission denied:
            .catch(function (error) {
              document.body.textContent = 'Could not access the camera. Error: ' + error.name;
            });
        }
  
        function takeSnapshot() {
          let img: any;
          img = document.getElementById('capture');
          var context;
          var width = video.offsetWidth
            , height = video.offsetHeight;
  
          canvas = canvas || document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
  
          context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, width, height);
  
          self.src_img = canvas.toDataURL('image/png');
          // console.log(self.src_img);
          var str= self.src_img;
          var newstr = str.substring(22);
          console.log(newstr);
        }
      })
      
      let video: any;
      video = document.querySelector("#videoElement");
      let canvas: any;
  
      // END CAMERA JQUERY 

      var ct = 0;
    
      $('.next1').on('click', function(e) {
    
        e.preventDefault();
    
        $('#account').animate('slow', function() {
    
          if (ct > 0) {
            $('#account').removeClass('transition visible');
            $('#account').addClass('transition hidden');
    
          }
          $('#account').css('display', 'none');
    
          $('#accountS').addClass('disabled');
          $('#socialP').removeClass('disabled');
          $("#social").transition('fly right');
          $('body').css('background-color', '#06000a');
          $('#social button').removeClass('inverted violet');
          $('#social button').addClass('inverted blue');
          ct++;
    
        });
    
      });
    
      $('.prev1').on('click', function(e) {
    
        e.preventDefault();
        $('#accountS').removeClass('disabled');
        $('#socialP').addClass('disabled');
    
        $('#social').animate('slow', function() {
    
          $('body').css('background-color', '#300032');
          $('#social').transition('hide');
          $("#account").transition('fly right');
    
        });
    
      });
    
      $('.prev2').on('click', function(m) {
    
        m.preventDefault();
        $('#details').addClass('disabled');
        $('#socialP').removeClass('disabled');
    
        $('#personal').animate('slow', function() {
    
          $('body').css('background-color', '#06000a');
          $('#personal').transition('hide');
    
          $('#social').transition('fly right');
        });
    
      });
    
      $('.submit').on('click', function(p) {
        p.preventDefault();
        $('#personal').stop();
      });
    ;
    
  }

  createUser(){
    let observable = this._httpService.createUser(this.newUser)
      observable.subscribe((data:any) =>{
        console.log(data);
        this.newUser = {firstname:"", lastname:"", email:"", password:""}
      })
    
  }

  //jQuery time

}
