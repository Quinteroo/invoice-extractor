
export type Supplier={
  name:string,
  invoiceLine: string,
  invoice:RegExp,
  dateLine: string,
  date:RegExp,
  totalLine:string,
  total:RegExp,
  currency:string | null
}