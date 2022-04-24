import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-print-offres',
  templateUrl: './print-offres.component.html',
  styleUrls: ['./print-offres.component.css']
})
export class PrintOffresComponent{
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
  sommeOFProducts: any;
  totaleProposition: any;
  idOffreGlobale: any;

  @ViewChild('content', {static: false}) el! : ElementRef;
  print(){
    let pdf = new jsPDF('l','pt','a2');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save(this.value+".pdf");
      }
    })
  }
  constructor(private http: HttpClient) {

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

    this.http.post('http://127.0.0.1:5050/company/checkCompleteOffre', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            if (val == 1) {
              this.http.post('http://127.0.0.1:5050/company/getAllInformationOfAnWorker', queryObj)
                .subscribe(res => {
                  for ([key, val] of Object.entries(res)) {
                    this.visible1 = !this.visible1;
                    this.visible2 = !this.visible2;
                    
                    if (key == "resutFunction1") {
                      console.log(val)
                      // for (var i = 0; i < val.length; i++) {
                      //   if(val[i]=="Step1"){
                      //     this.endOfStep1Operation = i
                      //     console.log(this.endOfStep1Operation)
                      //   }
                      // }
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
                })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You don't have this offre try again !",
              })
            }
          }
        }
      })

      this.listOfProducts()
  }
  printWindow() {
    window.print()
  }
  listOfProducts() {
    var idOffreSend = this.idOffreGlobale;
    var key2, val2;
    var phoneUserNumber: any;
    var decoded;
    var phoneNumber;
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
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
    this.http.post('http://127.0.0.1:5050/company/getAllInformationForStep4', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction7") {
            console.log(val)
            this.getAllProducts = val
          }
          if (key == "resutFunction8") {
            console.log(val)
            this.sommeOFProducts = val[1]
            this.totaleProposition = val[0]
          }

        }
      })
  }

}