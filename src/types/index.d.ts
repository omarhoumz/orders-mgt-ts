export type MenuItem = {
  name: string
  price: number
}

export type RestaurantType = {
  id: string
  managers: string[]
  menu: MenuItem[]
}
