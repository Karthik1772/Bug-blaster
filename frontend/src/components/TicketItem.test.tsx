import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketItem from './TicketItem';

const mockNavigate = jest.fn();
const mockRefresh = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../context/TicketContext', () => ({
  useTickets: () => ({ refreshTickets: mockRefresh }),
}));

jest.mock('../../services/api', () => ({
  deleteTicket: jest.fn().mockResolvedValue(undefined),
}));

describe('TicketItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to edit on Edit click', () => {
    const ticket = { _id: '1', title: 'T', description: 'D', priority: 2 as 2 };
    render(<TicketItem ticket={ticket} />);

    const edit = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(edit);

    expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
  });

  it('deletes ticket when confirmed', async () => {
    const ticket = { _id: '2', title: 'T2', description: 'D2', priority: 1 as 1 };
    (window.confirm as any) = jest.fn(() => true);

    const { deleteTicket } = require('../../services/api');

    render(<TicketItem ticket={ticket} />);

    const del = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(del);

    await waitFor(() => expect(deleteTicket).toHaveBeenCalledWith('2'));
    expect(mockRefresh).toHaveBeenCalled();
  });
});
