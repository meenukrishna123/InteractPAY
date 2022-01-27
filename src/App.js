import logo from './logo.svg';
import './App.css';

function App() {
  console.log('I was triggered during render')
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
         Hello World........!
        </p>*/}
        <h3 className="Interactpay">InterACT Pay</h3>
      <h6>Your payment solution</h6>
      </header>
    </div>
  );
}

export default App;
