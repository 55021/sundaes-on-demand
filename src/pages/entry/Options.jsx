import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
           .then(res => setItems(res.data))
           .catch(err => console.log(err));
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : '';

    const optionItems = items.map(({name, imagePath}) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
    ));

    return (
    <Row>
        {optionItems}
    </Row>);
};