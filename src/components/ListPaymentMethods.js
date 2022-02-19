import React, { Component } from 'react';
import "./ListPaymentMethods.css";
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
    console.log('invoked selectedPaymentMethod =====>');
    console.log("Invooked Method" + event.target.getAttribute("data-id"));
    window.paymentMethodId = event.target.getAttribute("data-id");
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
   const queryParams = new URLSearchParams(window.location.search);
    this.customerId = queryParams.get("customerId");
   console.log("this.customerId in onloadxx---> "+this.customerId);
  //  if(this.customerId){
    fetch(
      "https://api.stripe.com/v1/payment_methods?type=card&customer="+this.customerId,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "https://api.stripe.com",
            // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
            Authorization: "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
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
            //console.log("----->namesList-->" + window.namesList);
            window.methodList =  JSON.stringify(paymentMethodList);
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
  // }
  // else{
  //   window.methodList =  [];
  // }
}
   
handleIsDelete() {
   console.log("invoked handleIsDelete ");
    this.setState({
       isDelete : true
     })
}
     
render() {
  var list = this.onloadeddata();
  console.log('listnew####--->'+JSON.stringify(list));
   //var listValues;
      return ( 
      //   window.namesList = list.map((listValues, index) => (
      //     <div>
      //            <ul class="list-group  list-group-flush listDetails border">
      //                <li
      //           class="d-flex justify-content-between align-items-center listDetails list-group-item"
      //           data-id={listValues.id} name= "livalue"
      //          onClick={event => this.selectedPaymentMethod(event)}
      //         >
      //           <div data-id={listValues.id}>
      //             <p
      //               class="text-uppercase mb-1"
      //               data-id={listValues.id}
      //             >
      //               {listValues.brand} ****{listValues.last4}
      //             </p>
      //             <p
      //               class="text-black-50 mb-0"
      //               data-id={listValues.id}
      //             >
      //               Expires on: {listValues.exp_month}/{listValues.exp_year}
      //               {listValues.isDefault ? (
      //                 <span class="badge badge-pill badge-primary ml-4">
      //                   Default
      //                 </span>
      //               ) : (
      //                 ""
      //               )}
      //             </p>
      //           </div>
      //           <span>
      //             <i class="fas fa-pencil-alt mr-3 text-dark"></i>
      //             <i
      //               class="fas fa-trash-alt text-dark"
      //               data-id={listValues.id}
      //               onClick={() => this.accessChild()}
      //               //onClick={() => this.handleIsDelete()}
      //               //onClick = {this.handleIsDelete()}
      //               //onClick={() => this.handleIsDelete()}
      //             ></i>
      //           </span>
      //         </li>
      //         </ul> 

      //         </div> 
           
      //     )
          
          
      // )

      <div>
      {list ? (
        window.namesList = list.map((listValues, index) => (
          <div>
                 <ul class="list-group  list-group-flush listDetails border">
                     <li
                class="d-flex justify-content-between align-items-center listDetails list-group-item"
                data-id={listValues.id} name= "livalue"
               onClick={event => this.selectedPaymentMethod(event)}
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
                    onClick={() => this.handleIsDelete()}
                    //onClick={() => this.handleIsDelete()}
                    //onClick = {this.handleIsDelete()}
                    //onClick={() => this.handleIsDelete()}
                  ></i>
                </span>
              </li>
              </ul> 

              </div> 
           
          )
          
          
      )) : (
        <div>
        <h7 class = "ml-4"> No Payment Methods are availabe.</h7>
         </div>
        )}
        {this.state.isDelete ? (
                <div className="popup-box">
                    <div className="box ">
                      <span className="close-icon">x</span>
                     <div class="card">
                        <div class="card-body">
                          <h5 class="border-bottom card-title pb-3 text-center">Delete PaymentMethod</h5>
                          <p class="card-text">
                            Are you sure you want to delete this card?
                          </p>
                          <button
                            class="btn btn-outline-primary float-right mt-4"
                            //onClick={createTransaction}
                          >
                            Cancel
                          </button>
                          <button
                            class="btn btn-primary float-right mt-4 mr-3"
                            //onClick={createTransaction}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                 ""
                )}
       </div>
  )
      }
}
export default ListPaymentMethods;