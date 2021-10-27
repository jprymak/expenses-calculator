import React from 'react';

import "./Item.css"

function Item({ data, handleDelete }) {
    const { name, amount, category, id, flow } = data;
    return (
        <li className="Item">
            <p>{name} ({category}): {amount} $</p> <button onClick={() => handleDelete(id, flow)}>X</button>
        </li>
    );
}

export default Item;