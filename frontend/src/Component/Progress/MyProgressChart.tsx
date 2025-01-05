import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MyProgressChart: React.FC = () => {
    const data = [
        { name: 'Oct 31', weight: 160 },
        { name: 'Nov 1', weight: 165 },
        { name: 'Nov 3', weight: 170 },
        { name: 'Nov 7', weight: 175 },
        { name: 'Nov 9', weight: 180 },
        { name: 'Nov 11', weight: 178 },
        { name: 'Nov 14', weight: 176 },
        { name: 'Nov 17', weight: 179 },
        { name: 'Nov 20', weight: 182 },
        { name: 'Nov 23', weight: 184 },
        { name: 'Nov 26', weight: 185 },
        { name: 'Nov 29', weight: 188 },
        { name: 'Dec 2', weight: 190 },
    ];

    // Calculate min and max weights
    const minWeight = Math.min(...data.map((d) => d.weight)) - 5; // Add buffer
    const maxWeight = Math.max(...data.map((d) => d.weight)) + 5; // Add buffer


    return (
        <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 40,
                        right: 50,
                        left: 1,
                        bottom: 40,
                    }}
                >
                    <CartesianGrid horizontal={false} vertical={false} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ dy: 20 }}

                    />
                    <YAxis
                        domain={[minWeight, maxWeight]}
                        // label={{ value: 'Lb', angle: -90, position: 'insideLeft' }}
                        axisLine={false}
                        tickLine={false}

                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="rgba(95, 95, 95, 1)" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyProgressChart;
