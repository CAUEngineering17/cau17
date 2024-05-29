import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatistic = () => {
  const [projects, setProjects] = useState([]);
  const [issues, setIssues] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [property, setProperty] = useState('daily');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchStatistics();
    }
  }, [projectId, property]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:8080/issues/statistic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId, property }),
      });

      if (response.ok) {
        const data = await response.json();
        formatChartData(data);
      } else {
        console.error('Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchIssues = async () => {
    const username = localStorage.getItem('user');
    if (username) {
      try {
        const response = await fetch('http://localhost:8080/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: username }),
        });

        const data = await response.json();
        console.log(data);
        setIssues(data);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      }
    } else {
      console.error('User not found');
    }
  };

  const formatChartData = (data) => {
    const labels = Object.keys(data);
    const values = Object.values(data);

    setChartData({
      labels,
      datasets: [
        {
          label: property === 'daily' ? 'Daily Issues' : 'Monthly Issues',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const handleProjectIdChange = (event) => {
    setProjectId(event.target.value);
  };

  const handlePropertyChange = (event) => {
    setProperty(event.target.value);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Issue Statistics
      </Typography>

      <Box sx={{ display: 'flex', mb: 2 }}>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel id="project-id-label">Project ID</InputLabel>
          <Select
            labelId="project-id-label"
            value={projectId}
            label="Project ID"
            onChange={handleProjectIdChange}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="property-label">Property</InputLabel>
          <Select
            labelId="property-label"
            value={property}
            label="Property"
            onChange={handlePropertyChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {chartData && (
        <Box sx={{ mt: 4 }}>
          <Bar data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Issue Statistics (${property === 'daily' ? 'Daily' : 'Monthly'})`,
              },
            },
          }} />
        </Box>
      )}
    </Box>
  );
};

export default AdminStatistic;
