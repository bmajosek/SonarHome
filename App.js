import React, { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

const Rockets_query = gql`
  {
  launchesPast{
    rocket{
      rocket_name
    }
  }
}
`;

function App() {
  const { loading, err, data } = useQuery( Rockets_query );
  const [ Rockettab, setRockettab ] = useState([]);
  const [ page, setPage ] = useState(0);

  if ( loading ) return <p>Loading...</p>;
  if ( err ) return <p>{err}</p>;
  
  const Changepage = (e) => {
    if( e.target.value === "..." ) 
    {
      setPage( page + 1 );
    }
    if( e.target.value === "...-" ) 
    {
      setPage( page - 1 );
    }
    else
    {
      let targetelem = ( Number )( e.target.value );
      if( targetelem >= 0 && targetelem <= 22 )
      {
          setPage( targetelem );
      }
    }
    setRockettab([]);
    for( let i = page * 4, j = 0; i < ( page + 1 ) * 4; i++, j++ )
    {
      setRockettab( Rockettab => [...Rockettab, data.launchesPast[i].rocket.rocket_name ]);
    }
  }

  const Changerockets = () => {
    setRockettab([]);
    let word = document.getElementById('input').value.toLowerCase();
    let temporary = [];
    for ( let i = 0; i < data.launchesPast.length; i++)
    {
      temporary.push(data.launchesPast[i].rocket.rocket_name);
    }
    let temp = temporary.filter( element => {
      return element.toLowerCase().indexOf(word.toLowerCase()) !== -1;
    })
    for(let i = page * 4, j = 0; i < ( page + 1 ) * 4; i++, j++ )
    {
      setRockettab(Rockettab => [...Rockettab,temp[ i ]]);
    }
  }

  return (
  <div>
    <input placeholder = 'search...' onChange = {Changerockets} onFocus = {Changerockets} id = "input"/>
    {Rockettab.map(( element, i ) => (
      <li key = { i }>{ element }</li>
    )
    )}
    <option onClick = {Changepage} value = { page - 1 }>&lt;</option>
    <option onClick = {Changepage} value = { 0 }>1</option>
    <option onClick = {Changepage} value = { 1 }>2</option>
    <option onClick = {Changepage} value = { 2 }>3</option> 
    {page > 4 &&
      <option onClick = {Changepage} value = "...-">...</option>
    }
    {page >= 4 && page <= 19 &&
    (
      <option onClick = {Changepage} value = { page - 1 }>{ page }</option>
    )
    }
    {page > 2 && page < 19 &&
    (
      <option>{ page + 1 }</option>
    )
    }
    {page >= 2 && page <= 17 &&
    (
      <option onClick = {Changepage} value = { page + 1 }>{ page + 2 }</option>
    )
    }
    {page < 17 &&
      <option onClick = {Changepage} value = "...">...</option>
    }
    <option onClick = {Changepage} value = { 19 }>20</option>
    <option onClick = {Changepage} value = { 20 }>21</option>
    <option onClick = {Changepage} value = { 21 }>22</option>
    <option onClick = {Changepage} value = { page + 1 }>&gt;</option>
    <option>Total count:{ data.launchesPast.length }</option>
  </div>
  )
}
export default App;