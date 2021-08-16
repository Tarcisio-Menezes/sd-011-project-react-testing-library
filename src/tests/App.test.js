import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a navegação e a existência dos links', () => {
  it('A página principal da Pokedex é renderizada em "/"?', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('O topo da aplicação tem um conjunto de links para navegação?', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
    const linkFavorite = getByText(/Favorite Pokémons/i);
    expect(linkFavorite).toBeInTheDocument();
  });

  it('A aplicação é redirecionada p/ a page inicial, ao clicar no link Home?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const url = history.location.pathname;
    expect(url).toBe('/');
    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  it('A aplicação é redirecionada p/ a page About, ao clicar no link About?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const url = history.location.pathname;
    expect(url).toBe('/about');
    const About = getByText(/About Pokédex/i);
    expect(About).toBeInTheDocument();
  });

  it('A aplicação é redirecionada p/ a page Favorite ao clicar no link Favorite?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite/i));
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
    const favorite = getByText(/Favorite pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  it('A aplicação é redirecionada p/ Not Found quando a url é desconhecida?', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nao-encontro-a-url');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
