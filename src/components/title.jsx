import React, { useEffect, useRef, useState } from "react";
import styles from './assets/pokeTitle.module.css';
import { Paragraph } from 'dracula-ui';
import 'dracula-ui/styles/dracula-ui.css';
import Scroller from './scroller';
import { useData } from "./common/dataContext";

const Table = (prop) => {

    const title = useRef();
    const itemsOnPage = useData();
    const [activeTags, changeActiveTag] = useState([]);
    const searchContent = useRef();

    const scrollTitle = (scroll) => {
        title.current.style.marginTop = scroll ? '0px' : '-190px';
    }

    const changeItemsOnPage = (newValue) => {
        itemsOnPage.updateItemsValue(newValue);
    }

    const changeTags = (newValue) => {
        itemsOnPage.updatePokeTags(newValue);
    }

    const searchButtonClick = () => {
        itemsOnPage.updateSearchContent(searchContent.current.value.toLowerCase());
    }

    const setActiveTag = (event) => {
        if (event.target.style.backgroundColor != 'rgb(242, 121, 170)') {
            event.target.style.backgroundColor = 'rgb(242, 121, 170)';
            event.target.style.color = 'rgb(40, 42, 54)';
        } else {
            event.target.style.backgroundColor = 'rgb(40, 42, 54)';
            event.target.style.color = 'rgb(255, 128, 191)';
        }
        let index = activeTags.indexOf(event.target.textContent);
        if (index !== -1) {
            activeTags.splice(index, 1);
        } else {
            activeTags.push(event.target.textContent.toLowerCase());
        }
        changeTags(activeTags);
    }

    return (
        <div className={styles.pokeArea}>
            <div className={styles.pokePlaceTitle} ref={title} >
                <div className={styles.searchArea}>
                <input onChange={searchButtonClick} ref={searchContent} className={styles.searcher}></input> <Paragraph onClick={searchButtonClick} className={styles.searchButton} color="green">Search</Paragraph>
                </div>
                <div className={styles.pokePlaceTags}>
                <Paragraph color="purple" className={styles.tags}>Tags:</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Normal</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Fire</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Water</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Grass</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Electric</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Ice</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Fighting</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Poison</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Ground</Paragraph>
                    <Paragraph onClick={setActiveTag} className={styles.pokeTags} color="pink">Flying</Paragraph>
                </div>
                <div className={styles.itemsPlaceNumber}>
                    <div className={styles.placeNumber}>
                    <Paragraph color="purple">Count on Page:</Paragraph>
                        <button onClick={() => {changeItemsOnPage(10)}} className={styles.buttonItemsNumber}><Paragraph color="gray">1O</Paragraph></button>
                        <button onClick={() => {changeItemsOnPage(20)}} className={styles.buttonItemsNumber}><Paragraph color="gray">2O</Paragraph></button>
                        <button onClick={() => {changeItemsOnPage(50)}} className={styles.buttonItemsNumber}><Paragraph color="gray">5O</Paragraph></button>
                    </div>
                </div>
            </div>
            <Scroller scrolling={scrollTitle}/>
        </div>
    );
};

export default Table;