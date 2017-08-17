import React from 'react';

const TableRow = ({ item, it, func }) => (
		<tr>
			<td>{it}</td>
			<td>{item.price}$</td>
			<td>{item.quantity}</td>
			<td>{<div><button onClick={() => func(it,"buy")}>Buy</button> <button onClick={() => func(it,"sell")}>Sell</button></div> }</td>
		</tr>
)

export default TableRow;