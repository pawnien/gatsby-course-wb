import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return pizzas with count
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // get a list of all the toppings
  // get a list of all the Pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
