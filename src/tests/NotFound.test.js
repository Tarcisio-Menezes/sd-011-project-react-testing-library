import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('A page contém o título "Page requested not found 😭"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const NotFoundPage = getByText(/Page requested not found/i);
    expect(NotFoundPage).toBeInTheDocument();
  });

  it('A página mostra a imagem do Pika chorando?', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
