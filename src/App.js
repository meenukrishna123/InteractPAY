import logo from "./logo.svg";
import "./App.css";

function App() {
  console.log("I was triggered during render");
  onloadeddata();
  //onLoad= {() => onloadeddata()}
  return (
    <div className="App" >
      <nav class="navbar navbar-expand-lg navbar-dark  Interactpay" >
        <div class="container">
        <a class="navbar-brand" href="#"><i class="fa fa-info-circle" aria-hidden="true"></i>
          InterACT Pay
        </a>
        </div>
      </nav>
      <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-1">Hello</div>
        <div class="col-lg-6 col-md-6 col-sm-1">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Cras justo odio
              <span class="badge badge-primary badge-pill">14</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Dapibus ac facilisis in
              <span class="badge badge-primary badge-pill">2</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Morbi leo risus
              <span class="badge badge-primary badge-pill">1</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
  
  
}
function onloadeddata(){
  console.log("I was loaded");
}

export default App;
