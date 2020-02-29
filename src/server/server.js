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
    },
    level: {
        type: Number
    },
    useruri: {
        type: String
    },
    usersex: {
        type: String
    },
    userInfo: {
        type: String
    },
    userCompony: {
        type: String
    },
    usernum: {
        type: Number
    },
    useremail: {
        type: String
    },
    key: {
        type: String
    },
    selfInfp: {
        type: String
    },
    age: {
        type: Number
    },
});

let messageSchame = new Schame({
    content: {
        type: String
    },
    key: {
        type: String
    },
    time: {
        type: String
    }
})
let missionSchame = new Schame({
    mission: {
        type: String
    },
    key: {
        type: String
    },
    time: {
        type: String
    },
    username:{
        type:String
    },
    every:{
        type:Boolean
    }
})

let userModel = mongoose.model('adminers', userSchame);
let messageModel = mongoose.model('messages', messageSchame)
let missionModel = mongoose.model('missions', missionSchame)

// login
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
            logincode: 1,
            data: {
                loginState
            }
        });
    }
});

// adminer
router.get('/adminers', async ctx => {
    let adminerData = await userModel.find({
        level: 1
    });

    ctx.body = JSON.stringify(adminerData);
})

/* app.use(staticFile(path.resolve(__dirname, "./serverImage")))

router.post('/upload',async ctx=>{
    upLoadImg(ctx.request,ctx.response);
})
]*/

// add 
router.post('/add', async ctx => {
    ctx.body = ctx.request.body;
    //console.log(ctx.body);

    let againname = await userModel.findOne({
        username: ctx.body.username
    });

    if (JSON.stringify(againname) === 'null') {
        let users = await userModel.find({});
        let lastUser = users[users.length-1]
        let lastKey = lastUser.key;
        let newKey = Number(lastKey) + 1;
        let newKeyStr = JSON.stringify(newKey);
        //console.log(key);
        try {
            let res = await userModel.create({
                username: ctx.body.username,
                password: ctx.body.password,
                usersex: ctx.body.sex,
                level: 1,
                key: newKeyStr,
                userCompony: ctx.body.compony,
                useremail: ctx.body.email,
                usernum: Number(ctx.body.usernum),
                age: 0,
                selfInfp: '',
                useruri: '',
                userInfo: ''
            })
            ctx.body = JSON.stringify({
                addcode: 1
            })
        } catch (e) {
            console.log(e);
            ctx.body = JSON.stringify({
                addcode: 0
            })
        }
    } else {
        ctx.body = JSON.stringify({
            addcode: 0
        });
    }
})

// delete
router.post('/delete', async ctx => {
    ctx.body = ctx.request.body;
    let res = await userModel.deleteOne({
        username: ctx.body.username
    });
    ctx.body = JSON.stringify({
        deletecode: 1
    })

})

// 消息请求
router.get('/message', async ctx => {
    let res = await messageModel.find({});
    //console.log(res);

    ctx.body = JSON.stringify(res);
})

// 头像上传
router.post('/upload', async ctx => {

    ctx.body = ctx.request.body;
    //接收前台POST过来的base64
    //过滤data:URL
    //console.log(ctx.body, ctx.body.imgBase)
    var imgData = ctx.body.imageUri;
    let username = ctx.body.username;

    if (imgData) {
        let res = await userModel.updateOne({
            username: username
        }, {
            useruri: imgData
        });
        ctx.body = JSON.stringify({
            uploadcode: 1
        })
    } else {
        ctx.body = JSON.stringify({
            uploadcode: 0
        })
    }

});

// 上传广播消息
router.post('/sendmessage', async ctx => {
    ctx.body = ctx.request.body
    let message = ctx.body.message
    let key = await messageModel.find({}).countDocuments();
    let keyStr = JSON.stringify(key);
    let myDate = new Date();
    const M = myDate.getMonth() + 1;
    const D = myDate.getDate();
    const H = myDate.getHours();  
    const Min = myDate.getMinutes(); 
    const curDay = M + '-' + D + ' ' + H + ':' + Min;

    try {
        let res = await messageModel.create({
            content: message,
            key: keyStr,
            time:curDay
        })
        ctx.body = JSON.stringify({
            messagecode: 1
        })
    } catch (e) {
        ctx.body = JSON.stringify({
            messagecode: 0
        })
    }
})

