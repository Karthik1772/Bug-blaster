import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../components/TicketForm', () => () => <div>TicketFormMock</div>);

jest.mock('../../context/TicketContext', () => ({
  useTickets: () => ({ refreshTickets: jest.fn() }),
}));

import CreateTicket from './CreateTicket';

describe('CreateTicket page', () => {
  it('renders and navigates back to home', () => {
    render(<CreateTicket />);

    expect(screen.getByText(/Create New Ticket/i)).toBeInTheDocument();

    const back = screen.getByRole('button', { name: /Back to Home/i });
    fireEvent.click(back);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
