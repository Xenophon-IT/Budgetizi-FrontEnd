import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-company-info-sett',
  templateUrl: './company-info-sett.component.html',
  styleUrls: ['./company-info-sett.component.css']
})
export class CompanyInfoSettComponent implements OnInit {
  dataPass: any;
  nameUser: any;
  nameClientCompany: any;
  imageProfileForUser: any;
  firstNameProfile: any;
  lastNameProfile: any;
  emailProfile: any="--";
  taxRegNum: any;
  currency: any ="TND";
  Address: any="--"
  telPhone: any="--";
  fixePhone: any="--"
  logoCompany:any="";

  constructor(private http: HttpClient,private router: Router) {
    var key1,val1;
    this.dataPass = this.router.getCurrentNavigation()?.extras.state;
    //console.log("Page Dashbord")
    //console.log(this.dataPass)
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

    var nameOfCompany =""
    this.http.post('http://127.0.0.1:5050/company/getInformationFromCompanyDB', queryObj)
    .subscribe(res => {
      for ([key1, val1] of Object.entries(res)) {
        if (key1 == "resutFunction") {
          console.log(val1)
          var informationData = val1;
          this.nameClientCompany = informationData[1];
          this.emailProfile = informationData[11];
          this.telPhone = informationData[8];
          this.fixePhone = informationData[9];
          this.taxRegNum = informationData[10];
          this.currency = informationData[5];
          this.Address = informationData[12];
          this.logoCompany = informationData[7];
          console.log(this.logoCompany)
          // for(let i=0; i<informationData[6].length-1;i++){
          //   this.userProfileImage += informationData[6][i]
          // }
        }
      }
    })
  }

  ngOnInit(): void {
  }

  EditInformation(){
    this.router.navigateByUrl('/LayoutPage/EditInfoCompany', { state: {} });
  }
}
