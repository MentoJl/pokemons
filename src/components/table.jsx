import React, { useEffect, useState } from "react";
import styles from './assets/pokeTable.module.css';
import { Paragraph } from 'dracula-ui';
import ReactPaginate from "react-paginate";
import NextButton from './common/nextButton';
import PrevButton from './common/prevButon';
import { useData } from "./common/dataContext";

const Table = (prop) => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pokemonCounter, setPokemonCounter] = useState(0);
    const [pokemonDetails, setPokemonDetails] = useState([]);
  
    const itemsOnPage = useData();

    const fetchDataWithoutTags = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsOnPage.itemsValue}&offset=${currentPage * itemsOnPage.itemsValue}`);

      const data = await response.json();

      const pokemonData = data.results.map(async (pokemon) => {
        let detailedResponse = await fetch(pokemon.url);
        let detailedData = await detailedResponse.json();
        return detailedData;
      })
      let pokemonDetailsData = await Promise.all(pokemonData);

      setPokemonDetails(pokemonDetailsData);
      setPageCount(Math.ceil(data.count / itemsOnPage.itemsValue));
    };

    const fetchDataWithTags = async () => {
      let fetchedPokemons = 0;
      console.log(itemsOnPage.itemsValue);
      while (fetchedPokemons < 10) {
        for (let tag of itemsOnPage.pokeTags) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCounter+1}`);

          const data = await response.json();
          console.log(data);

          // const pokemonData = data.results.map(async (pokemon) => {
          //   let detailedResponse = await fetch(pokemon.url);
          //   let detailedData = await detailedResponse.json();
          //   return detailedData;
          // })
          // let pokemonDetailsData = await Promise.all(pokemonData);
    
          // setPokemonDetails(pokemonDetailsData);
          // setPageCount(Math.ceil(data.count / itemsOnPage.itemsValue));
          fetchedPokemons += 1;
        }
      }
    }

    useEffect(() => {
        try {
          if (itemsOnPage.pokeTags.length > 0) {
            fetchDataWithTags();
          } else {
            fetchDataWithoutTags();
          }
        } catch (error) {
          console.error(`ERROR: ${error}`);
        }
      }, [currentPage, itemsOnPage.itemsValue, itemsOnPage.pokeTags]);
    
      const changePage = ({ selected }) => {
        setCurrentPage(selected);
      };
    
      return (
        <div className={styles.pokeArea}>
            <ReactPaginate
                className={styles.pokePaginate}
                previousLabel={<PrevButton/>}
                nextLabel={<NextButton/>}
                breakLabel={''}
                pageCount={pageCount}
                forcePage={currentPage}
                onPageChange={changePage}
                activeClassName={styles.activePage}
                pageClassName={styles.pages}
                previousClassName={styles.prev}
                nextClassName={styles.next}
            />
            <div className={styles.pokeList} style={{ gridTemplateRows: `repeat(${itemsOnPage.itemsValue/5}, 1fr)`}}>
                {pokemonDetails.map((pokemon) => (
                    <div className={styles.pokeCard}>
                        <Paragraph className={`${styles.upperCase} ${styles.titleName}`} color="purple">{pokemon.name}</Paragraph>
                        <img className={styles.imgContent} src={pokemon.sprites.other.showdown.front_default}/>
                        {pokemon.types.map((type) => (
                            <span className={styles.typeName}>
                                <Paragraph className={styles.upperCase} color="red">{type.type.name}</Paragraph>
                            </span>
                        ))}
                        <Paragraph color="pink" className={styles.statTitle}>Stats:</Paragraph>
                        <Paragraph className={styles.statInfo} >HP: {pokemon.stats[0].base_stat}</Paragraph>
                        <Paragraph className={styles.statInfo} >Attack: {pokemon.stats[1].base_stat}</Paragraph>
                        <Paragraph className={styles.statInfo} >Defense: {pokemon.stats[2].base_stat}</Paragraph>
                        <Paragraph className={styles.statInfo} >Speed: {pokemon.stats[5].base_stat}</Paragraph>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Table;