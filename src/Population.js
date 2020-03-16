import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import xexoid from "hexoid";
import hexoid from "hexoid";

const Person = ({ x, y, infected, dead, recovered }) => {
  let strokeColor = "violet";
  let fillColor = "white";
  if (infected) {
    strokeColor = "red";
    fillColor = "red";
  }
  if (dead) {
    strokeColor = "black";
  }
  if (recovered) {
    strokeColor = "green";
  }

  return (
    <circle
      cx={x}
      cy={y}
      r="5"
      style={{ fill: fillColor, stroke: strokeColor, strokeWidth: 2 }}
    ></circle>
  );
};

function createRow({ cx, cy, width }) {
  const N = Math.floor(width / 15);
  const xScale = d3
    .scalePoint()
    .domain(d3.range(0, N))
    .range([cx - width / 2, cx + width / 2]);

  const row = d3.range(0, N).map(i => ({
    x: xScale(i),
    y: cy,
    key: hexoid(25)()
  }));

  return row;
}

function createPopulation({ cx, cy, width, height }) {
  const Nrows = Math.floor(height / 15);

  const yScale = d3
    .scalePoint()
    .domain(d3.range(0, Nrows))
    .range([cy - height / 2, cy + height / 2]);

  // To do: make it a circle
  const widthScale = d3
    .scaleLinear()
    .domain([0, Nrows / 2, Nrows])
    .range([15, width, 15]);
  const rows = d3
    .range(0, Nrows)
    .map(i => createRow({ cx, cy: yScale(i), width: widthScale(i) }));

  return rows.reduce((population, row) => [...population, ...row]);
}

function peopleMove(population) {
  const random = d3.randomUniform(-1, 1);
  return population.map(p => ({ ...p, x: p.x + random(), y: p.y + random() }));
}

function usePopulation({ cx, cy, width, height }) {
  const [population, setPopulation] = useState(
    createPopulation({
      cx: width / 2,
      cy: height / 2,
      width: width - 15,
      height: height - 15
    })
  );

  const [simulating, sestSimulating] = useState(false);

  function startSimulation() {
    // Avoid changing values directly
    const nextPopulation = [...population];
    //infect a random person
    const person =
      nextPopulation[Math.floor(Math.random() * nextPopulation.length)];
    person.infected = true;
    sestSimulating(true);
    setPopulation(nextPopulation);
  }

  function iteratePopulation() {
    //calculate the next state of our population on each tick
    setPopulation(population => {
      let nextPopulation = [...population];
      nextPopulation = peopleMove(nextPopulation);
      return nextPopulation;
    });
  }

  //runs the simulation loop
  useEffect(() => {
    if (simulating) {
      const t = d3.timer(iteratePopulation);
      // stop timer when cleaning up
      return t.stop;
    }
  }, [simulating]);
  return { population, startSimulation };
}

export const Population = ({ cx, cy, width, height }) => {
  const { population, startSimulation } = usePopulation({
    cx,
    cy,
    width,
    height
  });
  return (
    <>
      <svg style={{ width, height }}>
        {population.map(p => (
          <Person {...p} />
        ))}
      </svg>
      <div>
        {population.find(p => p.infected) ? null : (
          <button onClick={startSimulation}>Infect a person</button>
        )}
      </div>
    </>
  );
};
