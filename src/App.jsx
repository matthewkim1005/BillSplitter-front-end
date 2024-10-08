import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import TransactionList from './components/TransactionList/TransactionList';
import TransactionDetails from './components/TransactionDetails/TransactionDetails';
import TransactionSplitter from './components/TransactionSplitter/TransactionSplitter';
import ItemForm from './components/ItemForm/ItemForm';
import * as transactionService from './services/transactionService';
import * as authService from '../src/services/authService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTransactions = async () => {
      const transactionsData = await transactionService.index();
      setTransactions(transactionsData);
    };
    if (user) fetchAllTransactions();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddTransaction = async (transactionFormData) => {
    const newTransaction = await transactionService.create(transactionFormData);
    setTransactions([newTransaction, ...transactions]);
    navigate(`/transactions/${newTransaction._id}`);
    location.reload();
  };

  const handleDeleteTransaction = async (transactionId) => {
    const deletedTransaction = await transactionService.deleteTransaction(transactionId);
    setTransactions(transactions.filter((transaction) => transaction._id !== deletedTransaction._id));
    navigate('/transactions');
  };

  const handleUpdateTransaction = async (transactionId, transactionFormData) => {
    const updatedTransaction = await transactionService.update(transactionId, transactionFormData);

    setTransactions(transactions.map((transaction) => (transactionId === transaction._id ? updatedTransaction : transaction)));

    navigate(`/transactions/${transactionId}`);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/transactions" element={<TransactionList transactions={transactions} />} />
              <Route path="/transactions/:transactionId" element={ <TransactionDetails transactions={transactions} handleDeleteTransaction={handleDeleteTransaction} />} />
              <Route path="/transactions/new" element={<TransactionSplitter handleAddTransaction={handleAddTransaction} />} />
              <Route path="/transactions/:transactionId/edit" element={<TransactionSplitter handleUpdateTransaction={handleUpdateTransaction} />} />
              <Route path="/transactions/:transactionId/edit/:itemId/edit" element={<ItemForm />} />
            </>
          ) : (
            // Public Route:
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
