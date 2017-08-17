import React, { Component } from 'react';
import '../style.scss';
import { connect } from 'react-redux';
import { itemsFetchData, portfolioBuyStock, updateCash } from '../actions/items';
import TableRow from '../components/TableRow';
import { portfolioSellStock,alterStockPrice } from '../actions/items';
import '../App.css';
var STOCK_MANIPULATOR;

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData();
        this._stockAction = this._stockAction.bind(this)
    }

    _stockAction(stock,stockAction){
        var props = this.props;
        var companies = props.companies;
        var portfolio = props.portfolio;
        var stockQuant = companies[stock].quantity;

        var arr = portfolio.myStocks;
        if(stockAction == "buy"){ 
            if(stockQuant > 0){
                stockQuant--;
                props.updateCash(portfolio.totalCash - companies[stock].price)
                arr.push(stock)
            }
            props.buyStock(stock,stockQuant,arr);
        }
        if(stockAction == "sell"){           
            var index = arr.indexOf(stock);
            if(index !== -1){
                stockQuant++;
                arr.splice(index, 1);
                props.updateCash(portfolio.totalCash + companies[stock].price)
            }
            props.sellStock(stock,stockQuant,arr);
        } 

    }

    render() {
        var props = this.props
        
         clearInterval(STOCK_MANIPULATOR)
         STOCK_MANIPULATOR = setInterval( function() {
            for (var company in companies) {
                props.alterStockPrice(company)
            }
            
        }, 300 )
       

        let companies = props.companies
        let companyNames =[]
        for (var company in companies) {
            companyNames.push(company)
        }
        if (props.hasErrored) {
            return <p>Sorry! There was an error loading the companies</p>;
        }
        if (props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="stock-container">
                <h3>Market</h3>            
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        Object.keys(companyNames).map( i => {
                            const name = companyNames[i];
                            return <TableRow key={name} item={companies[name]} it={name} func={this._stockAction}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}


var generateValue = function () {
  var minPercentage = this.min / this.value,
      maxPercentage = this.max / this.value,
      range = maxPercentage - minPercentage,
      change = Math.random() * range + minPercentage;

  this.value = Math.round(this.value * change * 100) / 100;

  this.pastValues.push(this.value);

  return this.value;
};

//pass items from state into containers' props
const mapStateToProps = (state) => {
    return {
        companies: state.items.companies,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        portfolio: state.items.portfolio
    };
};

//pass function in action into props 
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(itemsFetchData()),
        buyStock: (stock,quantity,counter) => dispatch(portfolioBuyStock(stock,quantity,counter)),
        sellStock: (stock,quantity) => dispatch(portfolioSellStock(stock,quantity)),
        alterStockPrice: (price,stock) => dispatch(alterStockPrice(price,stock)),
        updateCash: (cash,te) => dispatch(updateCash(cash,te))
    };
};

//Allow this container to access state values 
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);