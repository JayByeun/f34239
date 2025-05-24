import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'
import React, { JSX, ReactNode } from 'react';

const Button = ({children}: {children: ReactNode}): JSX.Element => {
    return (
        <button>{children}</button>
    )
};

describe('Button', () => {
  it('renders text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
});
