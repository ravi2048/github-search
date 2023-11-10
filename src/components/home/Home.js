import React, { useEffect, useState } from "react";
import "./Home.css";
import SearchResults from "../searchResults/SearchResults";

function Home() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('sel');
    const [orderBy, setOrderBy] = useState('sel');
    const [maxRes, setMaxRes] = useState(30);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async () => {
        if(query) {
            setLoading(true);
            const endPoint = `https://api.github.com/search/repositories?q=${query}&sort=${sortBy}&order=${orderBy}&per_page=${maxRes}`;
            const res = await fetch(endPoint);
            const resData = await res.json();
            setData(resData.items)
            setLoading(false);
        } else {
            alert('Please enter a repo name');
        }
    };

    const handleOptionChange = (e) => {
        const qParam = e.target.options[e.target.selectedIndex].value;
        const selParam = e.target.options[e.target.selectedIndex].getAttribute('data-param');

        if(selParam === 'sort') {
            setSortBy(qParam)
        } else if(selParam === 'order') {
            setOrderBy(qParam);
        } else if(selParam === 'max') {
            setMaxRes(qParam);
        }
    };

    const handleReset = () => {
        setOrderBy('sel');
        setSortBy('sel');
        setMaxRes(30);
    };

    useEffect(() => {
        if(query) {
            handleSubmit();
        }
    }, [orderBy, maxRes, sortBy])

    return (
        <div className='container'>
            <div className='search-container'>
                <input type='text' onChange={handleChange} value={query} placeholder='Search by repo names..'/>
                <button onClick={handleSubmit}>Search</button>
            </div>
            <div className='sort-options'>
                <label htmlFor="sort">Sort By:</label> &nbsp;
                <select name="sort" id="sort" onChange={handleOptionChange} value={sortBy}>
                    <option value="sel" data-param="sort">Select</option>
                    <option value="stars" data-param="sort">Stars</option>
                    <option value="forks" data-param="sort">Forks</option>
                    <option value="updated" data-param="sort">Last updated</option>
                </select>
                &nbsp;&nbsp;                
                <label htmlFor="order">Order:</label> &nbsp;
                <select name="order" id="order" onChange={handleOptionChange} value={orderBy}>
                    <option value="sel" data-param="order">Select</option>
                    <option value="desc" data-param="order">Descending</option>
                    <option value="asc" data-param="order">Ascending</option>
                </select>
                
                &nbsp;&nbsp;                
                <label htmlFor="max">Max Results:</label> &nbsp;
                <select name="max" id="max" onChange={handleOptionChange} value={maxRes}>
                    <option value="30" data-param="max">30</option>
                    <option value="50" data-param="max">50</option>
                    <option value="100" data-param="max">100</option>
                </select>

                &nbsp;&nbsp;
                <button onClick={handleReset}>Reset All</button>
            </div>
            <div className='result-container'>
                <SearchResults data={data} loading={loading} />
            </div>
        </div>
    );
}

export default Home;
