import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

import NotFound from './NotFound';

describe('NotFound page', () => {
  it('renders message and navigates home', () => {
    render(<NotFound />);

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /Go Home/i });
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
