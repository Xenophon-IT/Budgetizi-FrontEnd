import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.css']
})
export class InfoClientComponent implements OnInit {
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  userProfileImage: any = "";
  FirstName: any = "";
  LastName: any = "";
  passwordProfile: any = "";
  emailProfile: any = "";

  constructor(private http: HttpClient, private router: Router) {
    var key, val;
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
    this.http.post('http://localhost:5050/client/ClientCompany', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            var informationData = val;
            console.log("Information Of user")
            console.log(informationData)
            for(let i=0; i<informationData[6].length-1;i++){
              this.userProfileImage += informationData[6][i]
            }
            // console.log("Image User")
            console.log(this.userProfileImage)
            // this.userProfileImage = informationData[6]
            this.FirstName = informationData[1]
            this.LastName = informationData[2]
            this.emailProfile = informationData[3]
            this.passwordProfile = informationData[5]
          }
        }
      })

  }

  ngOnInit(): void {
  }
  onFileChange2(event: any): void {
    this.imgChangeEvt = event;
  }
  imgFailed() {
    // error msg
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
    this.userProfileImage = e.base64
    //console.log(e.base64);
  }
  initCropper() {
    // init cropper
  }
  imgLoad() {
    // display cropper tool
  }
  onFileChange(event: any) {
    this.imgChangeEvt = event;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.userProfileImage = reader.result

      };

    }
  }
  updateInformationClient() {
    var key, val
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
    var userProfileImageToDB = this.userProfileImage
    var FirstNameToDB = this.FirstName
    var LastNameToDB = this.LastName
    var emailProfileToDB = this.emailProfile
    var passwordProfileToDB = this.passwordProfile
    const queryObj = {
      phoneNumber,
      userProfileImageToDB,
      FirstNameToDB,
      LastNameToDB,
      emailProfileToDB,
      passwordProfileToDB
    }
    this.http.post('http://localhost:5050/client/updateInfoClientCompany', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            // console.log("cccccccccccccccccccccccc",val)
            if (val == 1) {
              Swal.fire(
                'Good job!',
                'Informations modifiées',
                'success'
              )
              this.router.navigateByUrl('/LayoutPage/PageDashbord', {});
            }
            
          }
        }
      })
  }
}
