import React from 'react';

const PortfolioTableRow = ({ company, shares, price}) => (
	<tr>
		<td>{company}</td>
		<td>{shares}</td>
		<td>{price * shares}</td>

	</tr>
)

export default PortfolioTableRow;