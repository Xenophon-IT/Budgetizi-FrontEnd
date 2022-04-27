import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate-phase4-offer',
  templateUrl: './calculate-phase4-offer.component.html',
  styleUrls: ['./calculate-phase4-offer.component.css']
})
export class CalculatePhase4OfferComponent implements OnInit {
  visible1: boolean = false;
  nameCompany: any;
  value = '';
  informationGlobOff : any;
  sommeOFProducts: any;
  getAllProducts: any;
  constructor(private http:HttpClient) { 
  }

  ngOnInit(): void {
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
    const queryObj={
      idOffreSend,
      phoneNumber
    }

    this.visible1 = !this.visible1;

    this.http.post('http://20.127.19.239/company/calculPhase4Offre', queryObj)
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
              // this.visible1 = !this.visible1;
              this.informationGlobOff = val;
            }
          }
        }
      })


      this.http.post('http://20.127.19.239/company/getAllInformationForStep4', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          this.visible1 = !this.visible1;
          if (key == "resutFunction7") {
            console.log(val)
            this.getAllProducts = val
          }
          if (key == "resutFunction8") {
            console.log(val)
            this.sommeOFProducts = val[3]
          }

        }
      })

  }

}

