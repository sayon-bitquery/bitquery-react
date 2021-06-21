import React from "react";
import { useQuery } from "react-query";

const endpoint = "https://graphql.bitquery.io/";
const QUERY = `
{
  bitcoin {
    blocks(options: {limit: 2}){
      height
      blockHash
    }
  }
}
`;

export default function App() {
  const { data, isLoading, error } = useQuery("bitcoin", () => { //launches
    return fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-API-KEY": "YOUR BITQUERY API KEY"
      },
      body: JSON.stringify({ query: QUERY }) // ({ QUERY })
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((data) => data.data);
  });

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>BitQuery & React</h1>
      <ul>
        {data.bitcoin.blocks.map((query) => (
          <li key={query.height}>{query.blockHash}</li>
        ))}
      </ul>
    </div>
  );
}
