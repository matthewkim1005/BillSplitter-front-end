import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as transactionService from '../../services/transactionService';

const TransactionDetails = (props) => {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            const transactionData = await transactionService.show(transactionId);
            setTransaction(transactionData);
        };
        fetchTransaction();
    }, [transactionId]);

    if (!transaction) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1>{transaction._id}</h1>
                <p>This transaction was posted on {new Date(transaction.createdAt).toLocaleDateString()} by {transaction.owner.username}</p>
            </header>
            <section>
                <h2>Details</h2>

                {transaction.items.map((item) => (
                    <article key={item._id}>
                         <p> {item.name} - ${item.price}</p>
                        <header> Who bought {item.name}:
                            {item.buyers.map((buyer) => (
                                <article key={buyer._id}> {buyer} </article>
                            ))}
                            <p>${item.price/(item.buyers.length)} each</p>
                        </header>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default TransactionDetails;