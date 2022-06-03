


import logo from "./logo.svg";
//import React, { Component} from 'react';
//import { useState } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import {ButtonGroup,ToggleButton} from "react-dropdown";
//import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import React, { Component, PropTypes, useState } from "react";
import {
  IoMdAddCircle,
  IoMdInformationCircle,
  IoMdTrash,
  IoMdCreate,
} from "react-icons/io";
//import Link from "./components/Link";
//import axios from "axios";

//var Modal = require("react-bootstrap-modal");
var achpaymentMethodId;

toast.configure();
class App extends Component {
  
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
  //   const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState('1');

  // this.radios = [
  //   { name: 'Card', value: 'card' },
  //   { name: 'ACH', value: 'ach' },
  // ];
    //-------- InterACTPay Dev  ------//
    //this.baseUrl="https://crma-pay-developer-edition.na163.force.com/"
    //-------- Medviation Dev  ------//
    this.baseUrl="https://crmapay-developer-edition.na213.force.com/";
    //------------Medviation Dev Sandbox ----------//
    //this.baseUrl = "https://developer-crmapay.cs214.force.com/"
    //------------Medviation Production ----------//
    //this.baseUrl = "https://developer-crmapay.cs214.force.com/"
    this.urlPaymentLinkId = queryParams.get("Id");
    const current = new Date();
    this.todaysDate = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;

