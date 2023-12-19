import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import * as d3 from "d3";

const TempChart = ({ tempDeviationInfo }) => {
  useEffect(() => {
    parseTempDeviation();
  }, []);

  const parseTempDeviation = () => {
    Object.keys(tempDeviationInfo).forEach((key) => {
      data.push({
        time: key,
        temperature: tempDeviationInfo[key],
      });
    });
  };

  const data = [];

  useEffect(() => {
    setUpChart();
  }, []);

  const setUpChart = () => {
    // Set up the SVG element
    const svg = d3.select("#temp-graph").append("svg");
    const width = 250;
    const height = 150;
    const margin = { top: 20, right: 10, bottom: 30, left: 20 };
    const innerWidth = width;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    setUpScales(innerWidth, innerHeight, g);
  };

  const setUpScales = (innerWidth, innerHeight, g) => {
    // Set up the scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.time))
      .range([0, innerWidth])
      .padding(0.2);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.temperature)])
      .range([innerHeight, 0]);

    setupBars(g, x, y, innerHeight);
    setupAxis(g, x, y, innerHeight);
  };

  const setupBars = (g, x, y, innerHeight) => {
    // Add the bars
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.time))
      .attr("y", (d) => y(d.temperature))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.temperature))
      .attr("fill", "rgba(133, 128, 128, 0.8)");
  };

  const setupAxis = (g, x, y, innerHeight) => {
    // Add the x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    const yAxis = d3
      .axisLeft(y)
      .ticks(Math.ceil(d3.max(data, (d) => d.temperature) / 5))
      .tickFormat((d) => (d % 5 === 0 ? d : ""));

    g.append("g").attr("class", "y-axis").call(yAxis);
  };

  return <div id="temp-graph"></div>;
};

TempChart.propTypes = {};

export default TempChart;
