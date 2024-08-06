export interface MyAwesomeData<T> {
  code: number
  msg: string
  data: T
}

export interface PageResult<T> {
  records: Array<T>
  total: number
  size: number
  current: number
  pages:number
}