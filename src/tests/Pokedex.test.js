import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('A page contém o título "Encountered pokémons"? ', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedexPage = getByText(/Encountered pokémons/);
    expect(pokedexPage).toBeInTheDocument();
  });

  it('O próximo poke é exibido ao clicar em "Próximo pokémon"?', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Próximo pokémon/));
    const nextPoke = getByText(/Charmander/);
    expect(nextPoke).toBeInTheDocument();
  });

  it('O botão contém o texto "Próximo pokémon"?', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/);
    expect(button).toBeInTheDocument();
    const nextButton = getByTestId(/next-pokemon/);
    expect(nextButton).toBeInTheDocument();
  });

  it('Os pokes são mostrados ao clicar sucessivamente em "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(<App />);
    const pika = getByText(/Pikachu/);
    expect(pika).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const caterpie = getByText(/Caterpie/);
    expect(caterpie).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const ekans = getByText(/Ekans/);
    expect(ekans).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const alakazam = getByText(/Alakazam/);
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const mew = getByText(/Mew/);
    expect(mew).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const rapidash = getByText(/Rapidash/);
    expect(rapidash).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const snorlax = getByText(/Snorlax/);
    expect(snorlax).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const dragonair = getByText(/Dragonair/);
    expect(dragonair).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const pikaReturn = getByText(/Pikachu/);
    expect(pikaReturn).toBeInTheDocument();
  });

  it('A pokédex tem botões de filtro?', () => {
    const { getByText } = renderWithRouter(<App />);
    const allFilter = getByText(/All/);
    expect(allFilter).toBeInTheDocument();
    fireEvent.click(getByText(/Dragon/));
    const electricFilter = getByText(/Electric/);
    expect(electricFilter).toBeInTheDocument();
    const fireFilter = getByText(/Fire/);
    expect(fireFilter).toBeInTheDocument();
    const bugFilter = getByText(/Bug/);
    expect(bugFilter).toBeInTheDocument();
    const poisonFilter = getByText(/Poison/);
    expect(poisonFilter).toBeInTheDocument();
    const psychicFilter = getByText(/Psychic/);
    expect(psychicFilter).toBeInTheDocument();
    const normalFilter = getByText(/Normal/);
    expect(normalFilter).toBeInTheDocument();
    fireEvent.click(getByText(/All/));
    const dragonFilter = getByText(/Dragon/);
    expect(dragonFilter).toBeInTheDocument();
  });

  it('A pokédex tem botões de filtro dinâmicos?', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId(/pokemon-type-button/i);
    expect(filterButtons.length).toBe(Number('7'));
  });

  it('A partir de um filtro a pokédex circula somente pelos pokes daquele tipo?', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Fire/));
    const charm = getByText(/Charmander/);
    expect(charm).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    const rapi = getByText(/Rapidash/);
    expect(rapi).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/));
    expect(charm).toBeInTheDocument();
  });

  it('A pokédex tem um botão de resetar o filtro?', () => {
    const { getByText } = renderWithRouter(<App />);
    const allFilter = getByText(/All/);
    expect(allFilter).toBeInTheDocument();
    fireEvent.click(getByText(/All/));
    const pika = getByText(/Pikachu/);
    expect(pika).toBeInTheDocument();
    fireEvent.click((getByText(/Próximo pokémon/)));
    const charm = getByText(/Charmander/);
    expect(charm).toBeInTheDocument();
  });

  it('Ao carregar a page o filtro pré selecionado é All?', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click((getByText(/Próximo pokémon/)));
    const charm = getByText(/Charmander/);
    expect(charm).toBeInTheDocument();
  });

  it('"Próximo pokémon" é desabilitado quando o filtro retorna apenas 1 espécie?', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click((getByText(/Normal/)));
    const nextButton = getByText(/Próximo pokémon/);
    expect(nextButton).toBeDisabled();
  });
});
