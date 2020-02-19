let Koa = require('koa');
let router = require('koa-router')();
let bodyparser = require('koa-bodyparser');
let fs = require('fs');
let path = require('path');

let staticFile = require('koa-static');
let formidable = require('formidable');

const app = new Koa();
let cors = require('koa-cors');

app.use(bodyparser());

// 跨域
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 10,
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

    if (JSON.stringify(loginState) === 'null') {
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

/* app.use(staticFile(path.resolve(__dirname, "./serverImage")))

router.post('/upload',async ctx=>{
    upLoadImg(ctx.request,ctx.response);
})
]*/


router.post('/upload', async ctx => {

    ctx.body = ctx.request.body;
    //接收前台POST过来的base64
    //过滤data:URL
    //console.log(ctx.body, ctx.body.imgBase)
    var imgData = ctx.body.imgBase;
    console.log(imgData)
    let data = Buffer.concat
/*     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function (err) {
        if (err) {
            console.log(err);
        } else {
            let bitmap = fs.readFileSync(path.join(__dirname,'..','..','image.png'));

            let base64str = Buffer.from(bitmap, 'binary').toString('base64');
        
            ctx.body = base64str;
        }
    }); */
});
router.get('/image',async ctx=>{
    let bitmap = fs.readFileSync(path.join(__dirname,'..','..','image.png'));

    let base64str = Buffer.from(bitmap, 'binary').toString('base64');

    let image = 'data:image/png;base64,' + base64str;

    ctx.body = image;
})


app.use(router.routes());
app.use(router.allowedMethods()); // => 这俩一定要加哦    

app.listen(3001);