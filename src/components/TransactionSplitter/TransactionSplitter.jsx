import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as transactionService from '../../services/transactionService';
import ItemForm from '../ItemForm/ItemForm';

const TransactionSplitter = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    buyers: [],
  });
  const [transaction, setTransaction] = useState(null);
  const { transactionId } = useParams();

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId);
      setFormData(transactionData);
    };
    if (transactionId) fetchTransaction();
  }, [transactionId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleAddItem = async (itemFormData) => {
    const newItem = await transactionService.createItem(transactionId, itemFormData);
    setTransaction({ ...transaction, items: [...transaction.items, newItem] });
};

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (transactionId) {
        props.handleUpdateTransaction(transactionId, formData);
      } else {
        props.handleAddTransaction(formData);
      }
  };

  return (
    <main>
        <ItemForm handleAddItem={handleAddItem} />
      <form onSubmit={handleSubmit}>
        <h1>{transactionId ? 'Edit Transaction' : 'New Transaction'}</h1>
        <label htmlFor="name-input">Food Name</label>
        <input
          required
          type="name"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="price-input">Price</label>
        <textarea
          required
          type="price"
          name="price"
          id="price-input"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="buyers-input">Buyers</label>
        <textarea
          required
          type="buyers"
          name="buyers"
          id="buyers-input"
          value={formData.buyers}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default TransactionSplitter;
