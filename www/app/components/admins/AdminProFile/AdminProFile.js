import React from 'react';
import CutBox from "./CutBox.js";
import "./AdminProFile.less";
import Admin from "../../../containers/Admin.js";
export default class AdminProFile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            imgW:0,
            imgH:0,
            boxW:0,
            boxH:0,
            padding:0,
            realW:0,
            realH:0,
            picurl:"",
            isShowxuanfu:false
        }
        var self = this;
        window.openXuanfu = function(){
            self.setState({
                isShowxuanfu:true
            })
        };
        window.closeXuanfu = function(){
            self.setState({
                isShowxuanfu:false
            })
            // 当关闭弹出层的时候，我们重新获取页面，通过页面中的img会重新发起src请求。
            $(self.refs.xiaodianshi).attr("src","../../../htmlPage/adminavatarform.html");
        };
        // 图片上传完毕之后的回调
        window.onUpDone = function(picurl,realW,realH){

            var realW = parseInt(realW);
            var realH = parseInt(realH);
            // 得到图片的比例
            var rate = realW / realH;
            // 定义一些常量
            const maxBoxWidth = 700;
            const minBoxWidth = 450;
            const maxBoxHeight = 500;
            const minBoxHeight = 350;
            const padding = 10;
            const rightPart = 180;
            // 计算图片显示的宽度和高度
            var imgW = realW;
            var imgH = realH;
            // 进行一些判断和计算
            if ( realW > maxBoxWidth - rightPart - 2 * padding) {

                    imgW = maxBoxWidth - rightPart - 2 * padding;
                    // 显示图片的高度
                    imgH = imgW / rate;
            };
            if( imgH > maxBoxHeight - 2 * padding ){

                    imgH =  maxBoxHeight - 2 * padding;
                    // 显示图片的宽度
                    imgW = imgH * rate;
            };
            // 决定弹出层的尺寸
            var boxW = imgW + rightPart + 2 * padding;
            var boxH = imgH + 2 * padding;
            // 验收最小值的时候
            if( boxW < minBoxWidth){
                boxW = minBoxWidth;
            };
            if( boxH < minBoxHeight){
                boxH = minBoxHeight;
            };
            // 设置state
            self.setState({
                imgW,
                imgH,
                boxW,
                boxH,
                padding,
                realW,
                realH,
                picurl
            })
        }
    }

    // 前端的文件 上传的套路【前端必须满足几个条件】
    // 1） 必须使用from标签， 这个是一个表单上传的，不是ajax，不是fetch
    // 2）必须method 属性值必须是“POST”
    // 网址:http://www.w3school.com.cn/tags/att_form_enctype.asp
    // 3）必须有enctype 属性 值是 “multipart/form-data” 意思是：不对字符编码，在使用包含文件上传控件的表单时，必须使用该值。
    // 4）file控件必须有name值
    // 5）必须有submit提交按钮
    render() {
        return (
            <Admin c="管理员头像" k="profile">
                <div>
                    <iframe src="../../../htmlPage/adminavatarform.html" ref = "xiaodianshi" frameBorder="0" height="300px"></iframe>
                    {
                        this.state.isShowxuanfu
                        ?
                        <div className="xuanfuceng">
                            <CutBox
                                imgW = { this.state.imgW }
                                imgH = { this.state.imgH }
                                boxW = { this.state.boxW }
                                boxH = { this.state.boxH }
                                padding = { this.state.padding }
                                realW = { this.state.realW }
                                realH = { this.state.realH }
                                picurl = { this.state.picurl }
                            >
                            </CutBox>
                        </div>
                        :
                        null
                    }
                </div>
            </Admin>
        );
    }
}
