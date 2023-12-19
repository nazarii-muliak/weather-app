import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import PropTypes from "prop-types";

const CitiesTempGraph = ({ tempInfo }) => {
  // Set the data for the line graph

  const curve = d3.curveCatmullRom.alpha(0.5);

  useEffect(() => {
    parseTempInfo()
  }, [])

  const parseTempInfo = () => {
    Object.keys(tempInfo).forEach((key) => {
      data.push({
        city: key,
        temperature: tempInfo[key],
      });
    });
  };

  const data = [];

  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = () => {
    const margin = { top: 30, right: 10, bottom: 30, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
    const svg = d3
      .select("#cities-temp")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the x-axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.city))
      .range([0, width])
      .padding(0.1);
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain")
      .remove();

    // Set up the y-axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.temperature)])
      .range([height, 0]);
    g.append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(Math.ceil(d3.max(data, (d) => d.temperature) / 5))
          .tickSize(0)
      )
      .select(".domain")
      .remove();

    // Set up the curve function
    const curve = d3.curveCatmullRom.alpha(0.5);

    // Draw the line
    const line = d3
      .line()
      .x((d) => x(d.city) + x.bandwidth() / 2)
      .y((d) => y(d.temperature))
      .curve(curve);
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add city labels without strokes
    g.selectAll(".city-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "city-label")
      .attr("x", (d) => x(d.city) + x.bandwidth() / 2)
      .attr("y", height + 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("stroke-width", 0)
      .text((d) => d.city);

    // Add temperature labels on points of the line
    g.selectAll(".temp-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "temp-label")
      .attr("x", (d) => x(d.city) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.temperature) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((d) => d.temperature + "°");
  };

  return <div id="cities-temp"></div>;
};

CitiesTempGraph.propTypes = {};

export default CitiesTempGraph;
