import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-offre-finale',
  templateUrl: './offre-finale.component.html',
  styleUrls: ['./offre-finale.component.css']
})
export class OffreFinaleComponent implements OnInit {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  nameCompany: any;
  value = '';
  propositionTotale: any;
  informationGlobOff: any;
  reveientAndFG: any;
  revientTotale: any;
  margeBrute: any;
  margeFinale: any;
  margeNet: any;
  getAllInformation: any;
  endOfStep1Operation: any;
  getAllInformationForStep1: any;
  getAllInformationForStep2Worker: any;
  getAllInformationForStep2: any;
  getAllInformationForStep3Worker: any;
  getAllInformationForStep3: any;
  getAllInformationForFinalOffre: any;
  getAllProducts: any;
  globalMargeNete: any;
  totaleProposition: any;
  idOffreGlobale: any;
  sommeOFProducts: any

  constructor(private http: HttpClient) {
    var phoneUser = sessionStorage.getItem('phoneNumberOfUser');
    var emailProfile = sessionStorage.getItem('emailProfile');
    console.log(
      phoneUser
    );
    console.log(
      emailProfile
    );
  }

  ngOnInit(): void {
  }

  onEnter(value: string) {
    var key, val;
    this.value = value;
    //console.log(this.value);
    var idOffreSend = value;
    this.idOffreGlobale = value
    var key2, val2;
    var phoneUserNumber: any;
    var decoded;
    var phoneNumber;
    phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
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

    this.http.post('http://localhost:5050/company/getAllInformationOfAnWorker', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          
          if (key == "resutFunction") {
            console.log("Test val")
            console.log(val)
            if (val == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You don't have this offre try again !",
              })
            }
          }
          else {
            this.visible1 = !this.visible1;
            if (key == "resutFunction1") {
              console.log(val)
              this.getAllInformation = val;
            }
            if (key == "resutFunction2") {
              console.log(val)
              this.getAllInformationForStep1 = val
            }
            if (key == "resutFunction3") {
              console.log(val)
              this.getAllInformationForStep2Worker = val
            }
            if (key == "resutFunction4") {
              console.log(val)
              this.getAllInformationForStep2 = val
            }
            if (key == "resutFunction5") {
              console.log(val)
              this.getAllInformationForStep3Worker = val
            }
            if (key == "resutFunction6") {
              console.log(val)
              this.getAllInformationForStep3 = val
            }
            if (key == "resutFunction8") {
              console.log(val)
              this.getAllInformationForFinalOffre = val
            }
          }
        }
      })

    // this.http.post('http://localhost:5050/company/checkCompleteOffre', queryObj)
    //   .subscribe(res => {
    //     for ([key, val] of Object.entries(res)) {
    //       if (key == "resutFunction") {
    //         if (val == 1) {

    //         }
    //         else {
    //           Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: "You don't have this offre try again !",
    //           })
    //         }
    //       }
    //     }
    //   })
  }
  printWindow() {
    window.print()
  }
  listOfProducts(event: any) {
    var idOffreSend = this.idOffreGlobale;
    var key2, val2;
    var phoneUserNumber: any;
    var decoded;
    var phoneNumber;
    phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }

    console.log("Phone Number after decoding")
    const queryObj = {
      idOffreSend,
      phoneNumber
    }
    let key, val;
    console.log(event.target.checked);
    if (event.target.checked == true) {
      this.visible2 = !this.visible2
      this.http.post('http://localhost:5050/company/getAllInformationForStep4', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            // this.visible1 = !this.visible1;
            if (key == "resutFunction7") {
              console.log(val)
              this.getAllProducts = val
            }
            if (key == "resutFunction8") {
              console.log("sssssssssssssssssssssss")
              console.log(val)
              this.globalMargeNete = val[1]
              this.totaleProposition = val[0]
              this.sommeOFProducts = val[3]
            }

          }
        })
    }
    else {
      this.visible2 = !this.visible2
    }
  }

  addNegotiation() {
    Swal.fire({
      title: 'Nom N??gociateur',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Envoyer',
      showLoaderOnConfirm: true,
      preConfirm: (nameNegociateur) => {
        console.log(nameNegociateur)
        var key2, val2;
        var key, val;
        var phoneUserNumber: any;
        var decoded;
        var phoneNumber;
        var idOffreSend = this.idOffreGlobale;
        phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
        decoded = jwtDecode<JwtPayload>(phoneUserNumber)
        for ([key2, val2] of Object.entries(decoded)) {
          phoneNumber = val2
        }
        console.log("Phone Number after decoding")
        console.log(phoneNumber)
        const queryObj = {
          phoneNumber,
          idOffreSend,
          nameNegociateur
        }

        this.http.post('http://localhost:5050/company/addNegociateur', queryObj)
          .subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              if (key == "resutFunction") {
                if (val == 1) {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cette offre est en train de n??gocier',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              }
            }
          })
      }
    })
  }


}