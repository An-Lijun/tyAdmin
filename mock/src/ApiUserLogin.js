export default {
        url: "/api/user/login", // 接口的请求地址
        method: "post", // 请求方法
        response: () => {
            return {"message":"登录成功~","code":200,"data":{"token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzQwMDYwMTcwLCJleHAiOjE3NDAxNDY1NzB9.P0V9jLYGma7gnXlBUMFNGjYL5Bv0WRDdQkJeXNAfFhy4x_9V0ohtIO26YhrzVX8EMdsFnocj56Jij9ngDDO0lx8xQb8X7VV2Er2ff2aPw8KtOS_Dimj2FparmURR39IVshgrS_dVXEFBpEQHkpPovsVDs2VWhLsv_ONZvlnV1-SgU5lax-k3sZG0Xc918ANEKqwZtDW2363ZUX-Lq5pSm3Ubm8s-pdOY0yV9GMPgpb3yb7dohh8ycDuHDw35XOe1SlqTb3xiBu8248_c2Kt65wkl30gcyI42JBxw9UqXBaWYciIf7qkOMUVJar9zMJ_1TjWknbXHe63ydYcuYKsnUg"}} // 模拟的响应数据
        },
    }