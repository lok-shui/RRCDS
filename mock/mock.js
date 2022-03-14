// mock.js
import Mock from 'mockjs'

// Mock.mock("url",'type',dataRes);
Mock.mock("/getData", 'get', {
    text: "这是发起get请求返回的数据"
});
Mock.mock("/postData", 'post', function(options) {
    console.log(options); // 这是发送post请求时所传递给后台的数据
    return {
        text: "这是发起post请求返回的数据"
    }
})
