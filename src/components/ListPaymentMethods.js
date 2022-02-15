import React, { Component } from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
class ListPaymentMethods extends Component {
    constructor(props) {
        super(props);
        this.onloadeddata = this.onloadeddata.bind(this);
        this.handleIsDelete = this.handleIsDelete.bind(this);
        this.selectedPaymentMethod = this.selectedPaymentMethod.bind(this);
        this.state = {
          isDelete : false
           }
    }
    selectedPaymentMethod(event) {
      console.log('invoked selectedPaymentMethod on delete=====>')
    const target = event.target;
    console.log("Invooked Method" + target.getAttribute("data-id"));
    window.paymentMethodId = target.getAttribute("data-id");
     //console.log("Invooked Method" + event.target.getAttribute("data-id"));
    //window.paymentMethodId = event.target.getAttribute("data-id");
        var acc = document.querySelectorAll(".list-group-item");
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].classList.contains("activeList")) {
              acc[i].classList.remove("activeList");
            }
          }
          let _listItems = event.target;
          _listItems.classList.add("activeList");
       
    }
    onloadeddata() {
        fetch(
          "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_KulGpoFcxMDRQy",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "https://api.stripe.com",
              // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
              Authorization:
                "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            //console.log("ListPaymentMethods--->" +JSON.stringify(response));
            var cardList = response.data;
            var paymentMethodList = [];
            var jsonValues = JSON.parse(JSON.stringify(cardList));
            var crd = new Object();
            for (var i = 0; i < jsonValues.length; i++) {
              crd = jsonValues[i].card;
              crd.id = jsonValues[i].id;
              crd.name = jsonValues[i].billing_details.name;
              paymentMethodList.push(crd);
            }
            var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
            window.paymentMethodId = defaultMethod;
            for (var i = 0; i < paymentMethodList.length; i++) {
              if (paymentMethodList[i].id == defaultMethod) {
                paymentMethodList[i].isDefault = true;
              } else {
                paymentMethodList[i].isDefault = false;
              }
            }
            console.log("default ===> " + JSON.stringify(paymentMethodList));
            console.log("----!-->namesList-->" + window.namesList);
            //window.out = [];
            window.out = paymentMethodList;
            return window.out;
          })
          .catch((err) => {
            console.log(err);
          });
          console.log("window.out-->" + window.out);
          var newlist = [];
          var newlist = window.out;
          console.log("return newlist-->" + newlist);
          return newlist;
      }
   
      handleIsDelete() {
        console.log("invoked handleIsDelete is 2nd listPay child ------>");
        this.setState({
            isDelete : true
        })
      }
     
      render() {
      var list = this.onloadeddata();
        console.log('listnew####--->'+JSON.stringify(list));
        //var listValues;
      return ( 
        window.namesList = list.map((listValues, index) => (
          <div>
                 <ul class="list-group list-group-flush listDetails border">
                     <li
                class="list-group-item d-flex justify-content-between align-items-center listDetails"
                data-id={listValues.id}
               //onClick={() => this.selectedPaymentMethod()}
              >
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
                    Expires on: {listValues.exp_month}/{listValues.exp_year}
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
                  <i class="fas fa-pencil-alt mr-3 text-dark"></i>
                  <i
                    class="fas fa-trash-alt text-dark"
                    data-id={listValues.id}
                    onClick={() => this.accessChild()}
                    //onClick={() => this.handleIsDelete()}
                    //onClick = {this.handleIsDelete()}
                    //onClick={() => this.handleIsDelete()}
                  ></i>
                </span>
              </li>
              </ul> 

              </div> 
           
          )
          
          
      )
     
       
     

     )
      }
}
export default ListPaymentMethods;