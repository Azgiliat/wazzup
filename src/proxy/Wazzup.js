import Proxy from './Proxy'

export default class ProductsProxy extends Proxy {
  constructor (store) {
    super(store, '/api/v1')
  }

  loadData () {
    return this.submit({
      endpoint: 'wazzup_test'
    })
  }
}
