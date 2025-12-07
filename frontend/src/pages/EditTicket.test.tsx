import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}));

jest.mock('../../components/TicketForm', () => () => <div>TicketFormMock</div>);

jest.mock('../../context/TicketContext', () => ({
  useTickets: () => ({ refreshTickets: jest.fn() }),
}));

jest.mock('../../services/api', () => ({
  getTicketById: jest.fn().mockResolvedValue({ title: 'T', description: 'D', priority: '1' }),
  updateTicket: jest.fn().mockResolvedValue(undefined),
}));

import EditTicket from './EditTicket';

describe('EditTicket page', () => {
  it('loads ticket and renders form', async () => {
    render(<EditTicket />);

    expect(screen.getByText(/Loading ticket.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Edit Ticket/i)).toBeInTheDocument());
    expect(screen.getByText(/TicketFormMock/i)).toBeInTheDocument();
  });
});
