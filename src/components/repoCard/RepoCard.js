import React from 'react'
import './RepoCard.css';

function RepoCard({ repoInfo }) {
    let desc = repoInfo?.description;
    if (desc && desc.length > 70) {
        desc = desc?.substring(0, 70) + '...';
    }

    return (
        <div className='card-container'>
            <div className='top'>
                <a href={repoInfo?.html_url} target="_blank" rel="noreferrer">
                    <img alt='avatar' src={repoInfo?.owner?.avatar_url} />
                </a>
                <div className='stars'>{repoInfo?.stargazers_count} ⭐</div>
            </div>
            <div className='bottom'>
                <div className='name'><b>{repoInfo?.name}</b></div>
                <div className='desc'>{desc}</div>
                <div className='langs'>Language: {repoInfo?.language}</div>
            </div>
        </div>
    )
}

export default RepoCard;