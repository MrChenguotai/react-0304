import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import Product from 'service/product-service.jsx';
import MMtil from 'util/mm.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch   from './index-list-search.jsx';

import './index.scss';

const _product=new Product();
const _mm=new MMtil();
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            pageNum:1,
            listType:'list'
        }
    }
    componentDidMount(){
        this.loadProductList();
    }
    loadProductList(){
        let listParam={};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword    = this.state.searchKeyword;
        }
        _product.getProductList(listParam).then(res=>{
            console.log(res);
            this.setState(res);  
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg);
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadProductList();
        });
    }
    onSetProductStatus(e,productId,currentStatus){
        let newStatus=currentStatus==1?2:1,
            confirmTips=currentStatus==1?"确定要下架该商品":"确定要上架该商品";
            if(window.confirm(confirmTips)){
                _product.setProductStatus({
                    productId:productId,
                    currentStatus:newStatus
                }).then(res=>
                    {
                        _mm.successTips(res.msg);
                        this.loadProductList();
                    },errMsg=>{
                        _mm.errorTips(errMsg);
                    }
                )
            }
    }
    onSearch(searchType, searchKeyword){
        console.log(searchType, searchKeyword);
        let listType=searchType===""?"list":"search";
        this.setState({
            listType:listType,
            pageNum:1,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProductList();
        })
    }
    render(){
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'},
        ];
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((product,index)=>{
                        return(
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>¥{product.price}</td>
                                <td>
                                    <p>{product.status==1?"在售":"已发货"}</p>
                                    <button className="btn btn-warning bnt-xs" onClick={(e)=>{this.onSetProductStatus(e,product.id,product.status)}}>{product.status==1?'下架':'上架'}</button>
                                </td>
                                <td>
                                    <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                    <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                                </td>
                            </tr>
                        )
                    })
                }    
                </TableList>     
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum=>this.onPageNumChange(pageNum)}></Pagination> 
            </div>
        )
    }
}
export default UserList;