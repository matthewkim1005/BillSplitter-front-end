import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as transactionService from '../../services/transactionService';

const TransactionSplitter = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        buyers: [],
    });
    const [transaction, setTransaction] = useState(null);
    const { transactionId } = useParams();
    const navigate = useNavigate();

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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleAddTransaction(formData);
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>New Transaction</h1>
                <label htmlFor="tag-input">Label this transaction: </label>
                <input
                    required
                    type="tag"
                    name="tag"
                    id="tag-input"
                    value={formData.tag}
                    onChange={handleChange}
                />
                <label htmlFor="people-input">How many people?: </label>
                <select required type="people" name="people" id="people-input" value={formData.people} onChange={handleChange} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                </select>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default TransactionSplitter;
