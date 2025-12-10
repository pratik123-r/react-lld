import { useState, useEffect, useRef, useCallback } from "react";

const fetchData = async (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 10 }, (_, i) => `Item ${page * 10 + i + 1}`)
      );
    }, 1000);
  });
};

// InfiniteScroll component - handles scroll detection and infinite loading logic
// Decoupled from Virtualization - accepts children for flexible composition
const InfiniteScroll = ({
  containerHeight,
  loadMore,
  hasMore,
  loading,
  onScrollTopChange,
  children,
  style = {},
}) => {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    // Notify parent about scroll position change
    if (onScrollTopChange) {
      onScrollTopChange(el.scrollTop);
    }

    // Check if need to load more
    if (loading || !hasMore) return;
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
        height: containerHeight + "px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

function Virtualization({
  containerHeight,
  itemHeight,
  items,
  scrollTop,
  loading,
}) {
  const totalHeight = itemHeight * items.length;
  const firstInd = Math.floor(scrollTop / itemHeight);
  const lastInd = Math.ceil((scrollTop + containerHeight) / itemHeight);
  const visibleItems = items.slice(firstInd, lastInd + 1);

  return (
    <>
      <div style={{ height: totalHeight + "px", position: "relative" }}>
        {visibleItems.map((item, index) => {
          const actualIndex = firstInd + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * itemHeight + "px",
                left: 0,
                right: 0,
                height: itemHeight + "px",
                padding: "20px",
                borderBottom: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      {loading && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          Loading more items...
        </div>
      )}
    </>
  );
}

export default function InfiniteScrollConfig() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newItems = await fetchData(page);
    setItems((prevItems) => [...prevItems, ...newItems]);
    setPage((prevPage) => prevPage + 1);

    if (newItems.length === 0) {
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, page]);

  const itemHeight = 58;
  const containerHeight = 400;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Infinite Scroll + Virtualization</h1>
      <p style={{ marginBottom: "10px", color: "#666" }}>
        Total items loaded: {items.length}
      </p>
      <InfiniteScroll
        containerHeight={containerHeight}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
        onScrollTopChange={setScrollTop}
      >
        {/* Option 1: With Virtualization (better performance for large lists) */}
        <Virtualization
          containerHeight={containerHeight}
          itemHeight={itemHeight}
          items={items}
          scrollTop={scrollTop}
          loading={loading}
        />

        {/* Option 2: Simple rendering without virtualization (uncomment to use) */}
        {/* {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              borderBottom: "1px solid #ddd",
            }}
          >
            {item}
          </div>
        ))}
        {loading && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Loading more items...
          </div>
        )} */}
      </InfiniteScroll>
    </div>
  );
}
