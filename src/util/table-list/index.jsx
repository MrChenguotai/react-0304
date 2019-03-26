import React from 'react';
class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstLoading:true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            firstLoading:false
        });
    }
    render(){
        //表头信息
        let tableHeader=this.props.tableHeads.map((tableHead,index)=>{
            console.log(tableHead);
            if(typeof tableHead === 'object'){
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            }else if(typeof tableHead === 'string'){
                return <th key={index}>{tableHead}</th>
            }
        });
        //列表信息
        let listBody=this.props.children;
        let listInfo=(
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}
                </td>
            </tr>
        )
        let tableBody=listBody.length>0?listBody:listInfo;
        return(
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody> 
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TableList;