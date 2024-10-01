import { Link } from 'react-router-dom';

const TransactionList = (props) => {
    return (
        <main>
            {props.transactions.map((transaction) => (
                <Link key={transaction._id} to={`/transactions/${transaction._id}`}>
                    <article>
                        <header>
                            {/* <h2>{transaction}</h2> */}
                            <p>{transaction.owner.username} posted on {new Date(transaction.createdAt).toLocaleDateString()}</p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default TransactionList;