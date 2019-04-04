import React from 'react';
import {Link} from 'react-router-dom';
import Product      from 'service/product-service.jsx';
import MMtil from 'util/mm.jsx';

import TableList from 'util/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _product=new Product();
const _mm=new MMtil();
class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0
        }
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        console.log(prevProps,'prevProps');
        console.log(prevState,'prevState');
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    //加载品类列表
    loadCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res=>{
            this.setState({
                list:res
            })
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg);
        });
    }
    // 更新品类的名字
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的品类名称', categoryName);
        console.log(newName);
        console.log(categoryId,'categoryId');
        console.log(categoryName,'categoryName');
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName : newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render(){
        let listBody=this.state.list.map((category,index)=>{
            return(
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                                onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId === 0
                            ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                            : null
                        }   
                    </td>
                </tr>
            )
        });
        return(
            <div id="page-wrapper">
                <PageTitle title="品类列表"></PageTitle>
                <TableList tableHeads={['品类ID','品类名称','操作']}> 
                    {listBody}
                </TableList>
            </div>
        )
    }
}
export default CategoryList;