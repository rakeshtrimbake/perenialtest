import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import PaymentInfo from './PaymentInfo/PaymentInfo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
     <Switch>
       
       <Route exact path="/paymentInfo">
         <PaymentInfo />
         </Route>
         <Route exact path="/">
         <Card/>
       </Route>
       
     </Switch>
   </BrowserRouter>
      
    </div>
  );
}

export default App;
