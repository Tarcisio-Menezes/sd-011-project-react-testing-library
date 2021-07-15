import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test if it is displayed on the screen if you dont have favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const unfavoritePokemon = getByText('No favorite pokemon found');

    expect(unfavoritePokemon).toBeInTheDocument();
  });
});
