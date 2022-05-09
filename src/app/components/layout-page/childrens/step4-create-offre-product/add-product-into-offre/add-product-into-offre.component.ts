import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import Swal from 'sweetalert2';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-add-product-into-offre',
  templateUrl: './add-product-into-offre.component.html',
  styleUrls: ['./add-product-into-offre.component.css']
})
export class AddProductIntoOffreComponent implements OnInit {
  visible1: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  nameCompany: any;
  form: FormGroup = new FormGroup({});
  listfullName: any;
  valGIWCFC: any;
  productStep4: any;
  idOffreSendGlobale: any;
  valueMarge: number = 40;
  valueRemise: number = 20;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  idOffre : any;
  referenceProduit: any;
  nomProduit: any;
  prixUnitaire: any;
  quantity: any;
  marge: any;
  remise: any

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      idOffre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\-[0-9]{1,3}')
      ]),
      nomProduit: new FormControl('', Validators.required),
      pDVHT: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      ref: new FormControl('', Validators.required),
      desc : new FormControl('')
    });
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
  }

  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {
  }

  addWorkerInOffre() {
    this.visible1 = !this.visible1
    var dataSend = this.form.value;
    // console.log(dataSend)
    // console.log(this.value)
  }

  searchOnOffreBy() {
    this.visible2 = !this.visible2

  }
  onEnter(valueModi: string) {
    var key, val;
    var idOffreSend = valueModi
    this.idOffreSendGlobale = valueModi
    var variabeTest: number;
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
    const queryObj = {
      idOffreSend,
      phoneNumber
    }
    // console.log(valueModi)
    this.http.post('http://localhost:5050/company/getOffreStep4ById', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          console.log("Test 2022")
          if (key == "resultFunctionOffreStep4") {
            console.log("Test 2022")
            console.log(val)

            if (val.length == 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Vérifier encore une autre fois !",
              })
            }
            else {
              this.visible3 = !this.visible3
              this.productStep4 = val;
            }
          }
        }
      })
  }


  addToOffre() {
    this.visible3 = !this.visible3
    var dataSend = this.form.value;
    var valueSendMarge = this.valueMarge;
    var valueSendRemise = this.valueRemise;
    var key2,val2;
    var phoneUserNumber:any;
    var decoded;
    var phoneNumber;    
    phoneUserNumber = localStorage.getItem('phoneNumberOfUser');
    decoded = jwtDecode<JwtPayload>(phoneUserNumber)
    for ([key2, val2] of Object.entries(decoded)) {
      phoneNumber = val2
    }
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Complete all filed please!",
      })
    }
    else {
      console.log(dataSend)
      //console.log(this.value)
      var key, val;
      const queryObj = {
        dataSend,
        valueSendMarge,
        valueSendRemise,
        phoneNumber
      }
      this.http.post('http://localhost:5050/company/Step4Offre', queryObj)
        .subscribe(res => {
          for ([key, val] of Object.entries(res)) {
            if (key == "resutFunction") {
              if (val == 1) {
                Swal.fire(
                 'Good job!',
                  'Ajout effectué!',
                  'success'
                )
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Existe déjà!",
                })
              }
            }
          }
        })
      this.form.reset();
    }
  }

  editAnWorkerFromOffre(idOffre: any, referenceProduit: any, nomProduit: any, prixUnitaire: any, quantity: any,marge:any,remise:any) {
    this.idOffre = idOffre
    this.referenceProduit = referenceProduit
    this.nomProduit = nomProduit
    this.prixUnitaire = prixUnitaire
    this.quantity = quantity
    this.marge = marge;
    this.remise = remise;
  }

  updateInformationClientTODB() {

    var key, val;
    var idOffre = this.idOffre
    var referenceProduit = this.referenceProduit
    var nomProduit = this.nomProduit
    var prixUnitaire = this.prixUnitaire
    var quantity = this.quantity
    var marge = this.marge;
    var remise = this.remise;

    const queryObj = {
      idOffre,
      referenceProduit,
      nomProduit,
      prixUnitaire,
      quantity,
      marge,
      remise
    }
    this.http.post('http://localhost:5050/company/updateInformationOfStep4', queryObj)
      .subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          this.visible3 = !this.visible3
          this.onEnter(this.idOffreSendGlobale)
        }
      })
  }

  deleteAnWorkerFromOffre(idOffre: any,referenceProduit:any) {
    var key, val;
    var idOffre = idOffre;
    var referenceProduit = referenceProduit;
    const queryObj = {
      idOffre,
      referenceProduit,
    }
    this.visible3 = !this.visible3

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
        this.http.post('http://localhost:5050/company/deleteAnWorkerFromOffreStep4', queryObj)
          .subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              // this.visible3 = !this.visible3
              this.onEnter(this.idOffreSendGlobale)
            }
          })
      }
    })
  }
}
