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
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let categoryIdChange        = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange  = this.props.parentCategoryId !== nextProps.parentCategoryId;
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId     : nextProps.categoryId,
                secondCategoryId    : 0
            });
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId     : nextProps.parentCategoryId,
                secondCategoryId    : nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }
        
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
        if(this.props.readOnly){
            return;
        }
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res
            });   
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    //加载二级品类
    loadSecondCategory(){
        if(this.props.readOnly){
            return;
        }
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            })   
        },errMsg=>{
            _mm.errorTips(errMsg);
            console.log(1);
        })
    }
    render(){
        return(
            <div className="col-md-10">
                <select className="form-control cate-select" 
                    readOnly={this.props.readOnly}
                    value={this.state.firstCategoryId}
                    onChange={(e)=>{this.onFirstCategoryChange(e)}}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category,index)=>{
                            return <option value={category.id} key={index}>{category.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length>0?(
                        <select 
                            readOnly={this.props.readOnly}
                            value={this.state.secondCategoryId}
                            className="form-control cate-select" onChange={(e)=>{this.onSecondCategoryChange(e)}}>
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