import React from 'react';

function Item({ data, handleDelete }) {
    const { name, amount, category, id, flow } = data;
    return (
        <li>
            <p>{name} ({category}): {amount} $</p> <button onClick={() => handleDelete(id, flow)}>X</button>
        </li>
    );
}

export default Item;