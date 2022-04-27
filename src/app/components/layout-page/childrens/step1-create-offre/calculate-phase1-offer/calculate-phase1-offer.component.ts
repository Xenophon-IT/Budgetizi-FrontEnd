import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-calculate-phase1-offer',
  templateUrl: './calculate-phase1-offer.component.html',
  styleUrls: ['./calculate-phase1-offer.component.css']
})
export class CalculatePhase1OfferComponent implements OnInit {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  getAllInformation: any;
  getAllInformationForStep1: any;

  nameCompany: any;
  value = '';
  informationGlobOff : any;
  constructor(private http:HttpClient) { 

  }

  ngOnInit(): void {
  }

  addWorkerInOffre() {
    this.visible1 = !this.visible1
  }

  searchOnOffreBy() {
    this.visible2 = !this.visible2

  }
  onEnter(value: string) {
    var key, val;
    this.value = value;
    //console.log(this.value);
    var idOffreSend = value;
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
      idOffreSend,
      phoneNumber
    }

    this.http.post('http://20.127.19.239/company/calculPhase1Offre', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            console.log(val);
            if(val.length==0){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You don't have this offre try again !",
              })
            }
            else{
              this.informationGlobOff = val;
              this.visible1 = !this.visible1;
              this.visible2 = !this.visible2
            }
          }
        }
      })


      this.http.post('http://20.127.19.239/company/getAllInformationForStep1', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          this.visible1 = !this.visible1;
          if (key == "resutFunction1") {
            console.log(val)
            this.getAllInformation = val;
          }
          if (key == "resutFunction2") {
            console.log(val)
            this.getAllInformationForStep1 = val
          }
        }
      })

  }

}

