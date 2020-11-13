import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import CartScreen from "./components/screens/CartScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import UserListScreen from "./components/screens/UserListScreen";
import UserEditScreen from "./components/screens/UserEditScreen";
import "./index.css";
import ProductListScreen from "./components/screens/ProductListScreen";
import ProductEditScreen from "./components/screens/ProductEditScreen";
import OrderListScreen from "./components/screens/OrderListScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <section className="app">
        <Route path="/" component={HomeScreen} exact />
        <Route path="/products/:id" component={ProductScreen} />
        <Route path="/signin" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/order/:order_id" component={OrderScreen} />
        <Route path="/admin/users" component={UserListScreen} />
        <Route path="/admin/products" component={ProductListScreen} />
        <Route path="/admin/orders" component={OrderListScreen} />
        <Route path="/admin/user/:user_id/edit" component={UserEditScreen} />
        <Route
          path="/admin/product/:product_id/edit"
          component={ProductEditScreen}
        />
        <Route path="/search/:keyword" component={HomeScreen} />
      </section>

      <Footer />
    </Router>
  );
};

export default App;
