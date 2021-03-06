import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {
  public webcamImage: any = WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  form: FormGroup = new FormGroup({});
  form1: FormGroup = new FormGroup({});
  imageUserData: any;
  phoneNumber: any;
  myModal: any;
  phoneNumberToAnCode: any;
  timeLeft: number = 60;
  interval: any;
  dataInformation: any;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      emailAdress: new FormControl('', Validators.required),
      passwordUser: ['', [Validators.required]],
    });
    this.form1 = fb.group({
      codeNotif: ['', [Validators.required,]]
    })
    this.imageUserData = "../assets/img/default-avatar.jpg";
    // sessionStorage.setItem('phoneNumberOfUser','0');
    let phoneNumber: any;
    phoneNumber = sessionStorage.getItem('phoneNumberOfUser');
    console.log(phoneNumber)
    // if(phoneNumber!=0){
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Déjà vous avez un compte ouvert!',
    //   })
    //   this.router.navigateByUrl('/HomePage', {});
    // }
    // else{
    Swal.fire(
      'Je suis pas un robot',
      'Click x2 times to login?',
      'question',
    )
    // }
  }

  ngOnInit(): void {
  }

  get exformFunction() { return this.form.controls; }
  get exformFunction1() { return this.form1.controls; }


  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('Saved webcam image', webcamImage);
    this.imageUserData = webcamImage.imageAsDataUrl;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  clicksub() {
    let key, val;
    let key2, val2;
    var dataSend = this.form.value;
    var faceRecogn = this.imageUserData;
    var decoded;
    var phoneNumberModified;
    var resultLogin = "";
    this.timeLeft = 60;
    this.startTimer()
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        // title: 'Oops...',
        text: 'Vérifier les données saisies',
      })
    }
    // console.log(dataSend)
    const queryObj = {
      dataSend,
      faceRecogn
    }

    this.http.post('http://localhost:5050/client/signIn', queryObj)
      .subscribe(res => {
        // console.log(res)
        for ([key, val] of Object.entries(res)) {
          if (key == "resultLogin") {
            resultLogin = val;
          }
          if (key == "variableLogin") {
            // console.log(val);
            if (val == 0) {
              Swal.fire({
                icon: 'error',
                // title: 'Oops...',
                text: 'pas de compte associé à cet email',
              })
              this.myModal = "";
            }
            else {
              this.myModal = "myModal";
              console.log(resultLogin);
              decoded = jwtDecode<JwtPayload>(resultLogin[1])
              for ([key2, val2] of Object.entries(decoded)) {
                console.log(val2)
                phoneNumberModified = val2
                console.log(phoneNumberModified)
                phoneNumberModified = phoneNumberModified.replace(phoneNumberModified.charAt(5), '*')
                phoneNumberModified = phoneNumberModified.replace(phoneNumberModified.charAt(6), '*')
                phoneNumberModified = phoneNumberModified.replace(phoneNumberModified.charAt(8), '*')
                phoneNumberModified = phoneNumberModified.replace(phoneNumberModified.charAt(9), '*')
                phoneNumberModified = phoneNumberModified.replace(phoneNumberModified.charAt(10), '*')
                this.phoneNumber = phoneNumberModified;
                this.phoneNumberToAnCode = val2;
              }
            }
          }
        }
      })

  }

  sendAnotherCode() {
    var phoneNumberToAnCodeLocal = this.phoneNumberToAnCode;
    this.timeLeft = 60;
    const queryObj = {
      phoneNumberToAnCodeLocal
    }
    // console.log(phoneNumberToAnCodeLocal)
    this.http.post('http://localhost:5050/client/sendAnotherCodePhone', queryObj)
      .subscribe(res => {
      })
  }

  clicksub1() {
    let key, val;
    let key1, val1;
    var dataSend = this.form1.value;
    var dataSend2 = this.form.value;
    // console.log(dataSend)
    // console.log(this.timeLeft)
    const queryObj = {
      dataSend,
      dataSend2
    }
    // console.log(this.timeLeft)
    if (this.timeLeft == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "60 secondes dépassées",
      })
    }
    else {
      this.http.post('http://localhost:5050/client/checkCodeNotif', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if (key == "variableCodeCheck") {
              if (val == 0) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Code erroné!",
                })
              }
              else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Vous êtes bien connecté!!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.myModal = "";
                this.http.post('http://localhost:5050/client/getInformationClient', queryObj)
                  .subscribe(res => {
                    for ([key1, val1] of Object.entries(res)) {
                      if (key1 == "resutFunction") {
                        console.log(val1);
                        this.dataInformation = val1;
                        this.router.navigateByUrl('/LayoutPage', { state: { dataInformation: this.dataInformation } });
                      }
                    }
                  })
                //this.router.navigateByUrl('/LayoutPage', { state: {dataInformation: this.dataInformation} });
                this.myModal = "";
              }
            }
          }
        })
    }
    //reset the input of code notification
    this.form1.reset();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // console.log(this.timeLeft)
      }
    }, 1000)
  }

}
