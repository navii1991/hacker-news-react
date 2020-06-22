import React from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'

function NewsChart(prop) {
    return(
        <div>
            <div className="row">
                <div className="col-12">
                    <h1>My First LineChart</h1>
                    <LineChart xtitle="ID" ytitle="Votes" label="Value" data={{...prop.data}} />
                </div>
            </div>				
        </div>
    )
}

export default NewsChart;