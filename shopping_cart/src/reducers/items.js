import { generateRandomValues } from '../helpers'

const INITIAL_STATE = {
	items:{
		companies:{
				companyA: {
					price: 150,
					quantity: 2,
					buy:false
				},
				companyB: {
					price: 93,
					quantity: 4,
					buy:false
				},
				companyC: {
					price: 493,
					quantity: 4,
					buy:false
				}
			},
			portfolio:{
				totalCash:1000,
				myStocks:[]
			}
		}
	}

export function itemsHasErrored(state = false, action){
	switch(action.type) {
		case 'ITEMS_HAS_ERRORED':
			return action.hasErrored
		default:
			return state;
	}
}


export function itemsIsLoading(state = false, action) {
	switch(action.type) {
		case 'ITEMS_IS_LOADING':
			return action.isLoading;
		default: 
			return state;
	}
}





export function items(state = INITIAL_STATE,action) {
	// [state.companies[targetComp].quantity]: state.companies[targetComp].quantity++ }
	switch( action.type) {
		case 'ITEMS_FETCH_DATA_SUCCESS':
			return action.items;
		case 'STOCKS_BUY_STOCK':
			return {
		        ...state,
		        companies : {
					...state.companies,
					[action.stock]:{
						...state.companies[action.stock],
						quantity:action.quantity
					}  	           
		        },
		        portfolio : {
					...state.portfolio,
					[action.stock]:{
						price:state.companies[action.stock].price,
						myStocks: action.myStocks
					}  	           
		        }
		    }
		case 'STOCKS_SELL_STOCK':
			return {
		        ...state,
		        companies : {
					...state.companies,
					[action.stock]:{
						...state.companies[action.stock],
						quantity:action.quantity
					}  	           
		        },
		        portfolio : {
					...state.portfolio,
					[action.stock]:{
						price:state.companies[action.stock].price,
						myStocks: action.myStocks
					}  	           
		        }
		    }
		case 'PORTFOLIO_UPDATE_CASH':
			return{
					...state,
				 portfolio : {
					...state.portfolio,
					totalCash:action.cash         
		        }
			}
		case 'INCREMENT_TIMER':
			return {
		         ...state,
		        companies : {
					...state.companies,
					[action.stock]:{
						...state.companies[action.stock],
						price: generateRandomValues()
					}            
		        }		       
		    }
		default: 
			return state;
	}
}

