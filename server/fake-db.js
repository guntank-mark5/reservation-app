const Product = require('./model/product')

class FakeDb {

  constructor() {
    this.products = [
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'title1',
        heading2: 'konoyoha minnnano takaramono',
        heading3: 'sampletext1',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        // coverImage:
        //   'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'title2',
        heading2: 'konoyoha minnnano takaramono',
        heading3: 'sampletext1',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: '',
        heading1: 'title3',
        heading2: 'konoyoha minnnano takaramono',
        heading3: 'sampletext1',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Special',
        price: 999,
        description: 'A luxuary phone',
        heading1: 'title4',
        heading2: 'konoyoha minnnano takaramono',
        heading3: 'sampletext1',
      },
    ];
  }

  async initDb() {
    await this.cleanDb()
    this.pushProductsToDb()
  }

  async cleanDb() {
    await Product.deleteMany({})
  }

  pushProductsToDb() {
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product)
        newProduct.save()
      }
    )
  }
  seeDb() {
    this.pushProductsToDb()
  }
}

module.exports = FakeDb