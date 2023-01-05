import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('checkbox is unchecked by default', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox.checked).toBe(false);
});

test('checkbox toggles button', async () => {
	const user = userEvent.setup();

	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox');
	const button = screen.getByRole('button', { name: 'Confirm order' });

	await user.click(checkbox);
	expect(button.disabled).toBe(false);
	await user.click(checkbox);
	expect(button.disabled).toBe(true);
});

test('popover responds to hover', async () => {
	const user = userEvent.setup();

	render(<SummaryForm />);

	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i
	);

	expect(nullPopover).not.toBeInTheDocument();

	const termsAndConditions = screen.getByText(/terms and conditions/i);

	await user.hover(termsAndConditions);
	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument();

	await user.unhover(termsAndConditions);
	expect(popover).not.toBeInTheDocument();
});
