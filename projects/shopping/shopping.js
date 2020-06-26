class Product {
  // title = 'Default';
  // price;
  // id;
  // imageUrl;
  constructor(description, price, title, imageUrl) {
    this.price = price;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
    this.render();
  }
  render() {}
  createRouteElement(tag, cssCalsses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssCalsses) {
      rootElement.className = cssCalsses;
    }
    if (attributes && attributes.length > 0) {
      attributes.forEach(attr => {
        rootElement.setAttribute(attr.name, attr.value);
      });
    }
    console.log(this.hookId)
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, prodId) {
    super(prodId);
    this.product = product;
  }
  addToCard() {
    console.log('added product to card');
    console.log(this.product);
    App.addProductToCard(this.product);
  }
  render() {
    const prodEl = this.createRouteElement('li', 'product-item');

    prodEl.innerHTML = `
        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      `;
    const btn = prodEl.querySelector('button');
    btn.addEventListener('click', this.addToCard.bind(this));
  }
}
class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
class ShoppingCard extends Component{
  items = [];
  get totalAmount() {
    return this.items.reduce((acc, el) =>  acc + el.price, 0);
  }
  set cartItems(val) {
    this.items = val;
    this.totalOutput.innerHTML = `Total: \$${this.totalAmount.toFixed(2)}`;
  }
  constructor(props) {
    console.log({props})
    super(props);
  }
  addItem(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  render() {
    const cardEl = this.createRouteElement('section', 'card');
    // const cardEl = document.createElement('section');
    cardEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now</button>
    `;
    this.totalOutput = cardEl.querySelector('h2');
    // cardEl.className = 'card';
    // return cardEl;
  }

}
class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  products = [
    new Product('First product', 20, 'Phone', 'https://images.unsplash.com/photo-1586463842855-319cefee28bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80'),
    new Product('Second product', 49, 'Casques', 'https://images.unsplash.com/photo-1533575349875-5f372f88e25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80'),
    new Product('Second product', 49, 'Casques', 'https://images.unsplash.com/photo-1533575349875-5f372f88e25b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80'),
  ];
  render() {
    this.createRouteElement('ul', 'prodList', [new ElementAttribute('id', 'prodList')])
    this.products.forEach(product => {
      new ProductItem(product, 'prodList');
    });
  }
}

class Shop extends Component {
  constructor() {
    super();
  }
  render() {
    this.card = new ShoppingCard('app');
    new ProductList('app');
  }
}
class App {
  static card;
  static init() {
    const shop = new Shop();
    this.card = shop.card;
  }
  static addProductToCard(product) {
    console.log(product)
    this.card.addItem(product);
  }
}
App.init();
