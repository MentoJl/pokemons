import React from "react";
import styles from './assets/navigationButton.module.css';
import { Paragraph } from "dracula-ui";

const NextButton = () => {
    return (
        <button className={styles.navigationButtonLeft}>
            <Paragraph className={styles.navigationText} color="green">
                ❮
            </Paragraph>
        </button>
    );
}

export default NextButton;