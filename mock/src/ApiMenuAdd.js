export default {
        url: "/api/menu/add", // 接口的请求地址
        method: "post", // 请求方法
        response: () => {
            return {"message":"新增成功~","code":200,"data":[{"fieldCount":0,"affectedRows":1,"insertId":67,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0},null]} // 模拟的响应数据
        },
    }