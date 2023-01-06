import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// Criar custom hook para verificar se estamos em um provider
export function useOrderDetails() {
	const contextValue = useContext(OrderDetails);

	if (!contextValue) {
		throw new Error(
			'useOrderDetails must be used within a OrderDetailsProvider'
		);
	}

	return contextValue;
}

export function OrderDetailsProvider(props) {
	const { children } = props;
	const [optionCounts, setOptionCounts] = useState({
		scoops: {}, // Exemplo: { Chocolate: 1, Vanilla: 2 }
		toppings: {},
	});

	function updateItemCount(itemName, newItemCount, optionType) {
		// Copiar o objeto atual
		const newOptionCount = { ...optionCounts };

		// Atualizar o novo objeto
		newOptionCount[optionType][itemName] = newItemCount; // Exemplo: newOptionCount.scoops.chocolate = 2

		// Atualizar o estado com a cópia atualizada
		setOptionCounts(newOptionCount);
	}

	function resetOrder() {
		setOptionCounts({ scoops: {}, toppings: {} });
	}

    function calculateTotal(optionType) {
        // Recebe array de valores da order
        const countsArray = Object.values(optionCounts[optionType]);

        // Soma o total dos valores
        const totalCount = countsArray.reduce((total, value) => total + value, 0)

        return totalCount * pricePerItem[optionType];
    }

    const totals = {
        scoops: calculateTotal('scoops'),
        toppings: calculateTotal('toppings'),
    }

    // Enviando getters e setters
	const value = { optionCounts, totals, updateItemCount, resetOrder };

	return (
		<OrderDetails.Provider value={value} {...props}>
			{children}
		</OrderDetails.Provider>
	);
}
