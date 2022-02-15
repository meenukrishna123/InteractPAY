import logo from "./logo.svg";
//import React, { Component} from 'react';
//import { useState } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Component, PropTypes } from "react";
import PaymentMethodList from "./components/PaymentMethodList";
import ListPaymentMethods from "./components/ListPaymentMethods";

//import AddNewCard from './components/AddNewCard';

toast.configure();
class App extends Component {
  constructor(props) {
    super(props);
  //   const queryParams = new URLSearchParams(window.location.search);
  //   var isContactExist = queryParams.get("isContactExist");
  //   if(isContactExist == "true"){
  //     console.log("inside if for contact check");
  //   this.state = {
  //     isnewContact: false,
  //   };
  // }
  // else{
  //   console.log("inside else for contact check");
  //   this.state = {
  //     isnewContact: true,
  //   };
  //   console.log("inside else for contact check"+this.state.isnewContact);
  // }
    this.createContact = this.createContact.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    //this.onloadeddata = this.onloadeddata.bind(this);
    console.log("constructor");
    this.state = {
      isnewcard: false,
    };

    this.state = {
      isDelete: false,
    };
    this.state = {
      isnewContact: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    console.log("Invoked create handleInputChange");
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
      this.state = target.value;
    }
    if (target.name == "zip") {
      this.zip = target.value;
    }
    if (target.name == "countrty") {
      this.countrty = target.value;
    }
  }
  handleAddCard() {
    console.log("invoked handleAddCard ------>");
    this.setState({
      isnewcard: true,
    });
  }
  handleIsDelete() {
    console.log("handleDelete isInvoked ------>");
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
      "https://api.stripe.com/v1/customers?name=" +this.name + "&email=" +this.email,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "https://api.stripe.com",
          Authorization:
            "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.customerId = response.id;
        console.log("customer create -->" + response.id);
        if (this.customerId) {
          console.log("Invoke create Contact in salesforce");
        }
        window.newContact = false;
        console.log("Invoke window.newContact"+window.newContact);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //   // onloadeddata() {
  //   //   const queryParams = new URLSearchParams(window.location.search);
  //   //   window.isContactExist = queryParams.get("isContactExist");
  //   //   console.log(" window.isConatctExist==>" + window.isContactExist);
  //   //   if ((window.isContactExist == "true")) {
  //   //     window.newContact = false;
  //   //   } else {
  //   //     window.newContact = true;
  //   //   }
  //   //   console.log("window.isNewCard in onLOad  "+window.isNewCard);
  //   //   if ((window.isNewCard == true)) {
  //   //     console.log("window.isNewCard in if.  "+window.isNewCard);
  //   //     window.shownewCard = true;
  //   //   } else {
  //   //     console.log("window.isNewCard in else.  "+window.isNewCard);
  //   //     window.shownewCard = false;
  //   //   }
  //   //   fetch(
  //   //     "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_KulGpoFcxMDRQy",
  //   //     {
  //   //       method: "GET",
  //   //       headers: {
  //   //         "x-rapidapi-host": "https://api.stripe.com",
  //   //         // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
  //   //         Authorization:
  //   //           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
  //   //       },
  //   //     }
  //   //   )
  //   //     .then((response) => response.json())
  //   //     .then((response) => {
  //   //       //console.log("ListPaymentMethods--->" +JSON.stringify(response));
  //   //       var cardList = response.data;
  //   //       var paymentMethodList = [];
  //   //       var jsonValues = JSON.parse(JSON.stringify(cardList));
  //   //       var crd = new Object();
  //   //       for (var i = 0; i < jsonValues.length; i++) {
  //   //         crd = jsonValues[i].card;
  //   //         crd.id = jsonValues[i].id;
  //   //         crd.name = jsonValues[i].billing_details.name;
  //   //         paymentMethodList.push(crd);
  //   //       }
  //   //       var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
  //   //       window.paymentMethodId = defaultMethod;
  //   //       for (var i = 0; i < paymentMethodList.length; i++) {
  //   //         if (paymentMethodList[i].id == defaultMethod) {
  //   //           paymentMethodList[i].isDefault = true;
  //   //         } else {
  //   //           paymentMethodList[i].isDefault = false;
  //   //         }
  //   //       }
  //   //       console.log("default ===> " + JSON.stringify(paymentMethodList));
  //   //       window.namesList = paymentMethodList.map(function (listValues, index) {
  //   //         //console.log("window.namesList11-->" +namesList);
  //   //         //console.log("------>namesList" +namesList);
  //   //         return (
  //   //           <li
  //   //             class="list-group-item d-flex justify-content-between align-items-center"
  //   //             data-id={listValues.id}
  //   //              onClick={selectedPaymentMethod}
  //   //           >
  //   //             <div data-id={listValues.id}>
  //   //               <p
  //   //                 class="text-uppercase mb-1"
  //   //                 data-id={listValues.id}
  //   //               >
  //   //                 {listValues.brand} ****{listValues.last4}
  //   //               </p>
  //   //               <p
  //   //                 class="text-black-50 mb-0"
  //   //                 data-id={listValues.id}
  //   //               >
  //   //                 Expires on: {listValues.exp_month}/{listValues.exp_year}
  //   //                 {listValues.isDefault ? (
  //   //                   <span class="badge badge-pill badge-primary ml-4">
  //   //                     Default
  //   //                   </span>
  //   //                 ) : (
  //   //                   ""
  //   //                 )}
  //   //               </p>
  //   //             </div>
  //   //             <span>
  //   //               <i class="fas fa-pencil-alt mr-3 text-dark"></i>
  //   //               <i
  //   //                 class="fas fa-trash-alt text-dark"
  //   //                 data-id={listValues.id}
  //   //                 //onClick={() => this.handleIsDelete()}
  //   //                 //onClick = {this.handleIsDelete()}
  //   //                 //onClick={() => this.handleIsDelete()}
  //   //               ></i>
  //   //             </span>
  //   //           </li>
  //   //         );
  //   //       });
  //   //       console.log("----!-->namesList-->" + window.namesList);
  //   //       window.out = window.namesList;
  //   //       return window.namesList;
  //   //     })
  //   //     .catch((err) => {
  //   //       console.log(err);
  //   //     });
  //   //     console.log("window.out-->" + window.out);
  //   //     var newlist = window.out;
  //   //     return newlist;
  //   // }

  render() {
    console.log("Invoked render");
    const queryParams = new URLSearchParams(window.location.search);
    window.isContactExist = queryParams.get("isContactExist");
    console.log(" window.isConatctExist==>" + window.isContactExist);
    if (window.isContactExist == "true") {
      window.newContact = false;
    } else {
      //this.handleAddCard();
      window.newContact = true;
    }
    console.log("window.isNewCard in onLOad  " + window.isNewCard);
    // //var ask = this.onloadeddata();
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark  Interactpay my-3 py-0">
          <div class="container">
            <a class="navbar-brand" href="#">
              {/* <div> */}
              {/* <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i> */}
              {/* <i class="material-icons"></i> */}
              <span class="ml-2 font-weight-bold">InterACT Pay</span>
              {/* </div> */}
              <p class="Interactheader ml-sm-4">Your payment solution</p>
            </a>
          </div>
        </nav>
        <div class="container">
          <div class="row my-5">
            <div class="col-lg-4 col-md-4 col-sm-1">
              <div class="card p-3 mb-3">
                <h5 class="border-bottom pb-3">OrderSummary</h5>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Order Number</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>00000250</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Product Name</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Sample Product Name</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>Order Total</p>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-1">
                    <p>$ 799</p>
                  </div>
                </div>
              </div>
              <div class="card p-3">
                <h5 class="border-bottom pb-3">Billing Address</h5>
                <p>Kyle Hide</p>
                <p>Cape West Street</p>
                <p>Red Crown - New York US</p>
                <p>ZipCode: 341946</p>
              </div>
            </div>
            <div class="col-lg-8 col-md-8 col-sm-1">
              <div class="card p-3">
                <div>
                  <div class="row">
                    <div class="col-md-10">
                      <h5 class=" p-3">
                        Please submit your payment detailsss......
                      </h5>
                    </div>
                    <div class="col-md-2 float-right mt-2">
                      <div
                        class="btn-group btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <label class="btn btn-outline-primary ">
                          <input
                            type="radio"
                            name="options"
                            id="option1"
                            autocomplete="off"
                            checked
                          />{" "}
                          Card
                        </label>
                        <label class="btn btn-outline-primary">
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
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {/* <i class="fa fa-plus-square"></i> */}
                          </button>
                          <div class="dropdown-menu">
                            <a
                              class="dropdown-item"
                              href="#"
                              onClick={() => this.handleAddCard()}
                            >
                              Add new card
                            </a>
                            <a
                              class="dropdown-item"
                              href="#"
                              //onClick={handleAddACH}
                            >
                              Add new ACH
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <PaymentMethodList />
                {/* {ask} */}
                {/* <ul class="list-group list-group-flush listDetails">
                   {ask}
                </ul> */}
              </div>
              <button
                class="btn btn-primary float-right mt-4"
                onClick={createTransaction}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
        {this.state.isnewcard ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon">x</span>
              <form>
                <h5 class="border-bottom mb-4 text-center">
                  Please enter your card details.
                </h5>
                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label>Card Number</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>Name on the card</label>
                    <input class="form-control" id="inputPassword4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>Expiry</label>
                    <input type=" " class="form-control" id="inputEmail4" />
                  </div>
                  <div class="form-group col-md-4">
                    <label>CVV</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                  </div>
                </div>
                <div>
                  <button class="btn btn-outline-primary float-right">
                    {" "}
                    Cancel
                  </button>
                  <button class="btn btn-primary float-right mr-3">Save</button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        {window.newContact ? (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon">x</span>
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
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1">LastName</label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="lname"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-3">
                    <label class="ml-1">Email</label>
                    <input
                      type="email "
                      class="form-control"
                      id=""
                      name="email"
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
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">City</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="city"
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
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label class="ml-1">Country</label>
                    <input
                      class="form-control"
                      id="inputPassword4"
                      name="country"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                {/* <button class="btn btn-outline-primary float-right">
                  Cancel
                </button>
                <button class="btn btn-primary float-right mr-3" onClick={() => this.createContact()} >Save</button> */}
              </form>
              <button class="btn btn-outline-primary float-right">
                Cancel
              </button>
              <button
                class="btn btn-primary float-right mr-3"
                onClick={() => this.createContact()}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

// }
// function deletePaymentmethod() {
//   //window.isDelete = true;
//   console.log("handleDelete isInvoked ------>" );
//   this.setState({
//     isDelete : true
//   })
//   //window.paymentMethodId = event.target.getAttribute("data-id");
//   console.log("handleDelete paymentid ------>" + window.paymentMethodId);
// }
// function App() {
//   const [openModal, setOpenModal] = useState(false);
//   console.log("I was triggered during render");
//   // var ask = onloadeddata();
//   // console.log('ask---->'+ask);
//     return (
//       <div className="App">
//         <nav class="navbar navbar-expand-lg navbar-dark  Interactpay my-3 py-0">
//           <div class="container">
//             <a class="navbar-brand" href="#">
//               {/* <div> */}
//               {/* <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i> */}
//               {/* <i class="material-icons"></i> */}
//               <span class="ml-2 font-weight-bold">InterACT Pay</span>
//               {/* </div> */}
//               <p class="Interactheader ml-sm-4">Your payment solution</p>
//             </a>
//           </div>
//         </nav>
//         {window.isDelete ? (
//           <div className="popup-box">
//             <div className="box ">
//               <span className="close-icon">x</span>
//               <div class="card">
//                 <div class="card-body">
//                   <h5 class="card-title">Delete PaymentMethod</h5>
//                   <p class="card-text">
//                     Are you sure you want to delete this card?
//                   </p>
//                   <button
//                     class="btn btn-outline-primary float-right mt-4"
//                     onClick={createTransaction}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     class="btn btn-primary float-right mt-4 mr-3"
//                     onClick={createTransaction}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         <div class="container">
//           <div class="row my-5">
//             <div class="col-lg-4 col-md-4 col-sm-1">
//               <div class="card p-3 mb-3">
//                 <h5 class="border-bottom pb-3">OrderSummary</h5>
//                 <div class="row">
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>Order Number</p>
//                   </div>
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>00000250</p>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>Product Name</p>
//                   </div>
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>Sample Product Name</p>
//                   </div>
//                 </div>
//                 <div class="row">
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>Order Total</p>
//                   </div>
//                   <div class="col-lg-6 col-md-6 col-sm-1">
//                     <p>$ 799</p>
//                   </div>
//                 </div>
//               </div>
//               <div class="card p-3">
//                 <h5 class="border-bottom pb-3">Billing Address</h5>
//                 <p>Kyle Hide</p>
//                 <p>Cape West Street</p>
//                 <p>Red Crown - New York US</p>
//                 <p>ZipCode: 341946</p>
//               </div>
//             </div>
//             <div class="col-lg-8 col-md-8 col-sm-1">
//               <div class="card p-3">
//                 <div>
//                   <div class="row">
//                     <div class="col-md-10">
//                       <h5 class=" p-3">Please submit your payment detailss.</h5>
//                     </div>
//                     <div class="col-md-2 float-right mt-2">
//                       <div
//                         class="btn-group btn-group-toggle float-right"
//                         data-toggle="buttons"
//                       >
//                         <label class="btn btn-outline-primary ">
//                           <input
//                             type="radio"
//                             name="options"
//                             id="option1"
//                             autocomplete="off"
//                             checked
//                           />{" "}
//                           Card
//                         </label>
//                         <label class="btn btn-outline-primary">
//                           <input
//                             type="radio"
//                             name="options"
//                             id="option2"
//                             autocomplete="off"
//                           />{" "}
//                           ACH
//                         </label>
//                         <div class="btn-group">
//                           <button
//                             class="btn btn btn-light btn-sm dropdown-toggle ml-3 border-secondary"
//                             type="button"
//                             data-toggle="dropdown"
//                             aria-haspopup="true"
//                             aria-expanded="false"
//                           >
//                             {/* <i class="fa fa-plus-square"></i> */}
//                           </button>
//                           <div class="dropdown-menu">
//                             <a
//                               class="dropdown-item"
//                               href="#"
//                               onClick={() => {setOpenModal(true);
//                               }}
//                             >
//                               Add new card
//                             </a>
//                             {openModal && <AddNewCard closeModal={setOpenModal} />}
//                             <a
//                               class="dropdown-item"
//                               href="#"
//                               //onClick={handleAddACH}
//                             >
//                               Add new ACH
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                       {/* <button type="button" class="btn btn-outline-info waves-effect px-3"><i class="fas fa-thumbtack"
//           aria-hidden="true"></i></button> */}
//                     </div>
//                   </div>
//                 </div>
//                 {/* <ul class="list-group list-group-flush listDetails">
//                   {ask}
//                 </ul> */}
//                 <PaymentMethodList />
//               </div>
//               <button
//                 class="btn btn-primary float-right mt-4"
//                 onClick={createTransaction}
//               >
//                 Pay
//               </button>
//             </div>
//           </div>
//         </div>
//        {window.shownewCard ? (
//           <div className="popup-box">
//             <div className="box">
//               <span className="close-icon">x</span>
//               <form>
//                 <h5 class="border-bottom mb-4 text-center">Please enter your card details.</h5>
//                 <div class="form-row">
//                   <div class="form-group col-md-4">
//                     <label>Card Number</label>
//                     <input type="email" class="form-control" id="inputEmail4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>Name on the card</label>
//                     <input class="form-control" id="inputPassword4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>Expiry</label>
//                     <input type=" " class="form-control" id="inputEmail4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>CVV</label>
//                     <input type="email" class="form-control" id="inputEmail4" />
//                   </div>
//                 </div>
//                   <div>
//                   <button class="btn btn-outline-primary float-right">
//                     Cancel
//                   </button>
//                   <button class="btn btn-primary float-right mr-3">Save</button>
//                   </div>
//               </form>
//             </div>
//           </div>
//         ) : ("")}
//         {window.newContact ? (
//           <div className="popup-box">
//             <div className="box">
//               <span className="close-icon">x</span>
//               <form>
//                 <h5 class="border-bottom mb-4 text-center">
//                   Please enter the below details to proceed!
//                 </h5>
//                 <div class="form-row">
//                   <h5>Name</h5>
//                 </div>
//                 <div class="form-row">
//                   <div class="form-group col-md-4">
//                     <label>Salutaion</label>
//                     <input type="email" class="form-control" id="inputEmail4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>FirstName</label>
//                     <input class="form-control" id="inputPassword4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>LastName</label>
//                     <input type=" " class="form-control" id="inputEmail4" />
//                   </div>
//                 </div>
//                 <div class="form-row">
//                   <h5>Address</h5>
//                 </div>
//                 <div class="form-row">
//                   <div class="form-group col-md-4">
//                     <label>Mailing Street</label>
//                     <input type="email" class="form-control" id="inputEmail4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>Mailing City</label>
//                     <input class="form-control" id="inputPassword4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>Mailing State</label>
//                     <input type=" " class="form-control" id="inputEmail4" />
//                   </div>
//                 </div>
//                 <div class="form-row">
//                   <div class="form-group col-md-4">
//                     <label>Mailing Zip</label>
//                     <input type="email" class="form-control" id="inputEmail4" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <label>Mailing Country</label>
//                     <input class="form-control" id="inputPassword4" />
//                   </div>
//                 </div>
//                 <button class="btn btn-outline-primary float-right">
//                   Cancel
//                 </button>
//                 <button class="btn btn-primary float-right mr-3">Save</button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//       </div>
//     );

// }

// function onloadeddata() {
//   const queryParams = new URLSearchParams(window.location.search);
//   window.isContactExist = queryParams.get("isContactExist");
//   console.log(" window.isConatctExist==>" + window.isContactExist);
//   if ((window.isContactExist == "true")) {
//     window.newContact = false;
//   } else {
//     window.newContact = true;
//   }
//   console.log("window.isNewCard in onLOad  "+window.isNewCard);
//   if ((window.isNewCard == true)) {
//     console.log("window.isNewCard in if.  "+window.isNewCard);
//     window.shownewCard = true;
//   } else {
//     console.log("window.isNewCard in else.  "+window.isNewCard);
//     window.shownewCard = false;
//   }
//   fetch(
//     "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_KulGpoFcxMDRQy",
//     {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "https://api.stripe.com",
//         // "x-rapidapi-key": "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c"
//         Authorization:
//           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       //console.log("ListPaymentMethods--->" +JSON.stringify(response));
//       var cardList = response.data;
//       var paymentMethodList = [];
//       var jsonValues = JSON.parse(JSON.stringify(cardList));
//       var crd = new Object();
//       for (var i = 0; i < jsonValues.length; i++) {
//         crd = jsonValues[i].card;
//         crd.id = jsonValues[i].id;
//         crd.name = jsonValues[i].billing_details.name;
//         paymentMethodList.push(crd);
//       }
//       var defaultMethod = "pm_1KQWkxJZdmpiz6ZwRILWgYbS";
//       window.paymentMethodId = defaultMethod;
//       for (var i = 0; i < paymentMethodList.length; i++) {
//         if (paymentMethodList[i].id == defaultMethod) {
//           paymentMethodList[i].isDefault = true;
//         } else {
//           paymentMethodList[i].isDefault = false;
//         }
//       }
//       console.log("default ===> " + JSON.stringify(paymentMethodList));
//       window.namesList = paymentMethodList.map(function (listValues, index) {
//         //console.log("window.namesList11-->" +namesList);
//         //console.log("------>namesList" +namesList);
//         return (
//           <li
//             class="list-group-item d-flex justify-content-between align-items-center"
//             data-id={listValues.id}
//             onClick={selectedPaymentMethod}
//           >
//             <div data-id={listValues.id}>
//               <p
//                 class="text-uppercase mb-1"
//                 data-id={listValues.id}
//               >
//                 {listValues.brand} ****{listValues.last4}
//               </p>
//               <p
//                 class="text-black-50 mb-0"
//                 data-id={listValues.id}
//               >
//                 Expires on: {listValues.exp_month}/{listValues.exp_year}
//                 {listValues.isDefault ? (
//                   <span class="badge badge-pill badge-primary ml-4">
//                     Default
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </p>
//             </div>
//             <span>
//               <i class="fas fa-pencil-alt mr-3 text-dark"></i>
//               <i
//                 class="fas fa-trash-alt text-dark"
//                 data-id={listValues.id}
//                 onClick={handleDelete}
//               ></i>
//             </span>
//           </li>
//         );
//       });
//       console.log("----!-->namesList-->" + window.namesList);
//       window.out = window.namesList;
//       return window.namesList;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//     console.log("window.out-->" + window.out);
//     var newlist = window.out;
//     return newlist;
// }
// function handleAddCard() {
//   console.log("invoked handleAddCard ------>");
//   window.isNewCard = true;
//   //refreshPage();
//   //console.log("after refresh ------>");
//   //Obj = new App();
//   console.log("after newObj ------>");
//   //onloadeddata();
//  //App();
//  //Obj.render();
// }
//function handleAddACH() {}

// function handleDelete(event) {
//   window.isDelete = true;
//   console.log("handleDelete isDelete ------>" + window.isDelete);
//   window.paymentMethodId = event.target.getAttribute("data-id");
//   console.log("handleDelete paymentid ------>" + window.paymentMethodId);
// }
function deletePaymentMethod(event) {
  console.log("Invooked delete" + event.target.getAttribute("data-id"));
  var paymentMethodId = event.target.getAttribute("data-id");
  console.log("Deleted paymentid ------>" + paymentMethodId);
  fetch(
    "https://api.stripe.com/v1/payment_methods/" + paymentMethodId + "/detach",
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "https://api.stripe.com",
        //"x-rapidapi-key": "apikey",
        "content-type": "application/json",
        accept: "application/json",
        Authorization:
          "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        console.log("after delete and before listing");
        console.log("1111");
        refreshPage();
        //onloadeddata();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function refreshPage() {
  console.log("invoked refresh fn--->");
  //const refreshPage = ()=>{
  window.location.reload();
  console.log("After refresh--->");
  //onloadeddata();
}

function createTransaction() {
  console.log("createTransaction");
  const queryParams = new URLSearchParams(window.location.search);
  var amount = queryParams.get("amount");
  var customerId = queryParams.get("customerId");
  var conAmount = amount + "00";
  var paymentMethodId = window.paymentMethodId;
  var transactionUrl =
    "https://api.stripe.com/v1/payment_intents" +
    "?amount=" +
    conAmount +
    "&currency=usd&customer=" +
    customerId +
    "&payment_method=" +
    paymentMethodId +
    "&confirm=true";
  console.log("transactionUrl-->" + transactionUrl);
  fetch(transactionUrl, {
    method: "POST",
    headers: {
      "x-rapidapi-host": "https://api.stripe.com",
      "content-type": "application/json",
      accept: "application/json",
      Authorization:
        "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("transactionresponse" + JSON.stringify(response));
      if (response.id) {
        var message = "Your payment is successfully completed";
        var type = "success";
        notification(message, type);
        var redirectUrl = response.charges.data[0].receipt_url;
        navigateTo(redirectUrl);
      } else {
        var message = response.error.message;
        var type = "error";
        notification(message, type);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //return "I am Okay";
}

function selectedPaymentMethod(event) {
  //this.handleIsDelete();
  console.log("invoked selectedPaymentMethod on delete=====>");
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

function showpopup() {
  console.log("Invoked Popup function");
  window.ispopuptrue = true;
}

function notification(message, type) {
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
  if (type == "info") {
    toast.info(message, { position: toast.POSITION.TOP_CENTER });
  }
}

function navigateTo(url) {
  console.log("Invoked navigation function-->");
  window.location.href = url;
}
export default App;
