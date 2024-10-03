const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/transactions`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (transactionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (transactionFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteTransaction = async (transactionId) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

async function update(transactionId, transactionFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

const createItem = async (transactionId, itemFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}/items`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteItem = async (transactionId, itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const updateItem = async (transactionId, itemId, itemFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${transactionId}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export { index, show, create, deleteTransaction, update, createItem, deleteItem, updateItem };
