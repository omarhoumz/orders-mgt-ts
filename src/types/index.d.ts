export type MenuItem = {
  name: string
  description?: string
  price: number
}

export type RestaurantType = {
  id: string
  managers: string[]
  menu: MenuItem[]
  name: string
  description: string
  rating: number
}
