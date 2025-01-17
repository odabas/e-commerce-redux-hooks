import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = product => {
    this.props.actions.addToCart({ quantity: 1, product });

    alertify.set("notifier", "delay", 1);
    alertify.notify(
      product.productName + "sepete eklendi",
      "success",
      function() {
        console.log("Eklendi");
      }
    );
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="info">Product List</Badge>
          <Badge color="secondary">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Unit in Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>
                  <Link to={"/saveProduct/" + product.id}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    color="success"
                    onClick={() => this.addToCart(product)}
                  >
                    Sepete Ekle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
