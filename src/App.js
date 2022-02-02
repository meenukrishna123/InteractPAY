import logo from "./logo.svg";
import "./App.css";

function App() {
  console.log("I was triggered during render");
//   const queryParams = new URLSearchParams(window.location.search);
// const id = queryParams.get('accountId');
// const name = queryParams.get('name');
// const type = queryParams.get('type');
// console.log("get url params==>"+id);
 onloadeddata();
  //var payList = window.namesList;
 //console.log("get url params==>"+y);
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-dark  Interactpay my-3">
        <div class="container">
          <a class="navbar-brand" href="#">
            {/* <div> */}
            {/* <i class="fa fa-info-circle mr-2 fa-lg" aria-hidden="true"></i> */}
            {/* <i class="material-icons"></i> */}
            <span class="ml-2 font-weight-bold">InterACT Pay</span>
            {/* </div>
          <p>Your payment solution</p> */}
          </a>
        </div>
      </nav>
      <div class="container">
        <div class="row my-5">
          <div class="col-lg-6 col-md-6 col-sm-1">
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
                <p>$ 168</p>
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
          <div class="col-lg-6 col-md-6 col-sm-1">
            <div class="card p-3">
              <div>
                <div class="row">
                  <div class="col-md-10">
                    <h5 class=" p-3">Please submit your payment detailsss.</h5>
                  </div>
                  <div class="col-md-2 float-right mt-2">
                    <div
                      class="btn-group btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <label class="btn btn-outline-primary active">
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
                    </div>
                  </div>
                </div>
              </div>
              <ul class="list-group list-group-flush listDetails">{window.namesList}</ul>
            </div>
          <button class="btn btn-primary float-right mt-4" onClick={createTransaction}>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function selectedPaymentMethod(event){
  console.log("Invooked Method"+event.target.getAttribute("data-id"));
  let _listItem = event.currentTarget;
        let _listItems = _listItem.parentNode.childNodes;
        for (let i = 0; i < _listItems.length; i++) {
            _listItems[i].classList.remove("activeList");
        }
        _listItem.classList.add("activeList");
}
function createTransaction(){
//   console.log("createTransaction");
//   fetch("https://api.stripe.com/v1/payment_intents?amount=16548&currency=usd&payment_method=pm_1KHTFdJZdmpiz6ZwytG2Z37S&confirm=true&customer=cus_Ku19ymdRtCdzMs&receipt_email=akshaya.sreekumarmail@gmail.com", {
//     "method": "POST",
//     "headers": {
//       "x-rapidapi-host": "https://api.stripe.com",
//       //"x-rapidapi-key": "apikey",
//       "content-type": "application/json",
//       "accept": "application/json",
//       Authorization:
//           "Bearer sk_test_51K9PF1JZdmpiz6ZwomLVnx7eXnu0Buv19EwOe262mK5uj5E4bTpWO1trTF5S1OvVmdnpWtd2fm8s0HHbMlrqY2uZ00lWc3uV7c",
//     },
//     // "body": JSON.stringify({
//     //   name: this.state.name,
//     //   notes: this.state.notes
//     // })
//   })
//   .then(response => response.json())
//   .then(response => {
//     console.log(response)
//   })
//   .catch(err => {
//     console.log(err);
//   });

return "I am Okay";
}
function onloadeddata() {
  console.log("I was loaded");
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
      //console.log('paymentMethodListjson ===> ' + JSON.stringify(paymentMethodList));

      var defaultMethod = "pm_1KKL1EJZdmpiz6ZwdzafCfZc";
      for (var i = 0; i < paymentMethodList.length; i++) {
        if (paymentMethodList[i].id == defaultMethod) {
          paymentMethodList[i].isDefault = true;
        } else {
          paymentMethodList[i].isDefault = false;
        }
      }
      console.log("default ===> " + JSON.stringify(paymentMethodList));
      window.namesList = paymentMethodList.map(function (listValues, index) {
        //console.log("window.namesList11-->" +namesList);
        //console.log("------>namesList" +namesList);
        return (
          <li class="list-group-item d-flex justify-content-between align-items-center" data-id={listValues.id} onClick={selectedPaymentMethod}>
            <div data-id={listValues.id} onClick={selectedPaymentMethod}>
              <p class="text-uppercase mb-1" data-id={listValues.id} onClick={selectedPaymentMethod}>
                {listValues.brand} ****{listValues.last4}
              </p>
              <p class="text-black-50 mb-0" data-id={listValues.id} onClick={selectedPaymentMethod}>
                Expires on: {listValues.exp_month}/{listValues.exp_year}{listValues.isDefault ? <span class="badge badge-pill badge-primary ml-4">Default</span> : ''}
              </p>
            </div>
            <span>
              {/* <i class="fas fa-pencil-alt mr-3 text-dark"></i>
              <i class="fas fa-trash-alt text-dark"></i> */}
            </span>
          </li>
        );
      });
      console.log("----!-->namesList-->");
      return "Return from thenresponse";
      
      return window.namesList;
      // var testval = "SampleReturn";
      // return testval;
    })
    .catch((err) => {
      console.log(err);
    });
    //return testval;
    //return "return from onload";
}

export default App;
