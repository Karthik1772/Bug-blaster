import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const mockNavigate = jest.fn();
const mockSetSort = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../context/TicketContext', () => ({
  useTickets: () => ({ sortPreference: 'None', setSortPreference: mockSetSort }),
}));

jest.mock('../../components/TicketList', () => () => <div>TicketListMock</div>);

import Home from './Home';

describe('Home page', () => {
  it('navigates to create page and sets sort preference', () => {
    render(<Home />);

    const createBtn = screen.getByRole('button', { name: /Create New Ticket/i });
    fireEvent.click(createBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/create');

    const select = screen.getByLabelText(/Sort by Priority/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'High to Low' } });
    expect(mockSetSort).toHaveBeenCalledWith('High to Low');
  });
});
