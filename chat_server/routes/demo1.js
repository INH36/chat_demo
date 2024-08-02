
const express  =require('express');

const router = express.Router();

// 返回数据
router.get('/getInfo',(req,res)=>{
    res.send({
        code: 200,
        mes: 'ok',
        data: {
            name: '张三',
            age: 18
        }
    })
})

module.exports = router;