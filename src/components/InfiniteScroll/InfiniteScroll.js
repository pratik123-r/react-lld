import { useState, useEffect } from "react";

const fetchData = async (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                Array.from({ length: 10 }, (_, i) => `Item ${page * 10 + i + 1}`)
            );
        }, 1000);
    });
};

const InfiniteScroll = ({children, loadMore}) => {

    useEffect(() => {
        loadMore();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5
        ) {
            loadMore();
        }
    };

    return (
        <>
         { children }
        </>
    );
};


 export default function InfiniteScrollConfig() {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const newItems = await fetchData(page);
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);

        if (newItems.length === 0) {
            setHasMore(false);
        }
        setLoading(false);
    };

    return (
        <>
            <InfiniteScroll loadMore={loadMore}>
                <div style={{ padding: "10px" }}>
                    {items.map((item, index) => (
                        <div key={index} style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
                            {item}
                        </div>
                    ))}
                    {loading && <h4>Loading...</h4>}
                    {!hasMore && <p>No more items</p>}
                </div>
            </InfiniteScroll>
        </>
    )
}
