import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-to-client',
  templateUrl: './send-to-client.component.html',
  styleUrls: ['./send-to-client.component.css']
})
export class SendToClientComponent implements OnInit {
  @ViewChild('content', {static: false}) el! : ElementRef;
  print(){
    let pdf = new jsPDF('p','pt','a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save(this.value+".pdf");
      }
    })
  }

  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  value = '';
  idOffreGlobale = '';

  logoCompany: any;
  nameCompany: any;
  phoneNumber: any;
  fixNumber: any;
  ville: any;
  codePostale: any;
  AdressLocale: any;
  Email: any;
  clientName: any
  dateToday: any;
  totalePropositionS1: any;
  totalePropositionS2: any;
  totalePropositionS3: any;
  totalePropositionS4: any;
  globalPropositionStPrWR: any;

  negociataion: any
  constructor(private http: HttpClient) {
    let today = new Date().toLocaleDateString()
    this.dateToday = today;
   }

  ngOnInit(): void {
  }

  public ClickPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 190;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.idOffreGlobale+'.pdf');
    });
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
    var phoneNumber: any;
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    console.log(this.idOffreGlobale)
    const queryObj = {
      idOffreSend,
      phoneNumber
    }

    this.http.post('http://localhost:5050/company/checkCompleteOffre', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            if (val == 1) {
              this.http.post('http://localhost:5050/company/getAllInformationOfAnWorker', queryObj)
                .subscribe(res => {
                  for ([key, val] of Object.entries(res)) {
                    this.visible1 = !this.visible1;
                    // this.visible2 = !this.visible2;
                  }
                  this.getAllNesscaryInformation(idOffreSend,phoneNumber)
                })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Aucune offre ne correspond à votre recherche !",
              })
            }
          }
        }
      })
  }
  getAllNesscaryInformation(idOffreSend:any, phoneNumber:any){
    let key, val;
    const queryObj = {
      idOffreSend,
      phoneNumber
    }

    this.http.post('http://localhost:5050/company/getAllNesscaryInformation', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunctionOFCompanies") {
            this.logoCompany = val[3];
            // for (var item in val){
            //   console.log(item[3])
              this.logoCompany = val[3];
              this.nameCompany = val[1];
              this.phoneNumber = val[4];
              this.fixNumber = val[5];
              this.codePostale = val[10];
              this.ville = val[8]
              this.AdressLocale = val[9]
              this.Email = val[6]
            // }
            console.log(val)
          }
          if (key == "resutFunctionForStep1") {
            for(let i=0; i<val.length;i++){
              this.totalePropositionS1 = val[i]["totaleProposition"]
            }
            console.log(val)
          }
          if (key == "resutFunctionForStep2") {
            for(let i=0; i<val.length;i++){
              this.totalePropositionS2 = val[i]["totaleProposition"]
            }
            console.log(val)
          }
          if (key == "resutFunctionForStep3") {
            for(let i=0; i<val.length;i++){
              this.totalePropositionS3 = val[i]["totaleProposition"]
            }
            console.log(val)
          }
          if (key == "resutFunctionForStep4") {
            this.totalePropositionS4 = val[0]
            // for(let i=0; i<val.length;i++){
            //   this.totalePropositionS4 = val[i]["totaleProposition"]
            // }
            console.log(val)
          }
          if (key == "resutFunctionForGlobalOffre") {
            console.log("FFFFFFFFFFF")
            console.log(val)
            // this.negociataion = val[i]["nomNegociateur"]
            for(let i=0; i<val.length;i++){
              this.globalPropositionStPrWR = val[i]["globalPropositionStPrWR"]
              this.negociataion = val[i]["nomNegociateur"]
            }
            console.log(this.globalPropositionStPrWR)
            console.log(this.negociataion)
            console.log("FFFFFFFFFFF")
          }
          if (key == "resutFunctionForNegotitaion") {
            console.log(val)
            // console.log("FFFFFFFFFFF")
          }
        }
      })
  
  }
}