import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-monitoring-of-works',
  templateUrl: './monitoring-of-works.component.html',
  styleUrls: ['./monitoring-of-works.component.css']
})
export class MonitoringOfWorksComponent implements OnInit {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  nameCompany: any;
  form: FormGroup = new FormGroup({});
  globalFormula: any;
  listfullName: any;
  valGIWCFC: any;
  GIFWCGO: any;
  idOffreSendGlobale: any;
  value: number = 70;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  workerNameGlobale: any;
  FG: any;
  nbWorkOnCompany: any;
  nbWorkOnSite: any;
  idWorker: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      idOffre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\-[0-9]{1,3}')
      ]),
      fullName: new FormControl('', Validators.required),
      nbHWOC: new FormControl('', Validators.required),
      nbHWOS: new FormControl('', Validators.required),
    });
    let key, val;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    const queryObj={
      phoneNumber
    }
    this.http.post('http://127.0.0.1:5050/company/GetAllWorkerCompany', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            //console.log(val);
            this.listfullName = val;
          }
        }
      })
  }



  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {
  }

  addWorkerInOffre() {
    this.visible1 = !this.visible1
    var dataSend = this.form.value;
    // console.log(dataSend)
    // console.log(this.value)
  }

  searchOnOffreBy() {
    this.visible2 = !this.visible2

  }
  onEnter(valueModi: string) {
    var key, val;
    var idOffreSend = valueModi
    this.idOffreSendGlobale = valueModi
    var variabeTest: number;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)

    const queryObj = {
      idOffreSend,
      phoneNumber
    }
    // console.log(valueModi)
    this.http.post('http://127.0.0.1:5050/company/getOffreStep3ById', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunctionGIFWCGO") {
            console.log(val)
            if (val == 1) {
              variabeTest = 1;
            }
            else {
              variabeTest = 0;
              //console.log(val);
              this.GIFWCGO = val;
            }
          }
          if (variabeTest == 0) {
            // console.log(variabeTest)
            // console.log(this.GIFWCGO);
            this.visible3 = !this.visible3
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "You don't have this offre try again !",
            })
          }
        }
      })
  }


  addToOffre() {
    this.visible3 = !this.visible3
    var dataSend = this.form.value;
    var valueSend = this.value;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Complete all filed please!",
      })
    }
    else {
      //console.log(dataSend)
      //console.log(this.value)
      var key, val;
      const queryObj = {
        dataSend,
        valueSend,
        phoneNumber
      }
      this.http.post('http://127.0.0.1:5050/company/Step3Offre', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if (key == "resutFunction") {
              if (val == 1) {
                Swal.fire(
                  'Good job!',
                  'You add this worker!',
                  'success'
                )
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Check on your Id-Offre!",
                })
              }
            }
          }
        })
      this.form.reset();
    }
  }

  deleteAnWorkerFromOffre(workerProfile: any) {
    var key, val;
    var workerProfileSend = workerProfile;
    var idOffreSendGlobaleSend = this.idOffreSendGlobale;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    const queryObj = {
      workerProfileSend,
      idOffreSendGlobaleSend,
      phoneNumber
    }
    this.visible3 = !this.visible3
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post('http://127.0.0.1:5050/company/deleteAnWorkerFromOffreStep3', queryObj)
          .subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              if (key == "resutFunction") {
                if (val == 1) {
                  this.visible3 = !this.visible3
                  this.onEnter(this.idOffreSendGlobale)
                }
              }
            }
          })
      }
    })
  }
  editAnWorkerFromOffreStep3(workerNameGlobale: any, FG: any, nbWorkOnCompany: any, nbWorkOnSite: any, idWorker: any) {
    this.workerNameGlobale = workerNameGlobale
    this.FG = FG
    this.nbWorkOnCompany = nbWorkOnCompany
    this.nbWorkOnSite = nbWorkOnSite
    this.idWorker = idWorker
  }
  updateInformationClientTODB() {
    var key, val
    var nbWorkOnCompanySend = this.nbWorkOnCompany
    var nbWorkOnSiteSend = this.nbWorkOnSite
    var FGSend = this.FG
    var workerNameGlobaleSend = this.workerNameGlobale
    var idOffreSendGlobaleSend = this.idOffreSendGlobale
    var idWorkerGlobaleSend = this.idWorker

    const queryObj = {
      nbWorkOnCompanySend,
      nbWorkOnSiteSend,
      FGSend,
      workerNameGlobaleSend,
      idOffreSendGlobaleSend,
      idWorkerGlobaleSend
    }
    this.http.post('http://127.0.0.1:5050/company/updateInformationOfStep3', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          this.visible3 = !this.visible3
          this.onEnter(this.idOffreSendGlobale)
        }
      })
  }
}