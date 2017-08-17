import React, { Component } from 'react';
import Titles from './Titles.js'
import { Link, Switch, Route }   from 'react-router-dom'




const AllComicLinks = (props) => {
	const comics = props.data.comics
	const comicIt = Object.keys(comics)
	const featuredComics = comicIt.filter(i => {
		return comics[i].active
	})

	return(
		<div id="sub-nav">
			
			<ul>
				<li> <a href="#">Featured: </a></li>
				{	
					Object.keys(comics).map(i => {
						return  + comics[i].active ? <li key={i}> <Link to={`/titles/${i}`}>  {comics[i].title}</Link> </li> : null
					})
				}
				
				
			</ul>
			<ul>
				<li> <a href="#">All Comics: </a></li>
				{Object.keys(comics).map(i => {
					 return <li key={i}> <Link to={`/titles/${i}`}>{comics[i].title}</Link> </li>
				})}
			</ul>
		</div>
	)

};


const AllTitles = (props) => {
	const comics = props.data
	return (
		<Switch>
			<Route path='/titles' render={(e) => (
              <AllComicLinks data={comics}/>
            )}/>

		</Switch>
		
		
		
	);
};
export default AllTitles;