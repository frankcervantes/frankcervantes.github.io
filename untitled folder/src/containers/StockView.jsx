import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData, portfolioBuyStock } from '../actions/items';
import TableRow from '../components/TableRow';
import { portfolioSellStock } from '../actions/items';
import '../App.css';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData();
        this._stockAction = this._stockAction.bind(this)
    }

    _stockAction(stock,stockAction){
        var companies = this.props.companies;
        var portfolio = this.props.portfolio;
        var stockQuant = companies[stock].quantity;

        var arr = portfolio.myStocks;
        if(stockAction == "buy"){ 
            if(stockQuant > 0){
                stockQuant--;
                arr.push(stock)
            }
            this.props.buyStock(stock,stockQuant,arr);
        }
        if(stockAction == "sell"){           
            var index = arr.indexOf(stock);
            if(index !== -1){
                stockQuant++;
                arr.splice(index, 1);
            }
            this.props.sellStock(stock,stockQuant,arr);
        }
    }

    render() {
        var props = this.props
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
            <div>
                <h3>Market</h3>            
                <table>
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
        sellStock: (stock,quantity) => dispatch(portfolioSellStock(stock,quantity))
    };
};

//Allow this container to access state values 
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);