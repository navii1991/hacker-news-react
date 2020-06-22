import React from 'react';

function DataTable(prop) {
   const getHostNameFromUrl = (uri) => {
       if(uri === null || uri ==="") return 'NA';
        const url = new URL(uri);
        return url.hostname;
    }

    const getFormatedTime = (time)=>{
        let d = new Date(time);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
        let currDateTime = new Date();
        let days = currDateTime.getTime() - d.getTime();
        let hours = days/(1000 * 3600);
        if(hours < 1) return hours*60 + "minutes ago";
        if(hours >1 && hours < 24) return hours + "hour ago";
        return "on " +months[d.getMonth()] +" "+ d.getDay() +", "+  d.getFullYear();
    }

    return (
        <tr >
            <th scope="row" className="text-center">{prop.comments || 0}</th>
            <td className="text-center">{prop.voteCount}</td>
            <td className="text-center">
                <a role="button" onClick={prop.upVoteCount}>
                    <i className="fa fa-caret-up icon-caret-up" aria-hidden="true"></i>
                </a>
            </td>
            <td className="news-details">
                <a className='title' href={prop.url}>{prop.title || prop.altTitle || 'N/A'}</a> &nbsp;
                <a className='small-text' href={prop.url}><span>({getHostNameFromUrl(prop.url)})</span></a>
                &nbsp;<span>by <strong>{prop.author}</strong> {getFormatedTime(prop.createdTime)}</span>
                &nbsp;<span onClick={prop.click} className="cursor">[ <strong>Hide</strong> ]</span>
            </td>
        </tr>
    )
}

export default DataTable;