import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const CustomPieChart = ({ data = [], colors = COLORS }) => {
    // Handle undefined or empty data
    const chartData = Array.isArray(data) && data.length > 0 ? data : [];
    
    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-80">
                <p className="text-gray-400">No data available</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={325}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={130}
                    labelLine={false}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
