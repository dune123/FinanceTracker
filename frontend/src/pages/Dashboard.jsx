import { Modal } from 'antd';
import Cards from '../components/Cards/Card'
import React, { useEffect, useState } from 'react'
import AddExpense from '../components/Modals/AddExpense';
import AddIncome from '../components/Modals/AddIncome';
import {addDoc,collection, getDoc, getDocs, Transaction} from "firebase/firestore" 
import { db ,auth} from "../firebase"
import { query } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth"
import moment from "moment"
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import Charts from '../components/Charts/Charts';
import NoTransaction from './NoTransaction';

const Dashboard = () => {
  const [transaction,setTransaction]=useState([]);
  const [user]=useAuthState(auth);
  const [isExpenseModalVisible,setIsExpenseModalVisible] =useState(false);
  const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
  const [Loading,setLoading]=useState(false);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [currentBalance,setCurrentBalance]=useState(0);

  const showExpensesModal=()=>{
    setIsExpenseModalVisible(true);
  }

  const showIncomeModal=()=>{
    setIsIncomeModalVisible(true);
  }

  const handleExpenseCancel=()=>{
    setIsExpenseModalVisible(false);
  }

  const handleIncomeCancel=()=>{
    setIsIncomeModalVisible(false);
  }

  const onFinish=(values,type)=>{
    const formattedDate = values.date ? values.date.format("YYYY-MM-DD") : null;
    console.log(formattedDate);
    if (!formattedDate) {
      toast.error("Please provide a valid date.");
      return;
    }
  
    const newTransaction = {
      type: type,
      date: formattedDate,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    console.log(newTransaction);
    addTransaction(newTransaction);
  }

  async function addTransaction(transac,many){
    //Add the doc 
    try {
      const docRef=await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transac
      )
      console.log("Document written with ID: ",docRef.id)
      toast.success("Transaction Added!")
      if(!many){
        toast.success("Transaction Added!");
      }
      let newArr=transaction;
      newArr.push(transac);
      setTransaction(newArr);
      calculateBalance();
    } catch (error) {
      console.error("Error adding document: ",error);
      toast.error("Couldn't add transaction")
    }
  }


  useEffect(()=>{
    calculateBalance();
  },[transaction])

  useEffect(()=>{
    if(user) fetchTransaction();
  },[user])

  function calculateBalance(){
    let incomeTotal=0;
    let expenseTotal=0;

    transaction.forEach((transaction)=>{
      if(transaction.type==='income'){
        incomeTotal+=transaction.amount;
      }
      else{
        expenseTotal+=transaction.amount;
      }
    })

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setCurrentBalance(incomeTotal-expenseTotal);
  }

  async function fetchTransaction() {
    setLoading(true);
    try {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        const transactionArray = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setTransaction(transactionArray);
        toast.success("Transactions Fetched!");
      }
    } catch (error) {
      console.error("Error fetching transactions: ", error);
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }


  let sortedTransactions=transaction.sort((a,b)=>{
     return new Date(a.date)-new Date(b.date);
  })

  return (
    <div>
    {
      Loading?(
        <>
          loading...
        </>
      ):(
        <>
        <Cards 
        income={income}
        expense={expense}
        currentBalance={currentBalance}
        showExpensesModal={showExpensesModal} showIncomeModal={showIncomeModal} handleExpenseCance={handleExpenseCancel} handleIncomeCancel={handleIncomeCancel}/>
        {transaction.length!=0?<Charts sortedTransactions={sortedTransactions}/>:<NoTransaction/>}
        <AddExpense
          isExpenseModalVissible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}
        />
        <AddIncome
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
        />
       <TransactionsTable 
       transactions={transaction} 
       addTransaction={addTransaction}
       fetchTransaction={fetchTransaction}
       />
        </>
      )
    }
    </div>
  )
}

export default Dashboard