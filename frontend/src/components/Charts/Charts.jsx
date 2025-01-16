import { Line, Pie } from '@ant-design/charts';
import React from 'react';

const Charts = ({sortedTransactions}) => {
    const data = sortedTransactions.map((item)=>{
        return {date:item.date,amount:item.amount};
    })

    const spendingdata = (sortedTransactions || [])
    .filter((item) => item.type === "expense")
    .map((item) => ({ tag: item.tag, amount: item.amount }));

    /*let finalSpending=spendingdata.reduce((acc,obj)=>{
        let key=obj.tag;
        if(!acc[key]){
            acc[key]={ tag:obj.tag,amount:obj.amount};
        }
        else{
            acc[key].amount+=obj.amount;
        }
        return acc;
    },{})*/

    const config = {
        data,
        width: 500,
        autoFit: false,
        xField: "date", // Corrected from xfield to xField
        yField: "amount", // Corrected from yfield to yField
    };

    const spendingconfig = {
        data:spendingdata,
        width: 500,
        angleField:"amount",
        colorField:"tag",
    };

    let chart;
    let piechart;
    return (
        <div className='flex justify-center items-center w-[100vw] h-[90vh]'>
            <div className=' h-auto p-4 rounded-sm shadow-md m-4 w-[95%]'>
                <h2 className='mt-0 font-bold text-3xl ml-3'>Your Analytics</h2>
                <Line 
                
                {...config} 
                onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div>
                <h2>Your Spending</h2>
                <Pie {...spendingconfig}
                    onReady={(chartInstance)=>(piechart=chartInstance)}
                />
            </div>
        </div>
    );
};

export default Charts;
