import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ItemCreator from "./components/ItemCreator";
import Item from "./components/Item";

const initialExpenses = [
  {
    flow: "expense",
    name: "apples",
    amount: "400",
    category: "food",
    id: uuidv4()
  },
  {
    flow: "expense",
    name: "bananas",
    amount: "1000",
    category: "food",
    id: uuidv4()
  }
]

const initialIncome = [
  {
    flow: "income",
    name: "salary",
    amount: "4000",
    category: "money",
    id: uuidv4()
  },
  {
    flow: "income",
    name: "bribe",
    amount: "10000",
    category: "money",
    id: uuidv4()
  }
]

function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('budgetApp')).expenses || initialExpenses);
  const [income, setIncome] = useState(JSON.parse(localStorage.getItem('budgetApp')).income || initialIncome);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const reduceFunction = (acc, curr) => acc + Number(curr.amount)
    const budget = income.reduce(reduceFunction, 0) - expenses.reduce(reduceFunction, 0)
    setBudget(budget)
    localStorage.setItem("budgetApp" , JSON.stringify({income, expenses}))
  }, [income, expenses])

  const handleSubmit = (values) => {
    const submittedValues = { ...values, id: uuidv4() }
    if (values.flow === "income") {
      setIncome([...income, submittedValues])
    }
    else if (values.flow === "expense") {
      setExpenses([...expenses, submittedValues])
    }
  }

  const handleDelete = (id, flow) => {

    if (flow === "income") {
      const filteredArray = income.filter(el => el.id !== id);
      setIncome(filteredArray)
    }
    else if (flow === "expense") {

      const filteredArray = expenses.filter(el => el.id !== id);
      setExpenses(filteredArray)
    }
  }

  return (
    <div className="App">
      <ItemCreator handleSubmit={handleSubmit} />
      <section className="Expenses">
        <h2 className="header">Expenses</h2>
        <ul className="list">
          {expenses.map(expense => <Item key={expense.id} data={expense} handleDelete={handleDelete} />)}
        </ul>
      </section>
      <section className="Income">
        <h2 className="header">Income</h2>
        <ul className="list">
          {income.map(income => <Item key={income.id} data={income} handleDelete={handleDelete} />)}
        </ul>
      </section>
      <section className="Budget">
        <h2 className="header">Budget</h2>
        <p className="budget" style={{color: budget > 0 ? "green" : "red"}}>{budget} $</p>
      </section>
    </div>
  );
}

export default App;
