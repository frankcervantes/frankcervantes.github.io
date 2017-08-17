import { combineReducers } from 'redux'
import { items, itemsHasErrored, itemsIsLoading, updateCash, alterStockPrice } from './items'

export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading
})