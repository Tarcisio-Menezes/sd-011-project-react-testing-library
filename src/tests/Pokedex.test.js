import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';

const namePokemons = Data.map(({ name }) => name);
const typePokemons = Data.map(({ type }) => type);

test('Testando componente Pokedex.js', () => {
  const { container, getByText } = renderWithRouter(<App />);
  const title = container.querySelector('h2');
  expect(title.textContent).toBe('Encountered pokémons');

  const Button = getByText(/Próximo pokémon/);
  expect(Button).toBeInTheDocument();

  namePokemons.forEach((pokemon) => {
    expect(getByText(pokemon)).toBeInTheDocument();
    fireEvent.click(Button);
  });

  expect(getByText('Pikachu')).toBeInTheDocument();
});

it('Verificando button ', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const but = getAllByTestId('pokemon-type-button');
  const mapButton = but.map((b) => b.textContent);
  const verify = typePokemons.every((type) => mapButton.includes(type));
  expect(verify).toBeTruthy();
});
