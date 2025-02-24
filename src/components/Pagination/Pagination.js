import { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        <button 
          className="page-button" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-button ${currentPage === number ? "active" : ""}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button 
          className="page-button" 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  



export default function PaginationConfig() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(() => {
      fetchData(currentPage);
    }, [currentPage]);
  
    const fetchData = async (page) => {
      try {
        const response = await fetch(`https://dummyjson.com/products?skip=${page-1}&limit=10`);
        const result = await response.json();
  
        setData(result.products);
        setTotalPages( Math.ceil(result.total/10)); // Ensure API returns total pages
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <div>
        <h2>API Pagination Example</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
  
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    );
}

