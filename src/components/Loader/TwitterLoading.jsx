import React from 'react'
import { Twitter } from '@mui/icons-material';

const TwitterLoading = () => {
    const styles = {
        patentElement: {
            width: "100%",
            height: "100vh",
            background: "var(--twitter-white)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        twitterIconStyles: {
            color: "var(--twitter-color)",
            fontSize: "5rem"
        }
    }

    return (
        <div style={styles.patentElement}>
            <Twitter style={styles.twitterIconStyles} />
        </div>
    );
}

export default TwitterLoading