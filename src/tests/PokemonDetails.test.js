import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it('As infos detalhadas são mostradas na tela?', () => {
    const { getByText, queryAllByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const namePoke = getByText(/Pikachu Details/i);
    expect(namePoke).toBeInTheDocument();
    const buttonsNav = queryAllByRole(/Button/i);
    expect(buttonsNav.length).toBe(Number('0'));
    expect(getByText(/Summary/i)).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon roasts/i)).toBeInTheDocument();
  });

  it('Existem mapas na page?', () => {
    const { getByText, queryAllByRole, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const paragraph = getByText(/Game Locations of Pikachu/);
    expect(paragraph).toBeInTheDocument();
    const images = queryAllByRole(/img/i);
    expect(images.length).toBe(Number('3'));
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    const locations = getAllByAltText('Pikachu location');
    expect(locations.length).toBe(Number('2'));
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Posso favoritar um poke pela page?', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const favoritePoke = 'Pokémon favoritado?';
    const clickFavorite = fireEvent.click(getByText(favoritePoke));
    expect(clickFavorite).toEqual(true);
    const clickFavoriteTwo = fireEvent.click(getByText('Pokémon favoritado?'));
    expect(clickFavoriteTwo).toEqual(true);
    expect(getByLabelText(favoritePoke)).toBeInTheDocument();
  });
});
