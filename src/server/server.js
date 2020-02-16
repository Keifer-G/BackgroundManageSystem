let Koa = require('koa');
let router = require('koa-router')();
let bodyparser = require('koa-bodyparser');

const app = new Koa();
let cors = require('koa-cors');

app.use(bodyparser());

// 跨域
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));


// mongodb
let mongodb = require('mongodb');
let mongoose = require('mongoose');
let Schame = mongoose.Schema;

// 连接数据库
mongoose.connect('mongodb://localhost:27017/administer', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//测试是否连接成功
let db = mongoose.connection;
db.on('errro', () => {
    console.log('服务器连接失败！');
});
db.once('open', () => {
    console.log('服务器连接成功');
});

let userSchame = new Schame({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

let userModel = mongoose.model('adminers', userSchame);

router.post('/login', async ctx => {
    ctx.body = ctx.request.body;
    //console.log(ctx.body)
    let loginState = await userModel.findOne({
        username: ctx.body.username,
        password: ctx.body.password
    });

    if (JSON.stringify(loginState) ==='null') {
        //console.log('finderr')
        ctx.body = JSON.stringify({
            logincode: 0
        });
    } else {
        //console.log(JSON.stringify(loginState));
        ctx.body = JSON.stringify({
            logincode: 1
        });
    }
});

app.use(router.routes());
app.use(router.allowedMethods()); // => 这俩一定要加哦    

app.listen(3001);