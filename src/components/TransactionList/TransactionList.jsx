import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as authService from '../../services/authService';
import * as transactionService from '../../services/transactionService';

const TransactionList = (props) => {
    const [user, setUser] = useState(authService.getUser());

    return (
        <main>
            {props.transactions.map((transaction) => (
                <Link key={transaction._id} to={`/transactions/${transaction._id}`}>
                    <article>
                        <header>
                            {/* <h2>{transaction}</h2> */}
                            {transaction.owner._id === user._id && (
                                <p>{transaction.tag}: {transaction.owner.username} posted on {new Date(transaction.createdAt).toLocaleDateString()}</p>
                            )}
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default TransactionList;