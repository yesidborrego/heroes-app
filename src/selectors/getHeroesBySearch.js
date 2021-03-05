import { heroes } from "../data/heroes"

export const getHeroesBySearch = (searchHero) =>{
  const textSearch = searchHero.toLowerCase().trim();
  if(textSearch.trim().length > 0) {
    return heroes.filter(hero => {
      return (
        hero.superhero.toLowerCase().trim().includes(textSearch) ||
        hero.publisher.toLowerCase().trim().includes(textSearch) ||
        hero.alter_ego.toLowerCase().trim().includes(textSearch)
      )
    });
  } else {
    return [];
  }
}