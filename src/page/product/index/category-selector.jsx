import React from 'react';
//页面
import MUtil                from 'util/mm.jsx';
import Product              from 'service/product-service.jsx';
import './category-selector.scss';

const _mm           = new MUtil();
const _product      = new Product();
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:0,
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    //选择一级品类
    onFirstCategoryChange(e){
        let newValue=e.target.value||0;
        this.setState({
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]
        },()=>{
            //更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    //二级选择品类
    onSecondCategoryChange(e){
        let newValue=e.target.value||0;
        this.setState({
            secondCategoryId:newValue,
        },()=>{
            //更新二级品类
            this.onPropsCategoryChange();
        })
    }
        // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        // 如果是有二级品类
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        }
        // 如果只有一级品类
        else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    //加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res
            })   
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    //加载二级品类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            })   
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    render(){
        return(
            <div className="col-md-10">
                <select className="form-control cate-select" onChange={(e)=>{this.onFirstCategoryChange(e)}}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category,index)=>{
                            return <option value={category.id} key={index}>{category.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length>0?(
                        <select className="form-control cate-select" onChange={(e)=>{this.onSecondCategoryChange(e)}}>
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category,index)=>{
                                    return <option value={category.id} key={index}>{category.name}</option>
                                })
                            }
                        </select>)
                    :null
                }
            </div>
        );
    }
}
export default CategorySelector;