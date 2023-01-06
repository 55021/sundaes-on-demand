import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';
import ToppingOption from './ToppingOption';
import Alert from 'react-bootstrap/Alert';

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
           .then(res => {
               setItems(res.data);
               if (err) {
                   setErr(false);
               }
        })
           .catch(err => setErr(true));
    }, [optionType, err]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    const optionItems = items.map(({name, imagePath}) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
    ));

    const alertBanner = (
        <Alert variant="danger">
            An unexpected error occurred. Please try again later.
        </Alert>
    )

    return (
    <Row>
        !err ? {optionItems} : {alertBanner}
    </Row>);
};