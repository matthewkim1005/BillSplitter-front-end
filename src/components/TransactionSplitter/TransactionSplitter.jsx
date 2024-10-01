import { useState } from 'react';

const TransactionSplitter = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    buyers: [],
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddTransaction(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
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
