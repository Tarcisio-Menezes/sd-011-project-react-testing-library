import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('No favorite pokemon found deve aparecer na tela', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  localStorage.clear();
  fireEvent.click(getByText(/bug/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/home/i));
  fireEvent.click(getByText(/fire/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/Favorite pokémons/i));
  expect(getAllByText(/More details/i).length).toBe(2);
});
