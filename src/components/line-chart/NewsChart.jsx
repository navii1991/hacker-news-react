import React from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'

function NewsChart(prop) {
    return(
        <div>
            <div className="row">
                <div className="col-12">
                    <LineChart xtitle="ID" ytitle="Votes" label="Value" data={{...prop.data}} />
                </div>
            </div>
            <hr style={{height:'6px', borderWidth:0,backgroundColor:'#ff6600'}} />				
        </div>
    )
}

export default NewsChart;