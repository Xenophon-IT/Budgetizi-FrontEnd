import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-add-worker-espace',
  templateUrl: './add-worker-espace.component.html',
  styleUrls: ['./add-worker-espace.component.css']
})
export class AddWorkerEspaceComponent implements OnInit {
  fileToUpload: File | null = null;
  dataPass: any;
  nameUser: any;
  nameClientCompany: any;
  imageProfileForUser: any = "Upload Image Worker";
  firstNameProfile: any;
  lastNameProfile: any;
  emailProfile: any;
  nameCompany: any;
  visible1: boolean = false;
  visible2: boolean = false;
  form: FormGroup = new FormGroup({});
  listWorkerInCompany: any;
  editFullName: any = '';
  resultFromTableSalary: any;
  userProfileImage: any = "";
  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  departmentNameWorker: any = '';
  professionWorker: any = '';
  profitCofficientWorker: any = '';
  salaryWorker: any = '';
  fullNameWorker: any = '';
  idWorkerCompany: any = '';
  constructor(private router: Router,private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      fullName: new FormControl('', Validators.required),
      professionWorker: new FormControl('', Validators.required),
      professionCoefficient: new FormControl('', Validators.required),
      profileWorker: new FormControl('', Validators.required),
      departName: new FormControl('', Validators.required),
      GrossSalary: new FormControl('', Validators.required),
    });
    this.getAllWorker();
  }

  ngOnInit(): void {
  }

  get exformFunction() { return this.form.controls; }

  handleFileInput(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        fileSource: reader.result

      };
    }
  }
  testFunction() {
    //console.log("test1")
  }
  getSliderValue(event: any) {
    //console.log(event.target.value);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.visible1 = !this.visible1
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        //console.log(reader.result)
        this.imageProfileForUser = reader.result
      };
    }
  }

  addInTableSalary() {
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    var dataSend = this.form.value;
    var imageProfileForUserSend = this.imageProfileForUser;
    var key, val;
    const queryObj = {
      phoneNumber,
      imageProfileForUserSend,
      dataSend
    }
    this.http.post('http://localhost:5050/company/addInTableSalary', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            if (val == 1) {
              this.resultFromTableSalary = 1
            }
          }
        }
      })
  }
  addWorker() {
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    var dataSend = this.form.value;
    var imageProfileForUserSend = this.imageProfileForUser;
    var key, val;
    const queryObj = {
      phoneNumber,
      imageProfileForUserSend,
      dataSend
    }
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Veuillez remplir tous les champs !",
      })
    }

    this.http.post('http://localhost:5050/company/AddWorkerInDB', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            if (val == 1) {
              //this.addInTableSalary()
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Ressource ajoutée avec success!!',
                showConfirmButton: false,
                timer: 1500
              })
              this.getAllWorker();
              //this.visible2 = !this.visible2;
              this.form.reset();
              this.imageProfileForUser="UPLOAD IMAGE WORKER"
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vérifier une autre fois!",
              })
            }
          }
        }
      })
  }

  deleteAnCompte(idWorker: any, fullNameWorker: any) {
    let key, val;
    console.log(idWorker);
    console.log(fullNameWorker);
    const queryObj = {
      idWorker,
      fullNameWorker
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post('http://localhost:5050/company/deleteWorkerFromDB', queryObj)
          .subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              if (key == "resutFunction") {
                if (val == 1) {
                  Swal.fire(
                    'Deleted!',
                    'La ressource a été supprimée.',
                    'success'
                  )
                  this.getAllWorker();
                }
              }
            }
          })
      }
    })
  }

  editAnCompte(workerImage: any, fullNameWorker: any, professionWorker: any, departementNameOfWorker: any, profitCofficientWorker: any,
    salaryWorker: any, idWorker: any) {
    this.userProfileImage = workerImage
    this.departmentNameWorker = departementNameOfWorker
    this.professionWorker = professionWorker
    this.profitCofficientWorker = profitCofficientWorker
    this.salaryWorker = salaryWorker
    this.fullNameWorker = fullNameWorker
    this.idWorkerCompany = idWorker
  }
  updateInformationClient() {
    var key, val;
    var userProfileImageSend = this.userProfileImage
    var departmentNameWorkerSend = this.departmentNameWorker
    var professionWorkerSend = this.professionWorker
    var profitCofficientWorkerSend = this.profitCofficientWorker
    var salaryWorkerSend = this.salaryWorker
    var fullNameWorkerSend = this.fullNameWorker
    var idWorkerSend = this.idWorkerCompany
    const queryObj = {
      userProfileImageSend,
      departmentNameWorkerSend,
      professionWorkerSend,
      profitCofficientWorkerSend,
      salaryWorkerSend,
      fullNameWorkerSend,
      idWorkerSend
    }
    this.http.post('http://localhost:5050/company/updateInfoWorkerCompany', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            console.log(val)
            this.router.navigateByUrl('/LayoutPage/AddWorkerEspace', {});
            this.getAllWorker()
            this.userProfileImage=""
          }
        }
      })
  }
  

  getAllWorker() {
    let key, val;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = sessionStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    console.log("Phone Number after decoding")
    console.log(phoneNumber)
    const queryObj={
      phoneNumber
    }
    this.http.post('http://localhost:5050/company/GetAllWorkerCompany', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "resutFunction") {
            //console.log("Recive All data of Workers");
            console.log(val)
            this.listWorkerInCompany = val
          }
        }
      })
  }

  editVal(val: any) {
    this.editFullName = val;
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
  onFileChange2(event: any) {
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
}
