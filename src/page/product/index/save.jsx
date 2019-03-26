import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import CategorySelector     from './category-selector.jsx';
import FileUploader from 'util/file-upload/index.jsx'

const _mm           = new MUtil();
const _product      = new Product();
class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.match.params.pid,
            categoryId:0,
            parentCategoryId:0,
            subImages:[]
        }
    }
    onCategoryChange(categoryId,parentCategoryId){
        console.log(categoryId);
        console.log(parentCategoryId);
    }
    //上传图片成功
    onUploadSuccess(res){
        this.setState({
             subImages:this.state.subImages.push(res)
        })
    }
    //上传图片失败
    onUploadError(error){
        _mm.errorTips(error.message||'上传图片失败');
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品名称"
                                name="name"
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品描述" 
                                name="subtitle"
                                />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector onCategoryChange={(categoryId,parentCategoryId)=>{this.onCategoryChange(categoryId,parentCategoryId)}}></CategorySelector>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="价格" 
                                    name="price"
                                    />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="库存" 
                                    name="stock"
                                    />
                                <span className="input-group-addon">件</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length?this.state.subImages.map((image,index)=>{
                                    return (<img key={index} src={image.url}/>)
                                }):(<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-10">
                            <FileUploader 
                            onSuccess={res=>{this.onUploadSuccess(res)}}
                            onError={err=>{this.onUploadError(err)}}></FileUploader>
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" 
                                >提交</button>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}
export default ProductSave;