import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);
	const [err, setErr] = useState(false);
	const { totals } = useOrderDetails();

	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then((res) => {
				setItems(res.data);
				if (err) {
					setErr(false);
				}
			})
			.catch((err) => setErr(true));
	}, [optionType, err]);

	if (err) return <AlertBanner />;

	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

	const optionItems = items.map(({ name, imagePath }) => (
		<ItemComponent key={name} name={name} imagePath={imagePath} />
	));

	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {formatCurrency(totals[optionType])}
			</p>
			<Row>{optionItems}</Row>
		</>
	);
}
