import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as transactionService from '../../services/transactionService';

const BuyerForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        buyers: []
    });
    const { transactionId, itemId } = useParams();
    const navigate = useNavigate();

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (transactionId && itemId) {
            transactionService.updateItem(transactionId, itemId, formData);
            navigate(`/transactions/${transactionId}`);
        } else {
            props.handleAddItem(formData);
        }
        setFormData({
            name: '',
            price: '',
            buyers: []
        });
    };

    useEffect(() => {
        const fetchTransaction = async () => {
            const transactionData = await transactionService.show(transactionId);
            setFormData(transactionData.items.find((item) => item._id === itemId));
        };
        if (transactionId && itemId) fetchTransaction();
    }, [transactionId, itemId]);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name-input">Item name:</label>
            <textarea
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
            {itemId ? <button type="submit">Update item</button> : <button type="submit">Add item</button>}
        </form>
    );
};

export default BuyerForm;