    this.handleIsAch = this.handleIsAch.bind(this);
    this.handleIsAchFalse = this.handleIsAchFalse.bind(this);
    this.createContact = this.createContact.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.onloadAchFetch = this.onloadAchFetch.bind(this);
    this.createStripeTransaction = this.createStripeTransaction.bind(this);
    this.notification = this.notification.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCardInput = this.handleCardInput.bind(this);
    this.opendropdown = this.opendropdown.bind(this);
    this.selectedAchPaymentMethod = this.selectedAchPaymentMethod.bind(this);
    this.handleChechBox = this.handleChechBox.bind(this);
    this.defaultCardPayment = this.defaultCardPayment.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.getContactDetails = this.getContactDetails.bind(this);
    this.onloadAchFetch = this.onloadAchFetch.bind(this);
    this.handleIsDelete = this.handleIsDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    //this.notification = this.notification.bind(this);
    this.updatePaymentMethod = this.updatePaymentMethod.bind(this);
    this.defaultCardPayment = this.defaultCardPayment.bind(this);
    this.state = { isDelete: false };
    this.state = { isEdit: false };
    this.state = { isAddressEdit: false };
    this.state = { defaultId: [] };
    this.state = { brandLogo: "" };
    this.state = {
      items: [],
    };
    this.state = { validLink: "" }; 
    this.state = { expiredLink: "" };
    this.state = { isnewcard: false };
    this.state = { dropdown: "" };
    this.state = { newcontact: false };
    this.state = { isClick: false };
    this.state = { isAch: false };
    this.state = { isSave: false };
    this.state = { isSaveCard: false };
    this.state = { updateAddress: false };
    this.state = { editCard: false };
    this.state = { OrderNumber: "" };
    this.state = { OrderTotal: "" };
    this.state = { TransactionTotal: "" };
    this.state = { OrderOpportunity: "" };
    this.state = { OrderQuote: "" };
    this.state = { Billingcity: "" };
    this.state = { Billingstreet: "" };
    this.state = { Billingstate: "" };
    this.state = { Billingzip: "" };
    this.state = { Billingcountry: "" };
    this.state = { expValue: "" };
    this.state = { cardListShow: false,};
    this.state = { patientName: " " };
    this.state = { origin: " " };
    this.state = { destination: " " };
    this.state = { travelDate: " " };
    this.state = { dueAmount: " " };
    this.state = { errorMsg: " " };
    this.state = { showPayButton: " ",};
    this.state = { paymentdisabled: false};
    this.state = { otherPayment: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.updateBillingAddress = this.updateBillingAddress.bind(this);
    this.closeAddressModal = this.closeAddressModal.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleTransAmount = this.handleTransAmount.bind(this);
    this.contactFlag = 0;
    this.state = {
      achItems: [],
    };
    this.state = {
      carditems: [],
    };
  }
  componentDidMount() {
    this.createRandomKey();
    this.getPaymentLinkDetails();
     //this.getOrderDetails();
     //this.getStripeKey();
    this.isCheckValue = false;
    this.isDefaultValue = false;
  }
  createRandomKey(){
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++){
      key += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     this.idempotencyKey = key;
    console.log("text--->"+key);
    //localStorage.setItem('RandomKey', this.idempotencyKey);
  }
  getPaymentLinkDetails(){
    console.log("Invoked getPaymentLinkDetails-*****--->"+this.urlPaymentLinkId);
    var payLinkParams = {};
    payLinkParams.paymentLinkId = this.urlPaymentLinkId;
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(payLinkParams);
      console.log("payAPI=====>"+url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        console.log("response-->y------>"+response);
        this.getFieldsetData()
        var apiResponse = [];
          apiResponse = JSON.parse(response);
          console.log("apiResponse-->y------>"+apiResponse);
          console.log("apiResponse-->xxxxxx------>"+JSON.stringify(apiResponse));
          var amountDue = apiResponse.crma_pay__AmountDue__c;
          console.log("amountDue-->"+amountDue);
        //   this.initialOrderAmount = ''+amountDue+'';
        //  this.setState({TransactionTotal: this.initialOrderAmount });
        //  this.setState({ dueAmount: amountDue }); 
          var linkActive = apiResponse.crma_pay__Active__c;
          if(linkActive==false){
            console.log("inside if -->"+linkActive);
            this.setState({ expiredLink: true });
          this.updatePaymentLinkRecord();
          }
        var apiUrl = apiResponse.crma_pay__PaymentURL__c;
        this.url = new URL(apiUrl);
        this.urlOrderId = this.url.searchParams.get("orderId");
        this.urlCustomerId = this.url.searchParams.get("customerId");
        this.setState({ apicustomerId: this.urlCustomerId });
        this.urlContactId = this.url.searchParams.get("contactId");
        this.urlAmount = this.url.searchParams.get("amount");
        this.urlmail = this.url.searchParams.get("mail");
        this.createdDate = apiResponse.CreatedDate;
        console.log("this.createdDate--->"+this.createdDate);
        //**************************************************************//
       // var inputDate = '2022-04-28T03:51:50.417-07:00'
        let date = new Date( Date.parse(this.createdDate) );
        console.log("date---->"+date);
        var addedDate = date.setHours(date.getHours() + 8 );
       console.log("addedDate---->"+new Date(addedDate));
        const current = new Date();
        this.todaysDate = `${current.getFullYear()}-${
          current.getMonth() + 1
          }-${current.getDate()}`;
        console.log("current---->"+current);
        var d1 = new Date(addedDate); 
          var d2 = new Date(current); 
        var timeleft = d1.getTime() - d2.getTime(); 
         var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        console.log(days+' Day'+hours+' Hr'+minutes+' Min'+seconds+' Sec');
        this.valid = false;
        if(days>=0){
          if(hours>0){
            this.setState({ validLink: true });
          }
        }
        else{
          this.setState({ expiredLink: true });
          this.updatePaymentLinkRecord();
        }
        //console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^"+this.valid);
         //**************************************************************//
        var inputJson = apiResponse.crma_pay__JSON_Input__c;
        console.log("inputJson--->"+JSON.stringify(inputJson));
        var x = JSON.stringify(inputJson);
        var xy = x.slice(1, x.length - 1);
        console.log("attributes--xxyy->"+xy);
        var new1  = xy.replace(/!/g, '"');
        console.log("new1--x11xyy->"+new1);
        //var y = new1;
        var y = JSON.parse(new1);
        //var y = new1;
        console.log("yyyyy--->"+y);
        if(y[0].PatientName__c){
        console.log("attributes--yyy---->"+JSON.stringify(y[0].PatientName__c));
        this.patientName = y[0].PatientName__c;
        this.setState({ patientName: this.patientName });
        }
        if(y[0].OriginDesired__c){
          console.log("attributes--yyy---->"+JSON.stringify(y[0].OriginDesired__c));
          this.origin = y[0].OriginDesired__c;
          this.setState({ origin: this.origin});
          }
          if(y[0].DestinationDesired__c){
            console.log("attributes--yyy---->"+JSON.stringify(y[0].DestinationDesired__c));
            this.destination = y[0].DestinationDesired__c;
            this.setState({ destination: this.destination });
            }
            if(y[0].TravelDate__c){
              console.log("attributes--yyy---->"+JSON.stringify(y[0].TravelDate__c));
              var dateValue = y[0].TravelDate__c;
              var travelDate = dateValue.substring(0, 10);
              this.travelDate = travelDate;
              this.setState({ travelDate: this.travelDate });
              }
              if(y[0].AmountDue__c){
                console.log("attributes--yyy---->"+JSON.stringify(y[0].DestinationDesired__c));
                // this.dueAmount = y[0].AmountDue__c;
                // this.setState({ dueAmount: this.dueAmount }); 
              }
        console.log("this.redirectURL-->y------>"+this.urlOrderId);
        this.getOrderDetails(this.urlOrderId);
        console.log("Response-->y------>"+apiUrl);
        this.getStripeKey();
      })
      .catch((err) => {
        console.log("err" + err);
      })
  }
  getFieldsetData(){
    console.log("Invoked getFieldsetData");
    var ipParams = {};
    ipParams.inputId = this.urlPaymentLinkId;
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(ipParams);
      console.log("FieldsetAPI=====>"+url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        console.log("response-->y------>"+response);
        var Reponse = JSON.parse(response);
        console.log("Reponse" + JSON.stringify(Reponse));
        console.log("Reponse#########"+Reponse[0].Amount_Due__c);
        this.dueAmount = Reponse[0].Amount_Due__c;
        this.setState({ dueAmount: this.dueAmount }); 
        console.log("#########"+this.state.dueAmount);
      })
      .catch((err) => {
        console.log("err" + err);
      })
  }
  getStripeKey() {
    console.log("Invoked stripe key");
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams={}";
    // console.log("yyyyyyy---->"+y)
    // var url = "https://crma-pay-developer-edition.na163.force.com/InteractPay/services/apexrest/crma_pay/InteractPayAuthorization/?methodType=GET&inputParams={}";
    console.log("this.final url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        // console.log(" Stripe key  -->" + JSON.stringify(response));
        // this.stripeKey = response;
        response = response.slice(1, response.length - 1);
        console.log("RESponse    ------>", response);
        var mdt_Reponse = JSON.parse(response);
        var orderReponse = JSON.stringify(JSON.parse(response));
        this.stripeKey = mdt_Reponse.StripeKey;
        this.brandLogo = mdt_Reponse.BrandLogo;
        this.setState({ brandLogo: this.brandLogo });
        console.log("this.brandLogo--->" + this.brandLogo);
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(() => {
        // this.x = this.stripeKey;
        // console.log(
        //   "from here defaultpayment function callsss---------" + this.x
        // );
        this.getContactDetails();
        if (this.urlContactId && !this.urlCustomerId) {
          console.log("******************************No Customer***********");
          console.log("window.name--->" + window.name);
          this.createCustomer(window.name, this.urlmail);
        }
      });
  }
  selectedPaymentMethod(event) {
    console.log("invoked selectedPaymentMethod");
    console.log("Invooked Method" + event.target.getAttribute("data-id"));
    // console.log("Invooked expMonth" + event.target.getAttribute("data-expmonth"));
    this.initExpMonth = event.target.getAttribute("data-expmonth");
    this.billStreet = event.target.getAttribute("data-billStreet");
    this.billCity = event.target.getAttribute("data-billCity");
    this.billCountry = event.target.getAttribute("data-billCountry");
    this.billZip = event.target.getAttribute("data-billZip");
    this.setState({ Billingcity: this.billCity});
    this.setState({ Billingstreet: this.billStreet});
    this.setState({ Billingzip: this.billZip });
    this.setState({ Billingcountry: this.billCountry });
    console.log("Invooked billSTreet" + this.billSTreet);
    this.paymentMethodId = event.target.getAttribute("data-id");
    if(this.paymentMethodId){
      this.setState({ paymentdisabled: true });
      this.setState({showPayButton: true });
    }
    //this.x = window.paymentMethodId;
    var acc = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].classList.contains("activeList")) {
        acc[i].classList.remove("activeList");
      }
    }
    let _listItems = event.target;
    _listItems.classList.add("activeList");
  }
  getContactDetails() {
    // const queryParams = new URLSearchParams(window.location.search);
    //   this.contId = queryParams.get("contactId");
    if (this.urlContactId) {
      this.contactId = this.urlContactId;
    } else {
      this.contactId = this.newContactId;
    }
    //this.default2Id = [];
    //console.log("Invoked OrderDetails");
    var contactParams = {};
    contactParams.contactId = this.contactId;
    //contactParams.contactId = "0035f00000KTfGYAA1";
    console.log("baseUrls--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(contactParams);
    console.log("this.contact url ---->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        //console.log("RESponse    ------>", response);
        var contactReponse = JSON.parse(response);
        console.log("contactReponse    --QQQqQqQQQQQQQq---->" + JSON.stringify(contactReponse));
        console.log(
          "crma_pay__Default_Payment_Method__c#########",
          contactReponse.crma_pay__Default_Payment_Method__c
        );
        this.defaultId = contactReponse.crma_pay__Default_Payment_Method__c;
        this.name = contactReponse.Name;
        window.name = contactReponse.Name;
        this.onloadeddata(this.defaultId);
        // if (this.urlContactId && !this.urlCustomerId) {
        //   console.log("******************************No Customer***********");
        //   this.createCustomer(this.name, this.urlmail);
        // } else {
        this.onloadeddata(this.defaultId);
        //}
        // var x = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.default2Id.push(x);
        // this.setState({
        //   defaultId: this.default2Id,
        // });
        // console.log(" order detailsccc  --xxx--->" + this.default2Id);
        // this.onloadeddata(this.default2Id);
        // this.orderresponse = JSON.parse(JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(
        () =>
          //{
          console.log(
            "******08888888***+++++++++++//00/////////=*******$$$$$$$$$$" +
              this.state.defaultId
          )
        // this.setState({
        //   x: this.state.defaultId,
        //});
        //this.x = this.state.defaultId;
        //this.onloadeddata();
        //}
      );
    // console.log("Deafault---->" + this.state.defaultId);
    // console.log("this.x---->" + this.state.x);
  }
  createCustomer(name, email) {
    console.log("Invoked create customer on component did mount");
    console.log("this.stripeKey--->" + this.stripeKey);
    fetch(
      "https://api.stripe.com/v1/customers?name=" + name + "&email=" + email,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.newcustomerId = response.id;
        console.log("customer create -->" + response.id);
        if (this.newcustomerId) {
          this.onloadeddata();
          this.updateContParams = {};
          this.updateContParams.contactId = this.urlContactId;
          this.updateContParams.customerId = this.newcustomerId;
          console.log("baseUrls--->" + this.baseUrl);
          var url =
            this.baseUrl +
            "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
            JSON.stringify(this.updateContParams);
          console.log("this.final url --->" + url);
          fetch(url, {
            method: "GET",
            headers: {
              mode: "cors",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              this.contactId = response;
              // window.contId = this.contactId;
              // this.newContactId = this.contactId;
              console.log(" update  contact-->" + JSON.stringify(response));
              //this.closeModal();
            })
            .catch((err) => {
              console.log("err" + err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getOrderDetails(orderId) {
    console.log("Invoked Order details--->"+this.redirectURL);
    var orderParams = {};
    orderParams.orderId = orderId;
    //orderParams.orderId = this.urlOrderId;
    //contactParams.contactId = "0035f00000KTfGYAA1";
    console.log("baseUrls--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=GET&inputParams=" +
      JSON.stringify(orderParams);
    console.log("this.order url ---->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        response = response.slice(1, response.length - 1);
        //console.log("RESponse    ------>", response);
        var contactReponse = JSON.parse(response);
        var orderReponse = JSON.stringify(JSON.parse(response));
        console.log("OrderReponse ----->" + orderReponse);
        var orderNum = contactReponse.orderdetails[0].OrderNumber;
        var total = contactReponse.orderdetails[0].TotalAmount;
        console.log("orderTotal---->"+total);
        this.setState({ OrderNumber: orderNum });
        this.setState({ OrderTotal: total });
         this.initialOrderAmount = ''+total+'';
         this.setState({TransactionTotal: this.initialOrderAmount });
        console.log("Order total for tyransaction-----#######>"+this.initialOrderAmount);
        if (contactReponse.orderdetails[0].OpportunityId) {
          console.log("OrderReponse orderOpportunity----->" + contactReponse.orderdetails[0].OpportunityId);
          this.setState({ OrderOpportunity: contactReponse.orderdetails[0].OpportunityId });
          this.setState({ OrderQuote: contactReponse.orderdetails[0].QuoteId });
        }
        if (contactReponse.orderdetails[0].BillingAddress) {
          var city = contactReponse.orderdetails[0].BillingAddress.city;
          var country = contactReponse.orderdetails[0].BillingAddress.country;
          var postalCode =
            contactReponse.orderdetails[0].BillingAddress.postalCode;
          var state = contactReponse.orderdetails[0].BillingAddress.state;
          var street = contactReponse.orderdetails[0].BillingAddress.street;
          console.log("street -1--->" + street);
          // this.setState({ Billingcity: city });
          // this.setState({ Billingstreet: street });
          // this.setState({ Billingstate: state });
          // this.setState({ Billingzip: postalCode });
          // this.setState({ Billingcountry: country });
          // console.log("this.state.OrderNumber -1-->" + this.state.setState);
        }

        // console.log("crma_pay__Default_Payment_Method__c#########",contactReponse.crma_pay__Default_Payment_Method__c);
        // this.defaultId = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.onloadeddata(this.defaultId);
        // var x = contactReponse.crma_pay__Default_Payment_Method__c;
        // this.default2Id.push(x);
        // this.setState({
        //   defaultId: this.default2Id,
        // });
        // console.log(" order detailsccc  --xxx--->" + this.default2Id);
        // this.onloadeddata(this.default2Id);
        // this.orderresponse = JSON.parse(JSON.stringify(response));
      })
      .catch((err) => {
        console.log("err" + err);
      })
      .finally(
        () => {
          console.log(
            "******08888888***+++++++++++//00/////////=*******$$$$$$$$$$" +
              this.state.defaultId
          );
        }
        // this.setState({
        //   x: this.state.defaultId,
        //});
        //this.x = this.state.defaultId;
        //this.onloadeddata();
        //}
      );
    // console.log("Deafault---->" + this.state.defaultId);
    // console.log("this.x---->" + this.state.x);
  }
  // updatepayButton(){
  //   this.setState({showPayButton:false,})
  // }
  //---------------------------------------------------------------------------------------------------------------------------
  onloadeddata(defaultPaymentId) {
    // onloadeddata() {
    console.log("invoke onload---111->"+defaultPaymentId);
    // const queryParams = new URLSearchParams(window.location.search);
    // this.custId = queryParams.get("customerId");
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
    //console.log("this.customerId in onloadxx---> " + this.customerId);
    //  if(this.customerId){
    fetch(
      "https://api.stripe.com/v1/payment_methods?type=card&customer=" +
        this.customerId,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("ListPaymentMethods--->" +JSON.stringify(response));
        var cardList = response.data;
        if(cardList.length !== 0){
          //console.log('INSIDE IF to check-----');
          //console.log('cardlist: ',cardList.length);
          this.setState({
              cardListShow: true,
            });
            //this.setState({showPayButton:true,})
        
      }
      else {
        //console.log('CARDLISTTTTTTTTT- IN ELSE---------->>>>>-+++----->>'+cardList)
        this.setState({
          cardListShow: false,
        });
        //this.setState({showPayButton:false,})
        //this.updatepayButton();
      }
        var paymentMethodList = [];
        var jsonValues = JSON.parse(JSON.stringify(cardList));
        var crd = new Object();
        for (var i = 0; i < jsonValues.length; i++) {
          crd = jsonValues[i].card;
          crd.id = jsonValues[i].id;
          crd.name = jsonValues[i].billing_details.name;
          crd.billStreet = jsonValues[i].billing_details.address.line1;
          crd.billCity = jsonValues[i].billing_details.address.city;
          crd.billCountry = jsonValues[i].billing_details.address.country;
          crd.billZip = jsonValues[i].billing_details.address.postal_code;
          crd.billState = jsonValues[i].billing_details.address.state;
          paymentMethodList.push(crd);
        }
        //console.log("*********************$$$$$$$$$$" + defaultPaymentId);
        //console.log("*********************"+this.state.defaultId)

        var defaultMethod = defaultPaymentId;
        //var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
        //window.paymentMethodId = defaultMethod;
        this.paymentMethodId = defaultMethod;
        for (var i = 0; i < paymentMethodList.length; i++) {
          if (paymentMethodList[i].id == defaultMethod) {
            paymentMethodList[i].isDefault = true;
            console.log("billing data-->"+paymentMethodList[i].billStreet);
            this.setState({ Billingcity: paymentMethodList[i].billCity});
            this.setState({ Billingstreet: paymentMethodList[i].billStreet });
            this.setState({ Billingstate: paymentMethodList[i].billState });
            this.setState({ Billingzip: paymentMethodList[i].billZip });
            this.setState({ Billingcountry: paymentMethodList[i].billCountry });
          } 
          else{ 
          //   if(i==0){
          //   paymentMethodList[0].isDefault = true;
          //   console.log("billing data-->"+paymentMethodList[0].billStreet);
          //   this.setState({ Billingcity: paymentMethodList[0].billCity});
          //   this.setState({ Billingstreet: paymentMethodList[0].billStreet });
          //   this.setState({ Billingstate: paymentMethodList[i].billState });
          //   this.setState({ Billingzip: paymentMethodList[0].billZip });
          //   this.setState({ Billingcountry: paymentMethodList[0].billCountry });
          //   this.paymentMethodId = paymentMethodList[0].id
          // }
          //else{
            paymentMethodList[i].isDefault = false;
          //}
        }
          //console.log("this.state.OrderNumber -1-->" + this.state.setState);
        }
        console.log("default ====> " + JSON.stringify(paymentMethodList));
        // console.log("----->namesList-->" + window.namesList);
        //   window.methodList =  JSON.stringify(paymentMethodList);
        //   window.out = paymentMethodList;
        //  return window.out;
        // this.methodList =  JSON.stringify(paymentMethodList);
        //   console.log("before changes--------------------------------------------")
        this.outlist = paymentMethodList;
        //console.log("this.outMount-->" + this.outlist);
        this.setState({
          carditems: this.outlist,
        });
        //setUser(this.out);
        //    let data = this.out;
        // resolve(data);
        //this.setState({data: this.out});
        //  console.log("dtaa----->"+this.state.data)
        // return this.out;
      })
      //}
      // useEffect(()=>{
      //   fetchData();
      // },[])
      .catch((err) => {
        console.log(err);
      });
    // })

    //  var newlist = [];
    // var newlist = window.out;
    // // var newlist = this.out;
    // // console.log("return newlist-->" + newlist);
    // return newlist;
  }
  onloadAchFetch() {
    // //ach payments

    //list ach payment in UI
    console.log("invoked onloadfetchAch()!!!!");
    fetch("https://api.stripe.com/v1/customers/cus_LCimCtUYQ8o7iW/sources", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log("ListPaymentMethods--->" +JSON.stringify(response));
        var achList = response.data;
        this.outAch = achList;
        console.log("ach list--------------" + JSON.stringify(achList));
        this.setState({
          achItems: this.outAch,
        });
      })

      .catch((err) => {
        console.log(err);
      });
    this.forceUpdate();
  }
  //-------------------------------------------------------------------------------------------------------------------------
  //achpaymentId
  selectedAchPaymentMethod(event) {
    console.log("invoked selectedAchPaymentMethod =====>");
    console.log("Invoked Method" + event.target.getAttribute("data-id"));
    achpaymentMethodId = event.target.getAttribute("data-id");
    this.x = achpaymentMethodId;
    var acc = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < acc.length; i++) {
      if (acc[i].classList.contains("activeList")) {
        acc[i].classList.remove("activeList");
      }
    }
    let _listItems = event.target;
    _listItems.classList.add("activeList");
  }
  opendropdown() {
    console.log("invoke dropdown");
    if (this.state.dropdown) {
      console.log("invoke dropdown if false");
      this.setState({ dropdown: false });
    } else {
      this.setState({ dropdown: true });
      console.log("invoke dropdoown if true");
    }
  }
  handleInputChange(event) {
    console.log("Invoked create handleInputChange");
    this.inputParams = {};
    const target = event.target;
    if (target.name == "fname") {
      this.fname = target.value;
    }
    if (target.name == "lname") {
      this.lname = target.value;
    }
    if (target.name == "email") {
      this.email = target.value;
    }
    if (target.name == "phone") {
      this.phone = target.value;
    }
    if (target.name == "street") {
      this.street = target.value;
    }
    if (target.name == "city") {
      this.city = target.value;
    }
    if (target.name == "state") {
      this.State = target.value;
    }
    if (target.name == "zip") {
      this.zip = target.value;
    }
    if (target.name == "country") {
      this.country = target.value;
    }
    if (this.lname && this.email && this.phone) {
      this.setState({
        isSave: true,
      });
    } else {
      this.setState({
        isSave: false,
      });
    }
    //this.inputParams.salutation = "Mr";
    this.inputParams.firstName = this.fname;
    this.inputParams.lastName = this.lname;
    this.inputParams.contactEMail = this.email;
    this.inputParams.mobilePhone = this.phone;
    this.inputParams.mailStreet = this.street;
    this.inputParams.mailCity = this.city;
    this.inputParams.mailState = this.State;
    this.inputParams.mailZip = this.zip;
    this.inputParams.mailCountry = this.country;
    console.log("this.urlParam--->" + JSON.stringify(this.inputParams));
  }
  handleAddressChange(event) {
    console.log("Invoked create handleInputChange.");
    this.newAddressParams = {};
    const target = event.target;
    if (target.name == "Billingstreet") {
      this.street = target.value;
    }
    if (target.name == "Billingcity") {
      this.city = target.value;
    }
    if (target.name == "Billingstate") {
      this.State = target.value;
    }
    if (target.name == "Billingzip") {
      this.zip = target.value;
    }
    if (target.name == "Billingcountry") {
      this.country = target.value;
    }
    if (this.street || this.city || this.State || this.zip || this.country) {
      this.setState({
        updateAddress: true,
      });
    } else {
      this.setState({
        updateAddress: false,
      });
    }
    this.newAddressParams.billingStreet = this.street;
    this.newAddressParams.billingCity = this.city;
    this.newAddressParams.billingState = this.State;
    this.newAddressParams.billingZip = this.zip;
    this.newAddressParams.billingCountry = this.country;
    console.log("this.urlParam--->" + JSON.stringify(this.newAddressParams));
  }
  handleEditInput(event) {
    console.log("Invoked create handleEditInput.");
    const target = event.target;
    if (target.name == "newExpYear") {
      this.newExpYear = target.value;
    }
    if (target.name == "newExpMonth") {
      this.newExpMonth = target.value;
    }

    if (this.newExpYear || this.newExpMonth) {
      this.setState({
        editCard: true,
      });
    } else {
      this.setState({
        editCard: false,
      });
    }
  }
  updateBillingAddress() {
    console.log(
      "Invoked updateBillingAddress" + JSON.stringify(this.newAddressParams)
    );
    this.newAddressParams.orderId = this.urlOrderId;
    console.log("baseUrls--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
      JSON.stringify(this.newAddressParams);
    console.log("this.final transaction url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        var orderId = response;
        console.log(" update  address-->" + JSON.stringify(response));
        if (orderId) {
          if (this.newAddressParams.billingCity) {
            this.setState({ Billingcity: this.newAddressParams.billingCity });
          }
          if (this.newAddressParams.billingStreet) {
            this.setState({
              Billingstreet: this.newAddressParams.billingStreet,
            });
          }
          if (this.newAddressParams.billingState) {
            this.setState({ Billingstate: this.newAddressParams.billingState });
          }
          if (this.newAddressParams.billingZip) {
            this.setState({ Billingzip: this.newAddressParams.billingZip });
          }
          if (this.newAddressParams.billingCountry) {
            this.setState({
              Billingcountry: this.newAddressParams.billingCountry,
            });
          }
        }
      })
      .catch((err) => {
        console.log("err" + err);
      });

    this.setState({ isAddressEdit: false });
  }
  handleAddCard() {
    console.log("invoked handleAddCard ------>");
    this.setState({
      isnewcard: true,
      dropdown: false,
    });
  }
  handleIsDelete(event) {
    console.log("Invooked delete1" + event.target.getAttribute("data-id"));
    console.log("handleDelete isInvoked ----->");
    this.setState({
      isDelete: true,
    });
    //window.paymentMethodId = event.target.getAttribute("data-id");
    console.log("handleDelete paymentid ------>" + window.paymentMethodId);
  }
  createContact() {
    console.log("Invoked create contact");
    this.name = this.fname + " " + this.lname;
    fetch(
      "https://api.stripe.com/v1/customers?name=" +
        this.name +
        "&email=" +
        this.email,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.newcustomerId = response.id;
        // window.custId = this.newcustomerId;
        console.log("customer create -->" + response.id);
        if (this.newcustomerId) {
          this.inputParams.customerId = this.newcustomerId;
          console.log("baseUrls--->" + this.baseUrl);
          var url =
            this.baseUrl +
            "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
            JSON.stringify(this.inputParams);
          console.log("this.final url --->" + url);
          fetch(url, {
            method: "GET",
            headers: {
              mode: "cors",
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              this.contactId = response;
              window.contId = this.contactId;
              this.newContactId = this.contactId;
              console.log(" create  contact-->" + JSON.stringify(response));
              this.closeModal();
            })
            .catch((err) => {
              console.log("err" + err);
            });
          console.log("Invoke create Contact in salesforce");
        }
        // window.newContact = false;
        // console.log("Invoke window.newContact" + window.newContact);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //handle ach flag =true here.....................
  handleIsAch() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isAch: true,
    });
  }
  //handle checkbox of default card
  handleChechBox() {
    if (this.isCheckValue == false) {
      console.log("this.isCheckValue == false");
      // this.setState({
      this.isCheckValue = true;
      this.isDefaultValue = true;
      // })
    } else {
      console.log("this.isCheckValue else")
      // this.setState({
      this.isCheckValue = false;
      // })
    }

    // console.log("isCheckValue----------",this.state.isCheckValue)
    console.log("isCheckValue----------", this.isCheckValue);
  }

  //handle ach flag =False here.....................
  handleIsAchFalse() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isAch: false,
    });
  }

  // '----------------This is Create Payment Intent-------------------------------------------
  createStripeTransaction() {
    console.log("Invoked createTransaction"+this.idempotencyKey);
    //if(this.transactionAmount){
    
    this.payingAmount = this.transactionAmount;
    if(this.maketransAmount){
      this.payingAmount = this.maketransAmount;
    // var conAmount = this.PayAmount + "00";
    // this.payingAmount = conAmount;

    }
    else{
      //this.payingAmount = this.state.OrderTotal;
      this.payingAmount = this.state.dueAmount
    }
    console.log("Invoked createTransaction amount--->"+this.payingAmount);
    //this.orderAmount = this.state.OrderTotal;
    //console.log("this.urlAmount --->" + this.orderAmount);
    //this.payingAmount =this.maketransAmount;
    var conAmount = this.payingAmount + "00";
    console.log("Invoked createTransaction conAmount--->"+conAmount);
    //console.log("concatedamount --->"+conAmount);
    //this.custId = queryParams.get("customerId");
    // var transactionUrl;
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
    //this.contactId = queryParams.get("contactId");
    console.log("this,payementmethodId---->" + this.paymentMethodId);
    // this.paymentMethodId = window.paymentMethodId;
    //if ach payment id exists, then call the stripe api for ach payment
    if (achpaymentMethodId) {
      var transactionUrl =
        "https://api.stripe.com/v1/charges?amount=999&currency=usd&customer=cus_LCimCtUYQ8o7iW&source=" +
        achpaymentMethodId;
      console.log("transactionUrl-->" + transactionUrl);
    }
    if (this.paymentMethodId) {
      var transactionUrl =
        "https://api.stripe.com/v1/payment_intents" +
        "?amount=" +
        conAmount +
        "&currency=usd&customer=" +
        this.customerId +
        "&payment_method=" +
        this.paymentMethodId +
        "&confirm=true";
      console.log("transactionUrl-->" + transactionUrl);
    }
    fetch(transactionUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        "content-type": "application/json",
        accept: "application/json",
        Authorization: " Bearer " + this.stripeKey,
        "Idempotency-Key": this.idempotencyKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("transactionresponse" + JSON.stringify(response));
        if (response.id) {
          this.transactionId = response.id;
          this.transactionstatus = response.status;
          var currency = response.currency;
          if (response.charges.data[0]) {
            this.gatewayMessage = JSON.parse(
              JSON.stringify(response.charges.data[0].outcome.seller_message)
            );
            this.gatewayStatus = JSON.parse(
              JSON.stringify(response.charges.data[0].outcome.network_status)
            );
          }
          // var currency = JSON.parse(
          //   JSON.stringify(response.charges.data[0].currency)
          // );
          this.currencyCode = currency.toUpperCase();
          //console.log("this.currencyCode-->"+this.currencyCode);
          var message = "Your payment is successfully completed";
          var type = "success";
          this.notification(message, type);
          // var redirectUrl = "https://medviation-developer-edition.na213.force.com/s/invoice-page”?transId=" + this.catalogcode"
          // //var redirectUrl = response.charges.data[0].receipt_url;
          // //this.navigateTo(redirectUrl);
        } else {
          this.transactionId = response.error.payment_intent.id;
          this.gatewayMessage = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].outcome
                .seller_message
            )
          );
          this.gatewayStatus = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].outcome
                .network_status
            )
          );
          this.transactionstatus =
            response.error.payment_intent.charges.data[0].status;
          var currency = JSON.parse(
            JSON.stringify(
              response.error.payment_intent.charges.data[0].currency
            )
          );
          this.currencyCode = currency.toUpperCase();
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }
        this.localKey = localStorage.getItem('RandomKey');
        console.log("getlocal value-->"+this.localKey);
        if(this.localKey == this.idempotencyKey){
          console.log("Different keys");
        }else{
        this.createTransactionRecord(
          this.transactionId,
          this.transactionstatus,
          this.gatewayMessage,
          this.gatewayStatus,
          this.currencyCode
        );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  notification(message, type) {
    console.log("Invoked toast function-->"+type);
    if (type == "success") {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "warning") {
      toast.warning(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "error") {
      console.log("Inside error toast");
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "info") {
      toast.info(message, { position: toast.POSITION.TOP_CENTER });
    }
  }
  navigateTo(url) {
    console.log("Invoked navigation function-->");
    window.location.href = url;
  }
  createTransactionRecord(
    transactionId,
    transactionstatus,
    gatewayMessage,
    gatewayStatus,
    currencyCode
  ) {
    console.log("Invoked Create Transaction Record---->"+this.maketransAmount);
    console.log("Billing details--->"+this.state.Billingcountry);
    if (this.urlContactId) {
      this.contactId = this.urlContactId;
    } else {
      this.contactId = this.newContactId;
    }
    if (this.urlmail) {
      this.mail = this.urlmail;
    } else {
      this.mail = this.email;
    }
    if(this.maketransAmount){
      this.payingAmount = this.maketransAmount;
    // var conAmount = this.PayAmount + "00";
    // this.payingAmount = conAmount;

    }
    else{
      //this.payingAmount = this.state.OrderTotal;
      this.maketransAmount = JSON.stringify(this.state.dueAmount);
    }
    console.log("transactionParams.Amount = this.maketransAmount;"+this.maketransAmount);
    //var amount = '"'+ this.payingAmount+  '"'; 
    //console.log("New amount------>"+amount);
    //const amount = this.payingAmount;
    var transactionParams = {};
    transactionParams.paymentGatewayIdentifier = transactionId;
    //transactionParams.Amount = this.state.TransactionTotal;
    //transactionParams.Amount = this.payingAmount;
    transactionParams.Amount = this.maketransAmount;
    //transactionParams.Amount = amount;TransactionTotal
    transactionParams.transactionEmail = this.mail;
    transactionParams.transactionCurrencyCode = currencyCode;
    transactionParams.transactionOrder = this.urlOrderId;
    transactionParams.transactionContact = this.contactId;
    transactionParams.processedDateTime = this.todaysDate;
    transactionParams.transactionStatus = transactionstatus;
    transactionParams.gatewayMessage = gatewayMessage;
    transactionParams.gatewayNetworkStatus = gatewayStatus;
    transactionParams.billingStreet = this.state.Billingstreet;
    transactionParams.billingCity = this.state.Billingstate;
    transactionParams.billingCountry = this.state.Billingcountry;
    transactionParams.billingState = this.state.Billingstate;
    transactionParams.billingZip = this.state.Billingzip;
    transactionParams.transctionOpportunity = this.state.OrderOpportunity;
    transactionParams.transactionQuote = this.state.OrderQuote;
    console.log("baseUrls--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
      JSON.stringify(transactionParams);
    console.log("this.final transaction url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if(response){
        this.transIdUrl = response;
        localStorage.setItem('RandomKey', this.idempotencyKey);
        
        this.updatePaymentLinkRecord();
        //localStorage.setItem('currentPage', this.currentPage);
        // Med production
       //var redirectUrl = 'https://developer-medviation.cs214.force.com/xchng/s/invoice-page'+'?transId=' + this.transIdUrl; 
        //var redirectUrl = 'https://medviation.force.com/xchng/s/invoice-page'+'?transId=' + this.transIdUrl ; 
        // Med dev
        var redirectUrl = 'https://medviation-developer-edition.na213.force.com/s/invoice-page'+'?transId=' + this.transIdUrl; 
        console.log("invoked redirecturl"+redirectUrl);
        }
        console.log(" create  transaction-->" + JSON.stringify(response));
          this.navigateTo(redirectUrl);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }
  updatePaymentLinkRecord(){
    console.log("Invoked Update PayLink"+this.urlPaymentLinkId);
    var payLinkRcdParams = {};
    payLinkRcdParams.paymentLinkId = this.urlPaymentLinkId;
    if(this.transIdUrl){
    payLinkRcdParams.PaymentTransaction = this.transIdUrl;
  }
    payLinkRcdParams.Active = false;
    console.log("baseUrls--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
      JSON.stringify(payLinkRcdParams);
    console.log("this.final transaction url --->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(" update  payLink-->" + JSON.stringify(response));
        // var redirectUrl = 'https://medviation-developer-edition.na213.force.com/s/invoice-page'+'?transId=' + this.transId;
        //   //var redirectUrl = response.charges.data[0].receipt_url;
        //   this.navigateTo(redirectUrl);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }
  closeModal() {
    console.log("Invoked close popup");
    this.setState({
      newcontact: false,
    });
  }
  closeAddressModal() {
    console.log("Invoked close popup");
    this.setState({
      isAddressEdit: false,
    });
  }
  closeCardModal() {
    console.log("Invoked close popup");
    this.setState({
      isnewcard: false,
      //isClick: true
    });
    this.isCheckValue = false;
    console.log("this.isCheckValue-->" + this.isCheckValue);
  }
  handleCardInput(event) {
    console.log("Invoked create handleCardInput");
    const target = event.target;
    if (target.name == "cardName") {
      this.cardName = target.value;
      console.log("card name -->"+this.cardName );
    }
    if (target.name == "cardNumber") {
      this.cardNumber = target.value;
    }
    if (target.name == "expMonth") {
      this.expMonth = target.value;
    }
    if (target.name == "expYear") {
      this.expYear = target.value;
    }
    if (target.name == "cardCVV") {
      this.cardCVV = target.value;
    }
    if (target.name == "billingStreet") {
      this.billingStreet = target.value;
    }
    if (target.name == "billingCity") {
      this.billingCity = target.value;
    }
    if (target.name == "billingState") {
      this.billingState = target.value;
    }
    if (target.name == "billingCountry") {
      this.billingCountry = target.value;
    }
    if (target.name == "billingZip") {
      this.billingZip = target.value;
    }
    // card validation
    if (
      this.cardName &&
      this.cardNumber &&
      this.expMonth  &&
      this.expYear  &&
      this.cardCVV  &&
      this.billingStreet  &&
      this.billingCity  &&
      this.billingState  &&
      this.billingCountry  &&
      this.billingZip  
    ) {
      this.setState({
        isSaveCard: true,
      });
    } else {
      this.setState({
        isSaveCard: false,
      });
    }
  }

  createPaymentMethod() {
    //console.log("Invoked createPaymentMethod");
    if (this.urlCustomerId) {
      this.customerId = this.urlCustomerId;
    } else {
      this.customerId = this.newcustomerId;
    }
    this.paymenttype = "card";
    var createMethodUrl =
      "https://api.stripe.com/v1/payment_methods" +
      "?type=" +
      this.paymenttype +
      "&card[number]=" +
      this.cardNumber +
      "&card[exp_month]=" +
      this.expMonth +
      "&card[exp_year]=" +
      this.expYear +
      "&card[cvc]=" +
      this.cardCVV +
      "&billing_details[address[city]]=" + this.billingCity + "&billing_details[address[line1]]=" + this.billingStreet +"&billing_details[address[country]]=" + this.billingCountry +"&billing_details[address[postal_code]]=" + this.billingZip+"&billing_details[address[state]]=" + this.billingState;
       console.log("createcard url-->"+createMethodUrl);
      fetch(createMethodUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.id) {
          this.paymentMethodId = response.id;
          console.log("paymentId ===> " + this.paymentMethodId);
          console.log("customerId ===> " + this.customerId);
          this.attachPaymentmethod(this.paymentMethodId, this.customerId);
        } else {
          this.message = response.error.message;
          console.log("Message--1>"+this.message);
          this.type = "error";
          this.notification(this.message,this.type);
        }
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        console.log("Message--2>"+message);
        this.notification(message, type);
      });
  }
  //defining the method defaultCardPayment for calling the API for making card as default
  defaultCardPayment(paymentId, customerId) {
    console.log("-------------------defaultCardPayment-------------------");
    console.log("makeDefaultPaymentMethod.customerId---->" + customerId);
    var defaultpaymentUrl =
      "https://api.stripe.com/v1/customers/" +
      customerId +
      "?invoice_settings[default_payment_method]=" +
      paymentId;
    console.log("defaultpaymentUrl---->" + defaultpaymentUrl);
    fetch(
      defaultpaymentUrl, // End point URL
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => {
        console.log("default 1st response");
        console.log("response ===> " + JSON.stringify(response));
        return response.json(); // returning the response in the form of JSON
      })
      .then((jsonResponse) => {
        console.log("default 2st response");
        console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        if (jsonResponse.id) {
          console.log("update contact ===> ");
          this.updateContact(paymentId);
        }
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
      });
  }
  attachPaymentmethod(paymentMethodId, customerId) {
    console.log("this.customerId in attachPaymentmethod---->" + customerId);
    var attachUrl =
      "https://api.stripe.com/v1/payment_methods/" +
      paymentMethodId +
      "/attach?customer=" +
      customerId;
    fetch(attachUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("attach payment medthod----->", response);
        if (response.id) {
          if (this.isCheckValue) {
            console.log("If is default true");
            this.defaultCardPayment(paymentMethodId, customerId);
            console.log("from here defaultpayment function callsss---------");
          }
          // if(this.isdefault){
          //   console.log("isdefault---true--->" );
          // this.makeDefaultPaymentMethod(paymentId,customerId);
          // }
          //  //this.listPaymentMethods();
          // //this.iscard = false;
          this.closeCardModal();

          var message = "Your card is added successfully";
          var type = "success";
          this.notification(message, type);
          //this.onloadeddata();
          this.getContactDetails();
        } else {
          var message = response.error.message;
          var type = "error";
          this.notification(message, type);
        }

        //this.handleTransaction(paymentId);
        // this.paymentId = jsonResponse.id;
        // console.log('paymentId ===> '+this.paymentId);
        // if(this.paymentId){
        //   this.attachPaymentmethod(this.paymentId,this.customerId);
        // }
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
        //this.onloadeddata();
      });
    // .finally(() => {
    //   if (this.isCheckValue && this.paymentMethodId) {
    //     this.defaultCardPayment(this.paymentMethodId, this.customerId);
    //     console.log("from here defaultpayment function callsss---------");
    //   }
    // });
    //this.onloadeddata();
  }
  handleIsDelete() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isDelete: true,
    });
  }
  handleIsEdit() {
    console.log("invoked handleIsDelete ");
    this.setState({
      isEdit: true,
    });
  }
  handleIsAddressEdit() {
    console.log("invoked handleIsAddressEdit ");
    this.setState({
      isAddressEdit: true,
    });
  }

  closeDeleteModal() {
    console.log("Invoked close popup");
    this.setState({
      isDelete: false,
    });
  }
  closeEditModal() {
    console.log("Invoked close popup");
    this.setState({
      isEdit: false,
    });
    this.isCheckValue = false;
    console.log("this.isCheckValue" + this.isCheckValue);
  }
  updatePaymentMethod() {
    // const queryParams = new URLSearchParams(window.location.search);
    // this.custId = queryParams.get("customerId");
    // if (this.custId) {
    //   this.customerId = this.custId;
    // } else {
    //   this.customerId = window.custId;
    // }
    console.log("this.isDefaultValue update paymentMethod" + this.isDefaultValue);
    //var updatePaymentMethodUrl = "https://api.stripe.com/v1/payment_methods/" + this.pmId + "?card[exp_month]=" + this.expiryMonth + "&card[exp_year]=" + this.expiryYear;
    if (this.isDefaultValue) {
      console.log("inside make default as "+this.paymentMethodId);
      console.log("inside make default as "+this.paymentMethodId);
      this.defaultCardPayment(this.paymentMethodId, this.customerId);
      this.updateContact(this.paymentMethodId);
    }
    var updatePaymentMethodUrl =
      "https://api.stripe.com/v1/payment_methods/" +
      this.paymentMethodId +
      "?card[exp_month]=" +
      this.newExpMonth +
      "&card[exp_year]=" +
      this.newExpYear;
    console.log("updatePaymentMethodUrl==>" + updatePaymentMethodUrl);
    fetch(updatePaymentMethodUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(" paymentMethodId response -->" + JSON.stringify(response));
        // var message = " Card Deleted";
        // var type = "success";
        // this.notification(message, type);
        this.getContactDetails();
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      });
    this.closeEditModal();
  }
  defaultCardPayment(paymentId, customerId) {
    console.log("-------------------defaultCardPayment-------------------");
    console.log("makeDefaultPaymentMethod.customerId---->" + customerId);
    var defaultpaymentUrl =
      "https://api.stripe.com/v1/customers/" +
      customerId +
      "?invoice_settings[default_payment_method]=" +
      paymentId;
    console.log("defaultpaymentUrl---->" + defaultpaymentUrl);
    fetch(
      defaultpaymentUrl, // End point URL
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization: " Bearer " + this.stripeKey,
        },
      }
    )
      .then((response) => {
        console.log("response ===> " + JSON.stringify(response));
        return response.json(); // returning the response in the form of JSON
      })
      .then((jsonResponse) => {
        console.log("jsonResponse ===> " + JSON.stringify(jsonResponse));
        if (jsonResponse.id) {
          console.log("update contact ===> ");
          this.updateContact(paymentId);
        }
      })
      .catch((error) => {
        console.log("callout error ===> " + JSON.stringify(error));
      });
  }
  updateContact(paymentId) {
    console.log(
      "<<<<------------------this is for updating contact with default payment Id----------->>>>"
    );
    var updateContactParams = {};
    console.log("Invoked update Contact");
    // const queryParams = new URLSearchParams(window.location.search);
    // this.contId = queryParams.get("contactId");
    // if (this.contId) {
    //   this.contactId = this.contId;
    // } else {
    //   this.contactId = window.contId;
    // }
    updateContactParams.defaultPaymentMethodId = paymentId;
    updateContactParams.contactId = this.urlContactId
    //updateContactParams.contactId = this.contactId;

    console.log("updateContactUrl--->" + this.baseUrl);
    var url =
      this.baseUrl +
      "InteractPay/services/apexrest/crma_pay/InterACTPayAuthorizationUpdated/?methodType=POST&inputParams=" +
      JSON.stringify(updateContactParams);
    console.log("this.updateContactUrl--->" + url);
    fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.contactId = response;
        console.log("   updateContactUrl-->" + JSON.stringify(response));
        this.onloadeddata(paymentId);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }
  deletePaymentMethod(event) {
    console.log("invoked deletePaymentMethod");
    //this.payMethodId = event.target.getAttribute("data-id");
    //this.payMethodId = this.x;
    console.log(" delete id *******===>" + this.paymentMethodId);
    var deleteUrl =
      "https://api.stripe.com/v1/payment_methods/" +
      this.paymentMethodId +
      "/detach";
    console.log("deleteUrl==>" + deleteUrl);
    fetch(deleteUrl, {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        Authorization: " Bearer " + this.stripeKey,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(" delete response -->" + JSON.stringify(response));
        var message = " Card Deleted";
        var type = "success";
        this.notification(message, type);
        this.onloadeddata();
      })
      .catch((err) => {
        console.log(err);
        var message = " Error Occurred";
        var type = "error";
        this.notification(message, type);
      });
    this.closeDeleteModal();
    //this.render();
  }
  notification(message, type) {
    console.log("Invoked toast function");
    if (type == "success") {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "warning") {
      toast.warning(message, { position: toast.POSITION.TOP_CENTER });
    }
    if (type == "error") {
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  }
  refreshPage() {
    console.log("invoked refresh fn--->");
    //const refreshPage = ()=>{
    window.location.reload();
    console.log("After refresh--->");
    //onloadeddata();
  }
  selectedTotalAmount(event){
    console.log("Invoked Selected amount");
    document.querySelector(".otherAmountClss").value = '';
    this.setState({showPayButton:true,})
    this.setState({errorMsg: false,});
    //this.transactionAmount = '"'+ this.state.OrderTotal+  '"'; 
    //this.transactionAmount = '"'+ this.state.dueAmount+  '"'; 
    this.transactionAmount =  this.state.dueAmount; 
    this.maketransAmount = '"'+ this.transactionAmount+  '"'; 
    this.maketransAmount = JSON.stringify(this.transactionAmount);
    console.log("Invoked this.maketransAmount"+this.maketransAmount);
    //this.transactionAmount = this.state.OrderTotal;
    console.log("Invoked transactionAmount"+this.transactionAmount);
    
  }
  selectedOtherAmount(event){
    this.transactionAmount = this.inputAmount;
    this.maketransAmount = this.inputAmount;
    this.setState({otherPayment: true,});
    //this.transOtherAmount = this.inputAmount;
    //console.log("Invalid amount"+this.state.dueAmount);
    // if(this.transactionAmount>this.state.dueAmount){
    //   console.log("Invalid amount");
    //   this.setState({errorMsg: true,});
    //   this.setState({showPayButton:false,})
    //   this.updatepayButton();
    // }else{
    //   console.log("valid amount");
    //    this.setState({showPayButton:true,})
    //    this.setState({errorMsg: false,});
    // }
    console.log("Invoked other transactionAmount"+this.transactionAmount);
  }
  handleTransAmount(event){
    const target = event.target;
    this.inputAmount = target.value;
    this.transactionAmount = this.inputAmount;
    if(this.transactionAmount>this.state.dueAmount){
      console.log("Invalid amount");
      this.setState({errorMsg: true,});
      this.setState({showPayButton:false,})
      this.updatepayButton();
    }else{
       this.setState({showPayButton:true,})
       this.setState({errorMsg: false,});
    }
    console.log("Invoked other transactionAmount on change"+this.transactionAmount);
  }
  onlyNumberKey(event) {
         console.log("Invoked only number") 
    // Only ASCII character in that range allowed
    var ASCIICode = (event.which) ? event.which : event.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

  render() {
    var achResponseList = this.state.achItems;
    var cardlist = this.state.carditems;
    console.log("Invoked render---->");
    const queryParams = new URLSearchParams(window.location.search);
    window.isContactExist = queryParams.get("isContactExist");
    if (window.isContactExist == "true") {
      window.newContact = false;
    } else {
      if (window.isContactExist == "false") {
        window.newContact = true;
        this.contactFlag++;
        if (this.contactFlag == 1) {
          this.setState({
            newcontact: true,
          });
        }
      }
    }
    //console.log("window.isNewCard in onLOad  " + window.isNewCard);
    //console.log("Address details---->"+this.state.Billingcity  + this.state.Billingstreet  +this.state.Billingstate  +this.state.Billingcountry   +this.state.Billingzip)
    if (
      this.state.Billingcity &&
      this.state.Billingstreet &&
      this.state.Billingcountry &&
      this.state.Billingzip
    ) {
      this.isValidAddress = true;
    }
    // if(this.state.dropdown){
    //   this.isdropdown = true;
    // }
    // else{
    //   this.isdropdown = false;
    // }
    return (
      <div className="App">
        {/* <div className="d-flex justify-content-center">
        <div class="spinner-border loading" role="status">
          <span class="visually-hidden text-light h4">Loading...</span>
          </div>
          <div className='modal-backdrop fade show'></div>
          </div> */}
        <nav class="navbar navbar-expand-lg navbar-dark  Interactpay my-3 py-0">
          <div class="container py-3">
            <a class="navbar-brand" href="#">
              <img src={this.state.brandLogo} height="25" />
            </a>
            <a class="navbar-brand text-right" href="#">
              <p class="Interactheader ml-sm-4 m-0 ">POWERED BY</p>
              <div>
                <IoMdInformationCircle />
                {/* <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i> */}
                <i class="material-icons"></i>
                <span class="ml-2 font-weight-bold">InterACT Pay</span>
              </div>
            </a>
          </div>
        </nav>
        {this.state.expiredLink ? (
          // <div>hiii..</div>
        <div class="message">
        <h1>Oops, this link is expired</h1>
        <p>This URL is not valid anymore.</p>
      </div>
        ) : (
          <div class="container">
          <div class="row my-5">
            <div class="col-lg-4 col-md-4 col-sm-12">
              <div class="card p-3 mb-3">
                <h5 class="border-bottom pb-3">OrderSummary</h5>
                <div class="row">
                  <div class="col-6">
                    <p>Order Number :</p>
                  </div>
                  <div class="col-6">
                    <p>{this.state.OrderNumber}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <p>Order Total :</p>
                  </div>
                  <div class="col-6">
                    <p>$ {this.state.OrderTotal}</p>
                  </div>
                </div>
                {this.state.dueAmount ? (<div class="row">
                  <div class="col-6">
                    <p>Amount Due :</p>
                  </div>
                  <div class="col-6">
                    <p>$ {this.state.dueAmount}</p>
                  </div>
                </div>) : ("")}
                {this.state.patientName ? (<div class="row">
                  <div class="col-6">
                    <p>Patient Name :</p>
                  </div>
                  <div class="col-6">
                    <p>{this.state.patientName}</p>
                  </div>
                </div>) : ("")}
                {this.state.origin ? (<div class="row">
                  <div class="col-6">
                    <p>Origin :</p>
                  </div>
                  <div class="col-6">
                    <p>{this.state.origin}</p>
                  </div>
                </div>) : ("")}
                {this.state.destination ? (<div class="row">
                  <div class="col-6">
                    <p>Destination :</p>
                  </div>
                  <div class="col-6">
                    <p>{this.state.destination}</p>
                  </div>
                </div>) : ("")}
                {this.state.travelDate ? (<div class="row">
                  <div class="col-6">
                    <p>Travel Date :</p>
                  </div>
                  <div class="col-6">
                    <p>{this.state.travelDate}</p>
                  </div>
                </div>) : ("")}
                {/* {this.patientName ? (<div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Patient Name</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>{this.patientName}</p>
                  </div>
                </div>) : ("")} */}
              </div>
              {this.state.cardListShow ? ( <div class="card p-3">
                <h5 class="border-bottom pb-3">
                  Billing Address{" "}
                  {/* <IoMdCreate onClick={() => this.handleIsAddressEdit()} /> */}
                </h5>
                {this.isValidAddress ? (
                  <div>
                    <p>{this.state.Billingstreet}</p>
                    <p>{this.state.Billingcity}</p>
                    <p>{this.state.Billingstate}</p>
                    <p>{this.state.Billingcountry}
                    </p>
                    <p>ZipCode: {this.state.Billingzip}</p>
                  </div>
                ) : (
                  <div>
                    <p>Please add your Billing Address{this.setupAddress}</p>
                  </div>
                )}
              </div> ):("")}
            </div>
            <div class="col-lg-8 col-md-8 col-sm-1">
              <div class="card p-3">
                <div>
                  <div class="row">
                    <div class="col-md-10">
                      <h5 class=" p-3">Please submit your payment details..</h5>
                    </div>
                    <div class="col-md-2 float-right mt-2">
                      <div
                        class="btn-group btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <label
                          class="btn btn-outline-primary "
                          onClick={() => this.handleIsAchFalse()}
                        >
                          <input
                            type="radio"
                            name="options"
                            id="option1"
                            autocomplete="off"
                            //class="test"
                            checked
                          />{" "}
                          Card
                        </label>
                        <label
                          class="btn btn-outline-primary"
                          onClick={() => this.handleIsAch()}
                        >
                          <input
                            type="radio"
                            name="options"
                            id="option2"
                            autocomplete="off"
                          />{" "}
                          ACH
                        </label>

                        <div class="btn-group">
                          <button
                            class="btn btn btn-light btn-sm dropdown-toggle ml-3 border-secondary"
                            type="button"
                            //id="dropdownMenuButton"
                            //data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={this.opendropdown}
                          >
                            <IoMdAddCircle />
                            {/* <i class="fa fa-plus-square"></i> */}
                          </button>
                          {this.state.dropdown ? (
                            <div role="menu">
                              <div className="dropdownMenu">
                                <div>
                                  <button
                                    class="border-0"
                                    onClick={() => this.handleAddCard()}
                                  >
                                    Add new card
                                  </button>
                                </div>
                                {/* <div>
                              <span  
                              // onClick={() => handleAddACH()}
                              >Add new ACH</span>
                              </div> */}
                                {/* <div>
                                  <h7>ACH Pending</h7>
                                  {/* <Link onChange={this.onloadAchFetch} /> 
                                </div> */}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* <ButtonGroup>
        {this.radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            //checked={radioValue === radio.value}
            onChange={(e) => 
              console.log(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup> */}
                    </div>
                  </div>
                </div>
                {this.state.isAch ? (
                  <div>
                    {achResponseList ? (
                      (this.namesList = achResponseList.map(
                        (listValues, index) => (
                          <div>
                            <ul class="list-group  list-group-flush listDetails border">
                              <li
                                class="d-flex justify-content-between align-items-center listDetails list-group-item"
                                data-id={listValues.id}
                                name="livalue"
                                onClick={(event) =>
                                  this.selectedAchPaymentMethod(event)
                                }
                              >
                                <div data-id={listValues.id}>
                                  <p
                                    class="text-uppercase mb-1"
                                    data-id={listValues.id}
                                  >
                                    {listValues.bank_name} ****
                                    {listValues.last4}
                                  </p>
                                </div>
                                <span>
                                  <span pr-3>
                                    <IoMdCreate
                                      data-id={listValues.id}
                                      onClick={() => this.handleIsEdit()}
                                    />
                                  </span>
                                  <IoMdTrash
                                    data-id={listValues.id}
                                    //onClick={(event) =>
                                    //this.selectedPaymentMethod(event)
                                    // }
                                    //  onClick={(event) =>
                                    //   this.handleIsDelete(event)
                                    //}
                                    onClick={() => this.handleIsDelete()}
                                  />
                                  {/* <i
                                  class="fas fa-pencil-alt mr-3 text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()}
                                ></i>*/}
                                  {/* <i
                                  class="fas fa-trash-alt text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                  //onClick = {this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                ></i>  */}
                                </span>
                              </li>
                            </ul>
                          </div>
                        )
                      ))
                    ) : (
                      <div>
                        <h7 class="ml-4"> No Payment Methods are availabe.</h7>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {/* <PaymentMethodList /> */}
                    {/* {cardlist ? ( */}
                      {this.state.cardListShow ? (
                      (this.namesList = cardlist.map((listValues, index) => (
                        <div>
                          <ul class="list-group  list-group-flush listDetails border">
                            <li
                              class="d-flex justify-content-between align-items-center listDetails list-group-item"
                              data-id={listValues.id}
                               name="livalue"
                               data-expmonth={listValues.exp_month}
                               data-billStreet = {listValues.billStreet}
                               data-billCity = {listValues.billCity}
                               data-billCountry = {listValues.billCountry}
                               data-billZip = {listValues.billZip}
                              onClick={(event) =>this.selectedPaymentMethod(event)}
                            >
                              {/* <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1" 
                        data-id={listValues.id}
                        name="livalue"
                        data-expmonth={listValues.exp_month}
                        onClick={(event) =>this.selectedPaymentMethod(event)}
                      /> */}
                              <div data-id={listValues.id}>
                                <p
                                  class="text-uppercase mb-1"
                                  data-id={listValues.id}
                                >
                                  {listValues.brand} ****{listValues.last4}
                                </p>
                                <p
                                  class="text-black-50 mb-0"
                                  data-id={listValues.id}
                                >
                                  Expires on: {listValues.exp_month}/
                                  {listValues.exp_year}
                                  {listValues.isDefault ? (
                                    <span class="badge badge-pill badge-primary ml-4">
                                      Default
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                              <span>
                                <span pr-3>
                                  <IoMdCreate
                                    data-id={listValues.id}
                                    onClick={() => this.handleIsEdit()}
                                  />
                                </span>
                                <span
                                //onClick={(event) =>this.selectedPaymentMethod(event)}
                                >
                                  <IoMdTrash
                                    data-id={listValues.id}
                                    onClick={() => this.handleIsDelete()}
                                  />
                                </span>
                                {/* <i
                                  class="fas fa-pencil-alt mr-3 text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsEdit()}
                                ></i>
                                <i
                                  class="fas fa-trash-alt text-dark"
                                  data-id={listValues.id}
                                  onClick={() => this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                  //onClick = {this.handleIsDelete()}
                                  //onClick={() => this.handleIsDelete()}
                                ></i> */}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )))
                    ) : (
                      <div>
                        <h7 class="ml-4"> No payment method is availabe. Please add a payment method.</h7>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {this.state.cardListShow ? ( <div class="card mt-3">
                <h5 class=" p-2 text-center">Amount to Pay</h5>
                <ul class="list-group  list-group-flush  border">
                  <li
                    class="list-group-item amount-list amountlist"
                    name="livalue"
                    // onClick={(event) =>
                    //   this.selectedTotalAmount(event)
                    //   //this.selectedPaymentMethod(event)
                    // }
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1" checked ={!this.state.otherPayment}
                        disabled={!this.state.paymentdisabled}
                        onClick={(event) =>
                          this.selectedTotalAmount(event)
                        }
                      />
                      <label for="flexRadioDefault1" class="d-block">
                      <div class="row">
                      <div class="col">
                    <p> Due Amount</p>
                  </div>
                  <div class="col">
                    <p class="text-right">$ {this.state.dueAmount}</p>
                  </div>
                  </div>
                  </label>
                    </div>
                  </li>
                  <li
                    class="list-group-item amount-list amountlist"
                    name="livalue"
                    // onClick={(event) =>
                    //   this.selectedOtherAmount(event)
                    // }
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        disabled={!this.state.paymentdisabled}
                        onClick={(event) =>
                          this.selectedOtherAmount(event)
                        }
                      />
                      <label for="flexRadioDefault2" class="d-block">
                      <div class="row">
                      <div class="col">
                    <p>Other Amount</p>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-1">
                  <div class="form-group row">
                  <label >$</label><div class="col-lg col-sm-1">
                    <input type="phone" class="form-control otherAmountClss" id="" name="amount" autocomplete="off" onChange={this.handleTransAmount} />
                    </div>
                  </div>
                  </div>
                  </div>
                  {this.state.errorMsg ? ( <div class="row">
                  <div class="col-lg-6 col-md-16 col-sm-6">
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1 text-right">
        <small id="passwordHelp" class="text-danger">
          Amount should be less than total amount.
        </small>      
      </div>
      </div>):("")}
                  </label>
                    </div>
                  </li>
                </ul>
              </div>):("")}
              {this.state.showPayButton ? (
                <button
                class="btn btn-primary float-right mt-4"
                onClick={this.createStripeTransaction}
              >
                Pay
              </button>
              ) : (
                <button
                class="btn btn-primary float-right mt-4" disabled
                onClick={this.createStripeTransaction}
              >
                Pay
              </button>
              )}
            </div>
          </div>
        </div>
        )}
        {this.state.isnewcard ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon"
              onClick={() => this.closeCardModal()}>x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center pb-2">
                  Please enter your card details.
                </h5>
                <div class="form-row">
                  <h5 class="pl-4 pb-2 required">Payment Information</h5>
                </div>
                <div class="form-group row">
                  <label class="ml-1  pl-5">Cardholder Name :</label>
                  <div class="col-sm-3">
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="cardName"
                      autocomplete="off"
                      pattern="[A-Za-z]"
                      value= {this.state.cardname}
                      //onChange={this.handleCardInput}
                      onChange={(e) => {
                        let value = e.target.value
                        
                        value = value.replace(/[^A-Za-z]/ig, '')
                      console.log("valuee--->"+value);
                      this.setState({cardname: value})
                        this.handleCardInput(e)
                      }}
                      //onkeypress="return /[a-z]/i.this.handleCardInput(event.key)"
                    />
                  </div>
                  <label class="ml-1">Card Number :</label>
                  <div class="col-sm-3">
                    <input
                      type="number"
                      class="form-control"
                      id="inputEmail4"
                      name="cardNumber"
                      autocomplete="off"
                      maxlength="16"
                      pattern="[0-9]*"
                      //onKeyPress={(event) => this.onlyNumberKey(event)}
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="ml-1  mr-5 pl-5">Expiry Date :</label>
                  <div class="col-sm-1">
                    <input
                      placeholder="MM"
                      type="number"
                      class="form-control"
                      id="inputEmail4"
                      name="expMonth"
                      min="01" max="12"
                      //maxlength="2"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <div class="col-sm-1">
                    <input
                      placeholder="YY"
                      type="number"
                      class="form-control expDate"
                      id="inputEmail4"
                      name="expYear"
                      maxlength="2"
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="ml-1 mr-lg-5 pl-5 ">CVV :</label>
                  <div class="col-sm-1">
                    <input
                      placeholder="CVV"
                      type="number"
                      class="form-control ml-5"
                      id="inputEmail4"
                      name="cardCVV"
                      maxlength="4"
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
               <div class="pb-3">
                {/* make default card */}
                {/* -------------------------------------------------------------------------- */}
                <input
                  type="checkbox"
                  id="default"
                  class="mr-2 ml-5"
                  onChange={this.handleChechBox}
                />
                <span>Make this card as default</span>
                </div>
                <div class="form-row">
                  <h5 class="pl-4 pb-2 required">Billing Address</h5>
                </div>
                <div class="form-group row">
                  <label class="pl-5 mr-lg-5">Street:</label>
                  <div class="col-sm-3">
                    <input
                      type="text"
                      class="form-control ml-3"
                      id="inputPassword4"
                      name="billingStreet"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <label class="ml-4 mr-4 ">City :</label>
                  <div class="col-sm-3">
                    <input
                      type=" "
                      class="form-control"
                      id="inputEmail4"
                      name="billingCity"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="pl-5">State/Province :</label>
                  <div class="col-sm-3">
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="billingState"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                  <label class="ml-1">Country :</label>
                  <div class="col-sm-3">
                    <input
                      type="tel"
                      class="form-control"
                      id="inputEmail4"
                      name="billingCountry"
                      autocomplete="off"
                      placeholder="2-letter Country Code"
                      maxlength="2"
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="pl-5">Zip code :</label>
                  <div class="col-sm-3">
                    <input
                      type=" "
                      class="form-control ml-sm-5"
                      id="inputEmail4"
                      name="billingZip"
                      autocomplete="off"
                      onChange={this.handleCardInput}
                    />
                  </div>
                </div>
              </form>

              <div class="flex-container">
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeCardModal()}
                >
                  {" "}
                  Cancel
                </button>
                {this.state.isSaveCard ? (
                  <button
                    class="btn btn-primary float-right mr-3"
                    onClick={() => this.createPaymentMethod()}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    class="btn btn-primary float-right mr-3"
                    disabled
                    //onClick={() => this.createContact() }
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.newcontact ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon"
              onClick={() => this.closeModal()}>x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center">
                  Please enter the below details to proceed!
                </h5>
                <div class="form-row">
                  <h5>Contact Information</h5>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-3">
                    <label class="ml-1 fname">FirstName</label>
                    <input
                      type="text"
                      class="form-control"
                      name="fname"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    {/* <i class="fa fa-asterisk" style="display:inline-block"font-size:24px;color:red"></i> */}
                    <label class="ml-1 required">LastName</label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="lname"
                      autocomplete="off"
                      //class="form-control is-invalid"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1 ">Email</label>
                    <input
                      type="email "
                      class="form-control"
                      id=""
                      name="email"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1">Phone</label>
                    <input
                      type="number "
                      class="form-control"
                      id=""
                      name="phone"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <h5>Address</h5>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail4"
                      name="street"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="city"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">State</label>
                    <input
                      type="text "
                      class="form-control"
                      id="inputEmail4"
                      name="state"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Zip</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail4"
                      name="zip"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="country"
                      autocomplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </form>
              <button
                class="btn btn-outline-primary float-right"
                onClick={() => this.closeModal()}
              >
                Cancel
              </button>
              {this.state.isSave ? (
                <button
                  class="btn btn-primary float-right mr-3"
                  onClick={() => this.createContact()}
                >
                  Save
                </button>
              ) : (
                <button
                  class="btn btn-primary float-right mr-3"
                  disabled
                  //onClick={() => this.createContact() }
                >
                  Save
                </button>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.isDelete ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon"
               onClick={() => this.closeDeleteModal()}>x</span>
              <h5 class="border-bottom mb-4 text-center">
                Delete PaymentMethod.
              </h5>
              <p class="border-bottom pb-4 text-center">
                Are you sure you want to delete this card?
              </p>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeDeleteModal()}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  class="btn btn-primary float-right mr-3"
                  //onClick={() => this.deletePaymentMethod()}
                  onClick={(event) => this.deletePaymentMethod(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.isEdit ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon"
              onClick={() => this.closeEditModal()}>x</span>
              <p class="border-bottom pb-4 text-center">
                Edit the paymentMethod?
              </p>
              <div class="form">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label class="ml-1 ">Year</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputPassword4"
                      name="newExpYear"
                      autocomplete="off"
                      onChange={this.handleEditInput}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label class="ml-1 ">Month</label>
                    <input
                      type=" "
                      class="form-control"
                      id="inputEmail4"
                      name="newExpMonth"
                      autocomplete="off"
                      onChange={this.handleEditInput}
                    />
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="default"
                  class="mr-2"
                  onChange={this.handleChechBox}
                />
                <span>Make this card as default</span>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeEditModal()}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  class="btn btn-primary float-right mr-3"
                  //onClick={() => this.deletePaymentMethod()}
                  onClick={(event) => this.updatePaymentMethod(event)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.isAddressEdit ? (
          <div className="popup-box">
            <div className="deletePopup">
              <span className="close-icon"
              onClick={() => this.closeAddressModal()}>x</span>
              <h5 class="border-bottom mb-4 text-center">
                Edit Billing Address
              </h5>
              <div class="form">
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail"
                      name="Billingstreet"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword"
                      name="Billingcity"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">State</label>
                    <input
                      type="text "
                      class="form-control"
                      id="inputEmail"
                      name="Billingstate"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label class="ml-1">Zip</label>
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      name="Billingzip"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword5"
                      name="Billingcountry"
                      autocomplete="off"
                      onChange={this.handleAddressChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary float-right"
                  onClick={() => this.closeAddressModal()}
                >
                  {" "}
                  Cancel
                </button>
                {this.state.updateAddress ? (
                  <button
                    class="btn btn-primary float-right mr-3"
                    onClick={() => this.updateBillingAddress()}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    class="btn btn-primary float-right mr-3"
                    disabled
                    //onClick={() => this.createContact() }
                  >
                    Update Address
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
