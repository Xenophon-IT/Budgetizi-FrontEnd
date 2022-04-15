import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-dashbord-page',
  templateUrl: './dashbord-page.component.html',
  styleUrls: ['./dashbord-page.component.css']
})
export class DashbordPageComponent implements OnInit {
  dataPass: any;
  nameUser: any;
  nameClientCompany: any;
  imageProfileForUser: any;
  firstNameProfile: any;
  lastNameProfile: any;
  emailProfile: any;
  logoCompany: any = "D:\Dali\B.IZI.V.Alfa\ButGitizi\Partie-BackEnd\Images\default-avatar.jpg";

  constructor(private http: HttpClient, private router: Router) {
    var key = "phoneUserNumber";
    let key1,val1;
    let key2,val2;
    var decoded;
    var phoneUserNumber:any;
    var phoneNumber;

    this.dataPass = this.router.getCurrentNavigation()?.extras.state;
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
          var informationData = val1;
          nameOfCompany = informationData[1]; 
          this.nameClientCompany = nameOfCompany;
          console.log(informationData[7])
          // this.logoCompany = informationData[7]

        }
      }
    })
  }

  ngOnInit(): void {
  }
  
}
