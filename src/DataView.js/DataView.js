import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import LinearScale from 'chart.js/auto';
// import { formatChartData, getLabels } from './chartHelpers';
import { useAuth0 } from "@auth0/auth0-react";
import './DataView.css';

const categories = [
  'exercise',
  'food',
  'stress',
  'medication',
  'mood',
  'patterns',
  'sleep',
  'symptom',
  'allergies',
  'illnesses',
];

const DataView = ({ userId }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [data, setData] = useState({});
  const [dates, setDates] = useState(new Set());
  const [displayType, setDisplayType] = useState('graph');
  const { user, isAuthenticated } = useAuth0();
  const [userID, setUserID] = useState(user ? user.sub : null);
  const chartRef = useRef(null);

  const toggleDisplayType = () => {
    if (chartRef.current) {
      chartRef.current.chartInstance.destroy();
    }
    setDisplayType(displayType === 'graph' ? 'table' : 'graph');
  };

  const fetchData = async () => {
    const data = {};
    const newDates = new Set();

    for (const category of selectedCategories) {
      const response = await fetch(
        `http://127.0.0.1:5000/get_data?userID=${userID}&category=${category}`
      );
      data[category] = await response.json();
      data[category].forEach((item) => newDates.add(item.date));
    }

    setData(data);
    setDates(newDates);
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      fetchData();
    } else {
      setData({});
    }
  }, [userID, selectedCategories]);


  const formatChartData = () => {
    const labels = [...dates].sort();
    const datasets = selectedCategories.map((category) => {
      const data = labels.map((date) => {
        const item = getDataForDate(date)[category];
        return item === '-' ? 0 : item;
      });
  
      return {
        label: category,
        data,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
        fill: false,
      };
    });
  
    return { labels, datasets };
  };

  const handleButtonClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    fetchData();
  };

  const isSelected = (category) => selectedCategories.includes(category);

  const getDataForDate = (date) => {
    const result = {};
    for (const category of selectedCategories) {
      if (data[category]) {
        const item = data[category].find((item) => item.date === date);
        if (item) {
          result[category] = 1;
        } else {
          result[category] = 0;
        }
      }
    }
    return result;
  };
  
  

  return (
    <div className="data-view">
      <h2>Data View</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${isSelected(category) ? 'selected' : ''}`}
            onClick={() => handleButtonClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="toggle-display" onClick={toggleDisplayType}>
        {displayType === 'graph' ? 'Show Table' : 'Show Graph'}
      </button>
      <div className="data-display">
        {selectedCategories.length > 0 && (
          <>
            {displayType === 'graph' && (
                <Line
                    ref={chartRef}
                    data={formatChartData()}
                    options={{
                    scales: {
                        y: {
                        beginAtZero: true,
                        },
                    },
                    }}
                />
              
                )}
            {displayType === 'table' && (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    {selectedCategories.map((category) => (
                      <th key={category}>{category}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...dates].sort().map((date) => (
                    <tr key={date}>
                      <td>{date}</td>
                      {Object.values(getDataForDate(date)).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DataView;