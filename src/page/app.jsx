import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Route,Redirect,Link,Switch} from 'react-router-dom';
//页面
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ProductRouter    from 'page/product/router.jsx';
import OrderList        from 'page/order/index.jsx';
import OrderDetail      from 'page/order/detail.jsx';
class App extends React.Component{
    render(){
        let LayoutRouter=(
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}></Route>
                    <Route path="/user/index" component={UserList}></Route> 
                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNumber?" component={OrderDetail}/> 
                    <Redirect exact from="/order" to="/order/index"/>
                    <Redirect exact from="/user" to="/user/index"></Redirect> 
                    <Route component={ErrorPage}></Route>
                </Switch>
            </Layout> 
        );
        return(
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={props=>LayoutRouter}></Route>
                </Switch>
            </Router>  
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
);