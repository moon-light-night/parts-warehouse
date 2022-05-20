<template>
  <div class="app">
    <div class="app-navigation">
      <Navigation />
    </div>
    <div class="app-title">
      Комплекты стеллажных систем
    </div>
    <div class="app-sorting">
      <CustomSelect 
        title="Сортировать по:"
        :sortList="sortDirectonList"
        @sortBy="sortBy"
      />
      <CustomSelect 
        title="Материал"
        :sortList="materials"
        @sortBy="sortBy"
      />
    </div>
    <div class="app-cards">
      <Card 
        v-for="card in filteredCards"
        :key="`card-${card.id}`"
        :card="card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SortDirections from '@/data/types/sortEnums'
import Navigation from '@/components/Navigation.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import Card from '@/components/Card.vue'
import materials from '@/data/materials.json'
import sortDirectonList from '@/data/sortDirections.json'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Navigation,
    CustomSelect,
    Card
  },
  setup() {
    const store = useStore()

    const cards = computed(() => store.getters['cards'])
    const filteredCards = computed(() => store.getters['filteredCards'])

    const sortBy = (sortType: string):void => {
      if(sortType === SortDirections.MATERIAL_WOOD || sortType === SortDirections.MATERIAL_STEEL) {
        store.dispatch('filterCards', sortType)
      }
      if(sortType === SortDirections.ASCENDING || sortType === SortDirections.DESCENDING) {
        store.dispatch('sortCards', sortType)
      }
    }

    // created
    store.dispatch('fetchCardsData')

    return { sortDirectonList, materials, cards, filteredCards, sortBy }
  }
})
</script>
