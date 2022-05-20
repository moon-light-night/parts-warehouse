import { createStore } from 'vuex'
import Card from '@/data/types/cardInterface'
import cardsData from '@/data/items.json'
import SortDirections from '@/data/types/sortEnums'

export default createStore({
  state: {
    cards: [] as Array<Card>,
    filteredCards: [] as Array<Card>,
    sortType: ''
  },
  actions: {
    fetchCardsData({ commit }) {
      commit('setCardsData', cardsData)
    },
    filterCards({ state, commit }, filterType: string) {
      commit('filterCards', filterType)
      if(state.sortType) {
        commit('sortCards', state.sortType)
      }
    },
    sortCards({ commit }, sortType: string) {
      commit('sortCards', sortType)
    }
  },
  mutations: {
    setCardsData(state, cardsData: Array<Card>) {
      state.cards = cardsData
      state.filteredCards = state.cards
    },
    filterCards(state, filterType: string) {
      state.filteredCards = state.cards.filter(card => String(card.material) === filterType)
    },
    sortCards(state, sortType: string) {
      state.sortType = sortType
      state.filteredCards.length 
        ? state.filteredCards = state.filteredCards.sort((a, b) => {
            return (
              sortType === SortDirections.ASCENDING
                ? <number>a.price.current_price - <number>b.price.current_price
                : <number>b.price.current_price - <number>a.price.current_price
            )
          })
        : state.filteredCards = state.cards.sort((a, b) => {
            return (
              sortType === SortDirections.ASCENDING
                ? <number>a.price.current_price - <number>b.price.current_price
                : <number>b.price.current_price - <number>a.price.current_price
            )
          })
    }
  },
  getters: {
    cards: state => state.cards,
    filteredCards: state => state.filteredCards
  }
})