// 上传任务消息
router.post('/sendmission', async ctx => {
    ctx.body = ctx.request.body
    let mission = ctx.body.mission
    let key = await missionModel.find().countDocuments();
    let keyStr = JSON.stringify(key);
    let myDate = new Date();
    const M = myDate.getMonth() + 1;
    const D = myDate.getDate();
    const H = myDate.getHours();  
    const Min = myDate.getMinutes(); 
    const curDay = M + '-' + D + ' ' + H + ':' + Min;

    try {
        let res = await missionModel.create({
            mission: mission,
            key: keyStr,
            time:curDay,
            every:true
        })
        ctx.body = JSON.stringify({
            missioncode: 1
        })
    } catch (e) {
        ctx.body = JSON.stringify({
            missioncode: 0
        })
    }
})

// 请求当前用户
router.post('/currentuser',async ctx=>{
    ctx.body = ctx.request.body;
    let username = ctx.body.username;
    let currentUser = await userModel.findOne({username:username});
    ctx.body = JSON.stringify(currentUser);
})

// 返回任务
router.post('/mission',async ctx=>{
    ctx.body = ctx.request.body;
    let username = ctx.body.username;

    let res = await missionModel.find({$or:[
        {every:true},
        {username:username}
    ]});

    ctx.body = JSON.stringify(res);
})

// 更新用户信息
router.post('/change',async ctx=>{
    ctx.body = ctx.request.body;
    console.log(ctx.body);
    let username = ctx.body.username;
    let values = ctx.body.values;
    
    let res = await userModel.findOne({username:values.name});
    let oldInfo =await userModel.findOne({username:username});

    if (JSON.stringify(res) === 'null' || values.name===oldInfo.username) {
        // 未找到同名继续
        let changeInfo = await userModel.updateOne({username:username},{
            username: values.name===''?oldInfo.username:values.name,
            password: values.password===''?oldInfo.password:values.password,
            usersex: values.sex===''?oldInfo.usersex:values.sex,
            level: 1,
            key: oldInfo.key,
            userCompony: values.compony===''?oldInfo.userCompony:values.compony,
            useremail:values.email===''?oldInfo.useremail:'www.'+ values.email +'.com',
            usernum: values.usernum?oldInfo.usernum:Number(values.usernum),
            age: values.age?oldInfo.age:Number(values.age),
            selfInfp: values.plan===''?oldInfo.selfInfp:values.plan,
            useruri: oldInfo.useruri,
            userInfo: values.selfInfo===''?oldInfo.userInfo:values.userInfo
        })
        let newInfo = await userModel.findOne({username:values.name})
        console.log('success')
        ctx.body = JSON.stringify({userInfo:newInfo,changecode:1})
        
    } else {
        //console.log(JSON.stringify(loginState));
        // 找到同名更改失败
        ctx.body = JSON.stringify({
            changecode: 0
        });
        console.log('fail')
    }
    
});

router.post('/currentmission',async ctx=>{
    ctx.body = ctx.request.body;
    
    let username = ctx.body.username;
    let mission = ctx.body.values.mission;
    let key = await missionModel.find().countDocuments();
    let keyStr = JSON.stringify(key);
    let myDate = new Date();
    const M = myDate.getMonth() + 1;
    const D = myDate.getDate();
    const H = myDate.getHours();  
    const Min = myDate.getMinutes(); 
    const curDay = M + '-' + D + ' ' + H + ':' + Min;

    try {
        let res = await missionModel.create({
            username:username,
            mission: mission,
            key: keyStr,
            time:curDay,
            every:false
        })
        ctx.body = JSON.stringify({
            missioncode: 1
        })
    } catch (e) {
        ctx.body = JSON.stringify({
            missioncode: 0
        })
    }
    
})


app.use(router.routes());
app.use(router.allowedMethods()); // => 这俩一定要加哦    

app.listen(3001);