import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';

import App from '@/App';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/header/Header';
import {ThemeProvider} from '@/components/layout/ThemeContext';
import ReIcon from '@/components/ui/ReIcon';

describe('App smoke test', () => {
  it('renders without crashing', () => {
    const {container} = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );
    expect(container).toBeInTheDocument();
  });
});

describe('Header smoke test', () => {
  it('renders navigation', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(screen.getAllByText('Icons')[0]).toBeInTheDocument();
  });
});

describe('Footer smoke test', () => {
  it('renders footer content', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(screen.getAllByText('Reicon').length).toBeGreaterThanOrEqual(1);
  });
});

describe('ReIcon component', () => {
  it('renders a custom element with correct props', () => {
    const {container} = render(
      <ReIcon icon="home" weight="filled" size={24} color="red" />,
    );
    const el = container.querySelector('re-icon');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('icon', 'home');
    expect(el).toHaveAttribute('weight', 'filled');
    expect(el).toHaveAttribute('size', '24');
    expect(el).toHaveAttribute('color', 'red');
  });
});
