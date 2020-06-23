import React, { useEffect, useState } from 'react';
import NewsChart from '../line-chart/NewsChart';
import './Feeds.css';
import axios from 'axios';
import DataTable from '../data-table/DataTable';

function Feeds() {
    const [newsData, setNewsData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [chartData, setChartData] = useState({});

    useEffect(() => { 
        const cachedData = sessionStorage.getItem(pageNumber);
        if(cachedData) {
            const parsedData = JSON.parse(cachedData);
           setNewsData([...parsedData]);
           createChartData(parsedData);
           console.log("cached",JSON.parse(cachedData))
        } else {
            axios.get('https://hn.algolia.com/api/v1/search?page=' + pageNumber)
                .then(function (response) {
                    console.log(response.data.hits);
                    const data = response.data.hits;
                    setNewsData([...data]);
                    createChartData(data);
                    sessionStorage.setItem(pageNumber, JSON.stringify(data));
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
            
    }, [pageNumber])

    const createChartData = (data)=>{
        console.log(data);
        const chartDt = {};
        for (let x of data) {
            chartDt[x.objectID] = x.points
        }
        setChartData({...chartDt})
        console.log(chartData)
    }

    const setPreviousPageNumber = (pageNo) => {
        if (pageNo < 0) {
            return;
        }
        setPageNumber(pageNumber - 1);
    }

   const deletePost = (newsId)=>{
        const updatedNewsData = [...newsData];    
        const filteredNewsData = updatedNewsData.filter((news)=>news.objectID !== newsId)
        sessionStorage.setItem(pageNumber, JSON.stringify(filteredNewsData));
        setNewsData([...filteredNewsData]);
        createChartData(filteredNewsData);
    }
   
    const upVoteCount = (newsId) => {
        const updatedNewsData = [...newsData];
        updatedNewsData.map((news)=>{
            if(news.objectID === newsId) return news.points++;
        })
        sessionStorage.setItem(pageNumber, JSON.stringify(updatedNewsData));
        setNewsData([...updatedNewsData]);
        createChartData(updatedNewsData);
    }

    return (
        <div className="Feeds">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr bgcolor="#ff6600">
                                    <th scope="col" width='100'>Comments</th>
                                    <th scope="col" width='55'>Vote Count</th>
                                    <th scope="col" width='70'>UpVote</th>
                                    <th scope="col">News Details</th>
                                </tr>
                            </thead>
                            <tbody>

                            {newsData.map(hits=>{
                                        return <DataTable comments={hits.num_comments} 
                                        title={hits.title}
                                        altTitle={hits._highlightResult && hits._highlightResult.title ? hits._highlightResult.title.value : null}
                                        url={hits.url}
                                        id={hits.objectID}
                                        click={()=>deletePost(hits.objectID)}
                                        upVoteCount={()=>upVoteCount(hits.objectID)}
                                        key={hits.objectID}
                                        author={hits.author}
                                        voteCount={hits.points}
                                        createdTime={hits.created_at}></DataTable>
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="float-right pagination">
                        <span><a className={pageNumber == 0 ? 'disabled' : ''} role="button" onClick={() => setPreviousPageNumber(pageNumber - 1)} >Previous</a></span>&nbsp;|&nbsp;<span><a role="button" onClick={() => setPageNumber(pageNumber + 1)}>Next</a></span>
                    </div>
                </div>
            </div>
            <NewsChart data={chartData} />
        </div>
    );
}

export default Feeds;