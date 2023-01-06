import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);
    
    const altText = scoopImages.map(scoop => scoop.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });

    expect(toppingImages).toHaveLength(3);

    const toppingTitles = toppingImages.map(topping => topping.alt);
    expect(toppingTitles).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
})

test('displays alertBanner for error', async() => {
    render(<Options optionType="juggler" />);

    const alertBanner = await screen.findByRole('alert');

    expect(alertBanner).toBeInTheDocument();
})