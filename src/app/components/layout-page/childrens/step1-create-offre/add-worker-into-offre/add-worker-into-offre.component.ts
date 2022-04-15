import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-add-worker-into-offre',
  templateUrl: './add-worker-into-offre.component.html',
  styleUrls: ['./add-worker-into-offre.component.css']
})
export class AddWorkerIntoOffreComponent implements OnInit {
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
  idWorkerName: any;


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      idOffre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\-[0-9]{1,3}')
      ]),
      lfN: new FormControl('', Validators.required),
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
            console.log(val);
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
    this.http.post('http://127.0.0.1:5050/company/getOffreById', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunctionGIFWCGO") {
            console.log("Test 2022")
            console.log(val)

            if (val.length == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vérifier encore une autre fois !",
              })
            }
            else {
              this.visible3 = !this.visible3
              this.GIFWCGO = val;
            }
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
      console.log(dataSend)
      //console.log(this.value)
      var key, val;
      const queryObj = {
        dataSend,
        valueSend,
        phoneNumber
      }
      this.http.post('http://127.0.0.1:5050/company/Step1Offre', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if (key == "resutFunction") {
              if (val == 1) {
                Swal.fire(
                 // 'Good job!',
                  'Ajout effectué!',
                  'success'
                )
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Existe déjà!",
                })
              }
            }
          }
        })
      this.form.reset();
    }
  }

  editAnWorkerFromOffre(workerName: any, FGLocal: any, nbWorkOnCompanylocal: any, nbWorkOnSiteLocal: any, idWorkerNameLocal: any) {
    this.workerNameGlobale = workerName
    this.FG = FGLocal
    this.nbWorkOnCompany = nbWorkOnCompanylocal
    this.nbWorkOnSite = nbWorkOnSiteLocal
    this.idWorkerName = idWorkerNameLocal
    //console.log(workerName)
    //console.log(idWorkerNameLocal)
  }

  updateInformationClientTODB() {
    //console.log(this.workerNameGlobale)
    //console.log(this.FG)
    //console.log(this.nbWorkOnCompany)
    //console.log(this.nbWorkOnSite)

    var key, val;
    var workerNameGlobaleSend = this.workerNameGlobale
    var FGSend = this.FG
    var nbWorkOnCompanySend = this.nbWorkOnCompany
    var nbWorkOnSiteSend = this.nbWorkOnSite
    var idWorkerNameSend = this.idWorkerName
    var idOffreSendGlobaleSend = this.idOffreSendGlobale;
    const queryObj = {
      workerNameGlobaleSend,
      FGSend,
      nbWorkOnCompanySend,
      nbWorkOnSiteSend,
      idWorkerNameSend,
      idOffreSendGlobaleSend
    }
    this.http.post('http://127.0.0.1:5050/company/updateInformationOfStep1', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          this.visible3 = !this.visible3
          this.onEnter(this.idOffreSendGlobale)
        }
      })
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
        this.http.post('http://127.0.0.1:5050/company/deleteAnWorkerFromOffre', queryObj)
          .subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              this.visible3 = !this.visible3
              this.onEnter(this.idOffreSendGlobale)
            }
          })
      }
    })
  }
}
