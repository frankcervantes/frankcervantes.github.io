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

export function itemsDecreaseStock(){

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

export function itemsFetchData(){
	return (dispatch) => {
		dispatch(itemsIsLoading(true));
		var items = {
			companies:{
				companyA: {
					price: 5,
					quantity: 2,
					buy:false
				},
				companyB: {
					price: 1,
					quantity: 4,
					buy:false
				}
			},
				portfolio:{
					cash:100,
					myStocks:[]
				}
		};
		dispatch(itemsFetchDataSuccess(items));
		dispatch(itemsIsLoading(false));
	}
}