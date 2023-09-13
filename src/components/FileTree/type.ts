export interface AbstractFileTree {
  checked: boolean
  id: string
  name: string
  children: AbstractFileTree[]
}