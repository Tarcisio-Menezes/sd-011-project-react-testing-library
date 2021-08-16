import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWhithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  test('A mensagem "No favorite pokemon found" é exibida corretamente?', () => {
    const { getByText } = renderWhithRouter(<FavoritePokemons />);
    const favoritePage = getByText(/No favorite pokemon found/);
    expect(favoritePage).toBeInTheDocument();
  });

  test('Os pokémons podem ser favoritados?', () => {
    const { getByText, history } = renderWhithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    fireEvent.click(getByText(/Pokémon favoritado?/));
  });

  it('Os pokémons favoritados aparecem na page FavoritePokemons', () => {
    const { getByText } = renderWhithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const pokemon = getByText(/Pikachu/);
    expect(pokemon).toBeInTheDocument();
  });
});
