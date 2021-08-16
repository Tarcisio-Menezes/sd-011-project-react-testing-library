import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  it('O nome e tipo do poke são exibidos no card?', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const pika = getByText(/Pikachu/);
    expect(pika).toBeInTheDocument();
    const pokeType = getAllByText(/Electric/);
    const nPokeType = pokeType.length;
    expect(nPokeType).toBe(Number(2));
  });

  it('O peso dos pokes é exibido corretamente?', () => {
    const { getByText } = renderWithRouter(<App />);
    const selecText = getByText(/Average weight: 6.0 kg/);
    expect(selecText).toBeInTheDocument();
  });

  it('A imagem e os detalhes são exibidos corretamente', () => {
    const { getByAltText, getByText, history } = renderWithRouter(<App />);
    const image = getByAltText(/Pikachu/);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toBeInTheDocument();
    fireEvent.click(getByText(/More details/));
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
  });

  it('Existe um ícone de favorito nos favoritados?', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    const image = getByAltText(/Pikachu is marked as favorite/i);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
