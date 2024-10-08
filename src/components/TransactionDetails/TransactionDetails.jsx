import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as transactionService from '../../services/transactionService';
import { AuthedUserContext } from '../../App';
import { Link } from 'react-router-dom';
import ItemForm from '../ItemForm/ItemForm';

const TransactionDetails = (props) => {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchTransaction = async () => {
            const transactionData = await transactionService.show(transactionId);
            setTransaction(transactionData);
        };
        fetchTransaction();
    }, [transactionId]);

    const handleAddItem = async (itemFormData) => {
        const newItem = await transactionService.createItem(transactionId, itemFormData);
        setTransaction({ ...transaction, items: [...transaction.items, newItem] });
        location.reload();
      };

    if (!transaction) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1>{transaction.tag}</h1>
                <p key={transaction.createdAt}>This transaction was posted on {new Date(transaction.createdAt).toLocaleDateString()} by {transaction.owner.username}</p>
                {transaction.owner._id === user._id && (
                    <><button onClick={() => props.handleDeleteTransaction(transactionId)}>Delete</button></>
                )}
            </header>
            <h2>Items</h2>
            <section>
                {transaction.items.map((item) => (
                    <article key={item._id}>
                        <p> {item.name} - ${item.price}</p>
                        <header> Who bought {item.name}:
                            {/* {item.buyers.map((buyer) => (
                                <article key={buyer._id}> {buyer} </article>
                            ))}
                            <p>${item.price / Number(item.buyers.length)} each</p> */}
                            {transaction.owner._id === user._id && (
                                <>
                                    <Link to={`/transactions/${transactionId}/edit/${item._id}/edit`}>Edit</Link>
                                    <button onClick={() => props.transactions.items.handleDeleteItem(transactionId, item._id)}>Delete</button>
                                </>
                            )}
                        </header>
                    </article>
                ))}
            </section>
            <section>
                <ItemForm handleAddItem={handleAddItem}/>
            </section>
        </main>
    );
}

export default TransactionDetails;