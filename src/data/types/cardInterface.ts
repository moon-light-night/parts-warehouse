interface Card {
  id: String,
  name: String,
  code: String,
  price: {
    old_price: Number | null,
    current_price: Number
  },
  image: {
    url: String
  },
  material: Number
}

export default Card