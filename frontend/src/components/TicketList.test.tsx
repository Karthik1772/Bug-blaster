import React from 'react';
import { render, screen } from '@testing-library/react';
import TicketList from './TicketList';

jest.mock('../../context/TicketContext', () => ({
  useTickets: jest.fn(),
}));

jest.mock('../../utilities/sortingUtilities', () => ({
  sortTickets: (tickets: any[]) => tickets,
}));

// Mock TicketItem to keep tests focused
jest.mock('../TicketItem', () => () => <div>TicketItemMock</div>);

describe('TicketList', () => {
  afterEach(() => jest.restoreAllMocks());

  it('shows loading state', () => {
    const { useTickets } = require('../../context/TicketContext');
    useTickets.mockReturnValue({ loading: true, error: null, tickets: [], sortPreference: 'None' });

    render(<TicketList />);
    expect(screen.getByText(/Loading tickets.../i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    const { useTickets } = require('../../context/TicketContext');
    useTickets.mockReturnValue({ loading: false, error: 'Oops', tickets: [], sortPreference: 'None' });

    render(<TicketList />);
    expect(screen.getByText(/Error: Oops/i)).toBeInTheDocument();
  });

  it('shows no tickets message', () => {
    const { useTickets } = require('../../context/TicketContext');
    useTickets.mockReturnValue({ loading: false, error: null, tickets: [], sortPreference: 'None' });

    render(<TicketList />);
    expect(screen.getByText(/No tickets found. Create your first ticket!/i)).toBeInTheDocument();
  });

  it('renders ticket items when present', () => {
    const { useTickets } = require('../../context/TicketContext');
    useTickets.mockReturnValue({ loading: false, error: null, tickets: [{ _id: 'a' }], sortPreference: 'None' });

    render(<TicketList />);
    expect(screen.getByText(/TicketItemMock/i)).toBeInTheDocument();
  });
});
