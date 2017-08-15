import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import '../App.css';

class PurseView extends Component {


    render() {
        var props = this.props
        if (props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (props.isLoading) {
            return <p>Loading…</p>;
        }

        var portfolio = props.portfolio || [];
        if(portfolio){
            var myStocks = portfolio.myStocks;
            if(myStocks)
                var distinctStocks = myStocks.filter((x, i, a) => a.indexOf(x) == i)
        }
        
  
        var companies = props.items.companies
        var cost = 1000;
        for(var stock in myStocks){
           cost -= companies[myStocks[stock]].price
        }
        console.log(cost)
        return (    
            <div>
                <h4>Portfolio</h4>
                 {(myStocks) ? myStocks.map(i => {return i}) : null}
                <p>Cash: {cost}</p>
            </div>
        );
        
    }
       
    
}

//pass items from state into containers' props
const mapStateToProps = (state) => {

    return {
        portfolio: state.items.portfolio,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

//pass function in action into props 
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData())
    };
};

//Allow this container to access state values 
export default connect(mapStateToProps, mapDispatchToProps)(PurseView);