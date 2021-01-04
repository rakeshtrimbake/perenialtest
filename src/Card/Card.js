import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "./../errorMessages";
import CardDetails from "../CardDetails/CardDetails";
import axios from "./../axios";
import { useHistory } from "react-router-dom";
import './Card.css'

function Card() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting },
  } = useForm();
  const [result, setResult] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isDataProvide,setIsDataProvide] = useState(false);

  const onSubmit = () => {
    
    history.push('/paymentInfo');
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const validateUserName = async (value) => {
    await sleep(1000);
    if (value !== "bill") {
      setError("username", "validate");
    } else {
      clearError("username");
    }
  };

  useEffect(() => {
    async function getCardList() {
      const cardList = await axios.get("5d145fa22f0000ff3ec4f030");
      setCards(cardList.data.cardTypes);
    }

    getCardList();
  }, []);

  useEffect(() => {
    async function checkButton() {
      if(name && cardNumber && email && expiry){
        setIsDataProvide(true)
    }
}

    checkButton();
  }, [name,cardNumber,email,expiry]);
  const addPayment = async (e) => {
    e.preventDefault();
    const result = await axios.get("5d8de422310000b19d2b517a");
    setResult(result.data);
  };

  return (
    <div className="card">
      <div className="card__left">
        <CardDetails />
      </div>
      <div className="card__right">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="card__type">Card Type</span>
          <select name="cardname" ref={register({ required: true })}>
            {cards.map((card) => {
              {
                return card.value !== "JCB" ? (
                  <option key={card.id} value="Visa">
                    {card.value}
                  </option>
                ) : null;
              }
            })}
          </select>
          <ErrorMessage error={errors.cardname} />
          <br></br>

          <label>Card Number</label>
          <input
            name="cardnumber"
            value={cardNumber}
            type="number"
            onChange={(e) => setCardNumber(e.target.value)}
            ref={register({ required: true,valueAsNumber:true, minLength: 16, maxLength: 16 })}
          />
          <ErrorMessage error={errors.cardnumber} />
          <br></br>

          <label>Expiry</label>
          <input
            name="expiry"
            value={expiry}
            placeholder="MM/YY"
            type="number"
            onChange={(e) => setExpiry(e.target.value)}
            ref={register}
          />
          <ErrorMessage error={errors.expiry} />
          <br />

          <label>Name</label>
          <input
            name="name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            ref={register({ required: true })}
          />
          <ErrorMessage error={errors.name} />
          <br />

          <label>Email</label>
          <input
            name="email"
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            ref={register({ required: false, pattern: /^\S+@\S+$/i })}
          />
          <ErrorMessage error={errors.email} />
          <br />
         {isDataProvide ? <button
        
            type="submit"
            className="card__button"
          >
            Confirm Payment
          </button>:<button
            type="submit"
            className="card__button__disbled"
            disabled
          >
            Confirm Payment
          </button>}
        </form>
      </div>
    </div>
  );
}

export default Card;
