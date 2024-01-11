import React from "react";
import styles from './assets/pokeTitle.module.css';
import { useRef } from "react";

const Scroller = (prop) => {

    const scroller = useRef();
    let scroll = true;

    let scrollTitle = () => {
        scroller.current.textContent = scroll ? "▼" : "▲";
        scroll = !scroll; 
        prop.scrolling(scroll);
    }

    return (
        <div ref={scroller} className={styles.scroller} onClick={scrollTitle}>
            ▲
        </div>
    )
}

export default Scroller;