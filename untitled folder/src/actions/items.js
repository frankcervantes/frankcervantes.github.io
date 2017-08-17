//An ActionCreator dispatching multiple different actions is pretty normal  for asynchronous operations

export function itemsHasErrored(bool){
	return {
		type: 'ITEMS_HAS_ERRORED',
		hasErrored:bool
	};
}

export function itemsIsLoading(bool){
	return {
		 type: 'ITEMS_IS_LOADING',
		 isLoading:bool
	}
}

export function itemsFetchDataSuccess(items){
	return {
		type: 'ITEMS_FETCH_DATA_SUCCESS',
		items
	}
}

export function alterStockPrice(stock){
	return{
		type : 'INCREMENT_TIMER',
		stock
	}
}

export function portfolioBuyStock(stock,quantity,myStocks){

	return{
		type: 'STOCKS_BUY_STOCK',
		stock,
		quantity,
		myStocks
	}
}

export function portfolioSellStock(stock,quantity,myStocks){

	return{
		type: 'STOCKS_SELL_STOCK',
		stock,
		quantity,
		myStocks
	}
}

export function updateCash(cash){
	return{
		type: 'PORTFOLIO_UPDATE_CASH',
		cash
	}
}


export function itemsFetchData(){
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		var items = {
			companies:{
				companyA: {
					price: 150,
					quantity: 2,
					buy:false
				},
				companyB: {
					price: 93,
					quantity: 1,
					buy:false
				},
				companyC: {
					price: 493,
					quantity: 9,
					buy:false
				},
				companyD: {
					price: 342,
					quantity: 2,
					buy:false
				},
				companyE: {
					price: 629,
					quantity: 6,
					buy:false
				},
				companyF: {
					price: 196,
					quantity: 3,
					buy:false
				}
			},
				portfolio:{
					totalCash:1000,
					myStocks:[]
				}
		};
		dispatch(itemsFetchDataSuccess(items));
		dispatch(itemsIsLoading(false));
	}
}