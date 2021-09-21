import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';
@Component
({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
   x:any;
   siteKey:string='';
   public registerObj={Sec:''}
   Paymentform=new FormGroup
   ({ 
      Sec:new FormControl('',[Validators.required])
   })
  constructor(public api:ApiService,private formBuilder:FormBuilder)
  {
      this.siteKey='6LcH-oAcAAAAALxsHf1bPIaqNYPF5tCvOrDfw5Py';
  }
  ngOnInit() 
  {
    this.Paymentform= this.formBuilder.group
    ({
      recaptcha: ['', Validators.required]
    });
  }
  success="Payment Success";
  title = 'MyFrontend';
  paymentRequest:google.payments.api.PaymentDataRequest=
  {
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {
        type:'CARD',
        parameters:
        {
            allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
            allowedCardNetworks:['AMEX','VISA','MASTERCARD'],
        },
        tokenizationSpecification:
        {
          type:'PAYMENT_GATEWAY',
          parameters:
          {
            gateway:'example',
            gatewayMerchantId:'exampleGatewayMerchantId'
          },
        },
      },
    ],
    merchantInfo:
    {
        merchantId:'environment.payment.googlePayMerchantId',
        merchantName:'Demo Merchant'
    },
    transactionInfo:
    {
      totalPriceStatus:'FINAL',
      totalPriceLabel:'Total',
      totalPrice:'1000',
      currencyCode:'INR',
      countryCode:'BE'
    },
  };
  onLoadPaymentData=
  (
    event:Event
  ):void=>
  {
    const eventDetail=event as CustomEvent<google.payments.api.PaymentData>
    console.log('load Payment data',eventDetail.detail);
    console.log("Payment Success");
  } 
  Book_id()
  {
    this.x=Math.floor(Math.random() * 100000000000000) + 200000000000;
    alert("Booking ID:- "+this.x);
    this.api.sav(this.x); 
  }
  serve()
  {
    location.assign("http://localhost:1234/")
  }
  submitData()
  {

  }
}
