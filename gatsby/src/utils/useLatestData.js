import { useState, useEffect } from 'react';

const gql = String.raw;

const deets = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState();

  const [slicemasters, setSlicemasters] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) =>
        res.json().then((response) => {
          setHotSlices(response.data.StoreSettings.hotSlices);
          setSlicemasters(response.data.StoreSettings.slicemasters);
        })
      )
      .catch((err) => {
        console.log('SHOOOOT');
        console.log(err);
      });
  }, []);

  return { hotSlices, slicemasters };
}
