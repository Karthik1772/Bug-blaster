import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TicketForm from './TicketForm';

describe('TicketForm', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders inputs and calls onSubmit with form data', async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);

    render(<TicketForm onSubmit={mockOnSubmit} buttonText="Save" />);

    const title = screen.getByLabelText(/Title/i) as HTMLInputElement;
    const description = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;
    const submit = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(title, { target: { value: 'Bug' } });
    fireEvent.change(description, { target: { value: 'Something is broken' } });
    fireEvent.click(submit);

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Bug',
      description: 'Something is broken',
      priority: '1',
    });
  });

  it('shows alert when fields are empty', async () => {
    const mockOnSubmit = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<TicketForm onSubmit={mockOnSubmit} />);

    const submit = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submit);

    expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
