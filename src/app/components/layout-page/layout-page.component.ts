import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  dataPass: any;
  nameUser: any;
  nameClientCompany: any;
  imageProfileForUser: any="";
  firstNameProfile: any;
  lastNameProfile: any;
  emailProfile: any;
  phoneUserNumber: any;
  dateNow: any;
  constructor(private datePipe: DatePipe, private router: Router) {
    let valueDataInformation;
    let key = "dataInformation"
    this.dataPass = this.router.getCurrentNavigation()?.extras.state;
    // console.log("Page Dashbord")
    // console.log(this.dataPass)
    var date = new Date();
    this.dateNow = this.datePipe.transform(date,"yyyy-MM-dd")
    //console.log(this.dateNow)

    for (key in this.dataPass) {
      valueDataInformation =  this.dataPass["dataInformation"];
    }
    var valueDataFinale = valueDataInformation[0]
    // console.log(valueDataFinale)
    // console.log('eeeeeeee')
    

    this.firstNameProfile = valueDataInformation[1];
    this.lastNameProfile = valueDataInformation[2];
    this.emailProfile = valueDataInformation[3];
    this.imageProfileForUser = valueDataInformation[6];
    this.phoneUserNumber = valueDataInformation[4];


    // for (let i = 0; i < valueDataInformation[6].length-1; i++) {
    //   this.imageProfileForUser +=  valueDataInformation[6][i]
    // }
    console.log(this.imageProfileForUser)

    sessionStorage.setItem('phoneNumberOfUser',this.phoneUserNumber);
    this.router.navigateByUrl('/LayoutPage/PageDashbord', {});

  }

  ngOnInit(): void {
  }

  settingsInfoCompany() {
  }
}
