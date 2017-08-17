import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import '../App.css';
import PortfolioTableRow from '../components/PortfolioTableRow';
var _ = require('lodash');
class PurseView extends Component {



    render() {
        var temp = 0, stocks = 0, totalStockValue = 0;
        var props = this.props
        var portfolio = props.portfolio || [];
        var companies = props.items.companies

        if (props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (props.isLoading) {
            return <p>Loading…</p>;
        }

        if(portfolio){
            var totalCash = portfolio.totalCash;
            var myStocks = portfolio.myStocks;
            if(myStocks){
                var distinctStocks = myStocks.filter((x, i, a) => a.indexOf(x) == i);
                var totalStocks = myStocks.length;
                var latestStockBought = myStocks[totalStocks-1];

                if(companies[latestStockBought]){
                    // totalCash-companies[latestStockBought].price
                } 
            }
        }
        

        if(myStocks){
            stocks = distinctStocks.map((i,k) => {
                return companies[i].price * countInArray(myStocks, i)
            })
        }

        for(var i =0; i< stocks.length;i++){
            totalStockValue+= stocks[i]
        }

       


        return (    

            <div>
          
                <h4>Portfolio</h4>
                <p>Cash: {totalCash}</p>
                {(distinctStocks) ?
                    (distinctStocks.length > 0) ?    
                        <table>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Shares</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                { distinctStocks.map((i,k) => {
                                    return <PortfolioTableRow key={k} company={i} price={companies[i].price} shares={countInArray(myStocks, i)} />
                                })}
                            </tbody>
                            <tfoot>
                                {(distinctStocks.length)? 
                                     <tr>
                                        <th>Total: </th>
                                        <th></th>
                                        <th>    
                                            {totalStockValue}
                                        </th>
                                    </tr>
                                :null }
                            </tfoot> 
                        </table>
                    :null
                : null}
            </div>
        );
    }
}

function countInArray(array, index) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === index) {
            count++;
        }
    }
    return count;
};

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