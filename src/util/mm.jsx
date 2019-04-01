class MMtil{
    //请求
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:param.type||"get",
                url:param.url||'',
                dataType:param.dataType||'json',
                data:param.data||null,
                success:res=>{
                    if(res.status===0){
                        typeof resolve==='function'&&resolve(res.data,res.msg);
                    }
                    else if(res.status===10){
                        this.doLogin();
                    }else{
                        typeof reject==="function"&&reject(res.msg||res.data);
                    }
                },
                err:(err)=>{
                    typeof reject==="function"&&reject(err.statusText);
                }
            })
        })
    }
    //跳转登录
    doLogin(){
        window.location.href='/login?redirect='+encodeURIComponent(window.location.pathname);
    }
    //获取URL参数
    getUrlParam(name){
        let queryString=window.location.search.split('?')[1]||'',
        reg=new RegExp("(^|&)"+name+"=(&|$)"),
        result=queryString.match(reg);
        return result?decodeURIComponent(result[2]):null;
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
    //本地存储
    setStorage(name,data){
        let dataType=typeof data;
        if(dataType==='object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['string','boolean','number'].indexOf(dataType)>-1){
            window.localStorage.setItem(name,data);
        }else{
            alert("该类型不能用于本地存储");
        }
    }
    //去除本地存储内容
    getStorage(name){
        let data=window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    //删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}
export default MMtil;