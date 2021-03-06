import Mock from 'mockjs'
var Random = Mock.Random

Mock.mock('/api/login', (req, res) => {
    let data = Mock.mock({
        userName: 'admin',
        password: 'admin'
    })
    return data
})

Mock.mock('/api/data', (req, res) => {
    let data = Mock.mock({
        "array|4000": [
            {
                "orderNo|+1": 1,  //序号
                "account": '@name',//账号
                'userName': '@cname',  //姓名
                'sex|1': '男', //性别
                "status|1": true,   //状态
                "age|1-120": 120, //年龄
                "phone": /^1[0-9]{10}$/ , //手机
                "email": "@email", //邮箱
                "address": "@county(true)", //地址
                "insertTime": "@datetime",  //新增时间
                "updateTime": Random.now('second') //修改时间    

            }
        ]
    })
    return data
})

Mock.mock('/api/org', (req, res) => {
    let data = Mock.mock([
        {
            title: 'parent 1',
            expand: true,
            children: [
                {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-1-1',
                        },
                        {
                            title: 'leaf 1-1-2'
                        }
                    ]
                },
                {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-2-1'
                        },
                        {
                            title: 'leaf 1-2-1'
                        }
                    ]
                }
            ]
        },
        {
            title: 'parent 2',
            expand: false,
            children: [
                {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-1-1'
                        },
                        {
                            title: 'leaf 1-1-2'
                        }
                    ]
                },
                {
                    title: 'parent 1-2',
                    expand: true,
                    children: [
                        {
                            title: 'leaf 1-2-1'
                        },
                        {
                            title: 'leaf 1-2-1'
                        }
                    ]
                }
            ]
        }
    ])
    return data
})
Mock.mock('/api/user',()=>{
    var data=   [
        {
            title: 'parent 1',
            expand: true,
            children: [
                {
                    id: '1',
                    title: 'parent 1-1',
                    checked: false,
                    children: []
                   
                },
                {
                    id: '2',
                    title: 'leaf 1-1-1',
                    checked: false,
                    children: []
                },
                {
                    id: '3',
                    title: 'leaf 1-1-2',
                    checked: false,
                    children: []
                },
                {
                    id: '4',
                    title: 'parent 1-2',
                    checked: false,
                    children: []
                   
                }, {
                    id: '5',
                    title: 'leaf 1-2-1',
                    checked: true,
                    children: []
                },
                {
                    id: '6',
                    title: 'leaf 1-2-1',
                    expand: true,
                    children: [
                        {
                            id: '6-1',
                            title: 'leaf 1-2-1',
                            checked: true,
                            children: []
                        },
                        {
                            id: '7-1',
                            title: 'leaf 1-2-1',
                            checked: false,
                            children: []
                        }
                    ]
                }
            ]
     
    }
]
return  data
})

Mock.mock('/api/list1', (req, res) => {
    let data = Mock.mock({
        "array|7": [
            {
                "orderNo|+1": 1,  //序号
                "orgName": '@ctitle', //组织结构
                "orgCode":'@name',
                "status|1": true,   //是否启用
                "orderNo|1-100":100, 
            }
        ]
    })
    return data
})
Mock.mock('/api/power', (req, res) => {
    let data = Mock.mock({
        "array|10": [
            {   
                 "roleCode":'@name',
                 "roleName":'@cname',
                 "orderNo|1-100":100, 
                "status|1": true,   //是否启用
               
            }
        ]
    })
    return data
})

Mock.mock('/api/menulist', (req, res) => {
    let data = Mock.mock({
        "array|10": [
            {   
                "menuName":'@cname',
                "menuCode":'@name',
                "url":'@url',
                "icon":'icon',
                "orderNo|1-100":100, 
                "status|1": true,   //是否启用
               
            }
        ]
    })
    return data
})
