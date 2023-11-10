import React from "react";
import './SearchResults.css';
import RepoCard from "../repoCard/RepoCard";

function SearchResults({ data, loading }) {
    if(!data.length) {
        return(
            <h3>No results found!</h3>
        )
    }
    return (
        <div className='search-res-container'>
            {
                loading ? 'Loading...' : data.map((item, idx) => (
                    <RepoCard key={item.id} repoInfo={item}/>
                ))
            }
        </div>
    );
}

export default SearchResults;
