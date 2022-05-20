<template>
  <div class="card">
    <div v-if="card.price.old_price" class="discount">
      Скидка
    </div>
    <img :src="require(`@/assets/images${card.image.url}`)" class="image" alt="card-img">
    <div class="code">
      {{ card.code }}
    </div>
    <div class="name">
      {{ card.name }}
    </div>
    <div class="footer">
      <div class="prices">
        <div v-if="Number(card.price.old_price)" class="prices__old-price">
          {{ Math.floor(card.price.old_price) }}
        </div>
        <div class="prices__new-price">
          {{ Math.floor(card.price.current_price) }}
        </div>
      </div>
      <div class="controls">
        <div 
          v-if="!cardInCart"
          class="controls__cart" 
          @click="handleCartItem(card.id)" 
        />
        <div 
          v-if="cardInCart"
          class="controls__chosen" 
          @click="handleCartItem(card.id)" 
        />
        
        <div 
          class="controls__favorite" 
          :class="{'--active': favoriteCard}"
          @click="handleFavoriteItem(card.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import Card from '@/data/types/cardInterface'

export default defineComponent({
  name: 'Card',
  props: {
    card: {
      required: true,
      type: Object as PropType<Card>
    }
  },
  setup(props:any) {
    const favoriteCard = ref<string | null>(null)
    const cardInCart = ref<string | null>(null)

    const handleFavoriteItem = (cardId: string): void => {
      if(favoriteCard.value) {
        localStorage.removeItem(`favoriteCard-${cardId}`)
        favoriteCard.value = null
      } else {
        localStorage.setItem(`favoriteCard-${cardId}`, cardId)
        favoriteCard.value = cardId
      }
    }
    const handleCartItem = (cardId: string): void => {
      if(cardInCart.value) {
        cardInCart.value = null
        localStorage.removeItem(`cardInCart-${cardId}`)
      } else {
        localStorage.setItem(`cardInCart-${cardId}`, cardId)
        cardInCart.value = cardId
      }
    }

    onMounted(() => {
      favoriteCard.value = localStorage[`favoriteCard-${props.card.id}`]
      cardInCart.value = localStorage[`cardInCart-${props.card.id}`]
    })
    
    return { 
      favoriteCard,
      cardInCart,
      handleFavoriteItem, 
      handleCartItem 
    }
  }
})
</script>
