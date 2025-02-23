// Contains Product type definitions:
export type ProductStatus = 'subscription' | 'active' | 'matured'
export type ProductTerm = '1 Month' | '3 Months' | '6 Months' | '1 Year'

export interface Product {
  id: string
  term: ProductTerm
  status: ProductStatus
  liquidity: number
  fixedAPR: number
  variableAPR: number
  subscriptionEnd?: Date
  maturityDate?: Date
}

/*
interface Product {
  id: string
  term: ProductTerm
  status: ProductStatus
  liquidity: number
  fixedAPR: number
  variableAPR: number
  subscriptionEnd?: Date
  maturityDate?: Date
}
*/ 