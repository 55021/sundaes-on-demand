import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    // O total deve começar como 0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    
    expect(scoopsSubtotal).toHaveTextContent('0.00');
    
    // Atualizar vanilla para 1 e verificar o subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaInput); // Limpar o input para certificar que o elemento inserido em seguida não será concatenado com algo que já esteja predefinido.
    await user.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // Atualizar chocolate para 2 e verificar o subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00');
});