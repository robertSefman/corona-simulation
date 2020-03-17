import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import hexoid from "hexoid";

const RADIUS = 5;
const ITERATIONS_TO_DIE = 20;
const ITERATIONS_TO_RECOVER = ITERATIONS_TO_DIE * 2;
const MORTALITY = 4;

const Person = ({ x, y, infected, dead, recovered }) => {
  let strokeColor = "violet";
  let fillColor = "white";
  if (infected) {
    strokeColor = "red";
    fillColor = "red";
  }
  if (dead) {
    strokeColor = "black";
    fillColor = "black";
  }
  if (recovered) {
    strokeColor = "green";
  }

  return (
    <circle
      cx={x}
      cy={y}
      r={RADIUS}
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
    key: hexoid(25)(),
    infected: null
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
  return population.map(p =>
    p.dead ? p : { ...p, x: p.x + random(), y: p.y + random() }
  );
}

// when people collide, they transfer viruses
function peopleCollisions(population) {
  // we only cvare about infected people collisions
  const infected = population.filter(p => p.infected !== null);
  // find people in vicinity of infected people
  const collisions = infected.map(person => {
    // subdevides whole space to find nearest candidates
    const subdevidedSpace = d3
      .quadtree()
      .extent([-1, -1], [RADIUS * 2, RADIUS * 2])
      .x(d => d.x)
      .y(d => d.y)
      .addAll(
        // everyone not infected an not current lookup
        population.filter(p => !p.infected).filter(p => p.key !== person.key)
      );
    //person nearest to current lookup is candidate for collision
    const candidate = subdevidedSpace.find(person.x, person.y, RADIUS * 2);
    //person within RADIUS * 2 of lookup position
    return candidate ? candidate : null;
  });
  return collisions.filter(p => p !== null);
}

//takes a population and list of contacts with infected persons,
// decides who gets infected
// we keep track when you got infected with elapsedTime
function infectPeople(population, contacts, elapsedTime) {
  const contactKeys = contacts.map(p => p.key);
  return population.map(p => {
    if (contactKeys.includes(p.key)) {
      return {
        ...p,
        infected: elapsedTime,
        recovered: false
      };
    } else {
      return p;
    }
  });
}

//after N iterations you eather die or get better
function peopleDieOrGetBetter(population, elapsedTime) {
  return population.map(p => {
    if (p.infected) {
      if ((elapsedTime - p.infected) / 60 > ITERATIONS_TO_DIE) {
        if (d3.randomUniform(0, 100)() < MORTALITY) {
          return {
            ...p,
            dead: true
          };
        } else {
          return p;
        }
      } else if ((elapsedTime - p.infected) / 60 > ITERATIONS_TO_RECOVER) {
        return {
          ...p,
          recovered: true
        };
      } else {
        return p;
      }
    } else {
      return p;
    }
  });
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
    person.infected = 0;
    sestSimulating(true);
    setPopulation(nextPopulation);
  }

  function iteratePopulation(elapsedTime) {
    //calculate the next state of our population on each tick
    setPopulation(population => {
      let nextPopulation = [...population];
      nextPopulation = peopleMove(nextPopulation);
      nextPopulation = infectPeople(
        nextPopulation,
        peopleCollisions(nextPopulation),
        elapsedTime
      );

      nextPopulation = peopleDieOrGetBetter(nextPopulation, elapsedTime);
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
