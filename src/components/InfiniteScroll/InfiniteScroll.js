import { useState, useEffect, useRef } from "react";

// Mock API function
const fetchData = async (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => `Item ${page * 10 + i + 1}`)
      );
    }, 1000);
  });
};

// InfiniteScroll component with internal scroll detection
const InfiniteScroll = ({ children, loadMore, hasMore, loading }) => {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      loadMore();
    }
  };

  useEffect(() => {
    loadMore(); // Initial load
  }, []);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      {children}
    </div>
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
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loading={loading}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{ padding: 20, borderBottom: "1px solid #ddd" }}
        >
          {item}
        </div>
      ))}
      {loading && <h4>Loading...</h4>}
      {!hasMore && <p>No more items</p>}
    </InfiniteScroll>
  );
}
