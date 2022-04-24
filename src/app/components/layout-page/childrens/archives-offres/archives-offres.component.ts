import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archives-offres',
  templateUrl: './archives-offres.component.html',
  styleUrls: ['./archives-offres.component.css']
})
export class ArchivesOffresComponent implements OnInit {
  allOffre: any
  messageStatus: any;
  idOffreSendGlobal: any;
  idOffre: any
  nomNegociateur: any;
  proposition: any;
  margeNette: any;
  remise: any;
  status: any
  form: FormGroup = new FormGroup({});
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      state: new FormControl('', Validators.required),
      remiseInput: new FormControl('',)
    });

    var key, val;
    var key2, val2;
    var phoneUserNumber: any;
    var decoded;
    var phoneNumber;
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }

    const queryObj = {
      phoneNumber
    }
    this.http.post('http://127.0.0.1:5050/company/archivesOffres', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            this.allOffre = val
          }
        }
      })

    // var idOffreSend = this.idOffre;
    // console.log(idOffreSend)
    // const queryObj2 = {
    //   idOffreSend
    // }

    // this.http.post('http://127.0.0.1:5050/company/getOffreFromArchives', queryObj2)
    //   .subscribe(res => {
    //     for ([key, val] of Object.entries(res)) {
    //       if (key == "resutFunction") {
    //         console.log(val)
    //         for (let item of val) {
    //           this.nomNegociateur = item["nomNegociateur"]
    //           this.proposition = item['globalPropositionStPrWR']
    //           this.margeNette = item["globalMargeNete"]
    //           this.remise = item["remisePercent"]
    //         }
    //       }
    //     }
    //   })

  }
  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {

  }

  editAnOffre(idOffre: any) {
    let key, val;
    this.idOffreSendGlobal = idOffre
    var idOffreSend = this.idOffreSendGlobal
    const queryObj = {
      idOffreSend
    }
    console.log(idOffreSend)
    this.http.post('http://127.0.0.1:5050/company/getOffreFromArchives', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            console.log(val)
            for (let item of val) {
              this.nomNegociateur = item["nomNegociateur"]
              this.proposition = item['globalPropositionStPrWR']
              this.margeNette = item["globalMargeNete"]
              this.remise = item["remisePercent"]
            }
          }
        }
      })
  }
  chooseOption(event: any) {
    if (event.target.value == "En Négociation") {
      this.status = "warning"
    }
    else if (event.target.value == "Completed") {
      this.status = "success"
    }
    else if (event.target.value == "Perdre") {
      this.status = "danger"
    }
  }
  updateInformationOffreNegociation() {
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Choisit le status!",
      })
    }
    else {
      let key, val;
      var nomNegociateurSend = this.nomNegociateur
      var remiseSend = this.remise
      var statusSend = this.status
      var idOffreSend = this.idOffreSendGlobal
      console.log(idOffreSend)
      console.log(this.form.value)
      const queryObj = {
        idOffreSend,
        nomNegociateurSend,
        remiseSend,
        statusSend
      }
      this.http.post('http://127.0.0.1:5050/company/updateInformationOffreNegociation', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if (key == "resutFunction") {
              var key2, val2;
              var phoneUserNumber: any;
              var decoded;
              var phoneNumber;
              phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
              decoded = jwtDecode<JwtPayload>(phoneUserNumber)
              for ([key2, val2] of Object.entries(decoded)) {
                phoneNumber = val2
              }
              const queryObj = {
                phoneNumber
              }
              this.http.post('http://127.0.0.1:5050/company/archivesOffres', queryObj)
                .subscribe(res => {
                  for ([key, val] of Object.entries(res)) {
                    if (key == "resutFunction") {
                      console.log(val)
                      this.allOffre = val
                    }
                  }
                })
            }
          }
        })
    }
  }
}
