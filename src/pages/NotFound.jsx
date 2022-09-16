const NotFound = () => {
    const styles = {
        flex: "1",
        textAlign: "center",
        paddingTop: "4rem",
        color: "var(--twitter-color)",
        fontSize: "36px",
        lineHeight: "44px",
        textShadow: "0 1px 1px rgba(0 0 0 / 12%)",
    }
    return (
        <div style={styles}>
            <h1>Not Found</h1>
        </div>
    );
}

export default NotFound;