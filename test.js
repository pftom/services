const tikuQuestions = require('./utils/tiku.json');

let tiku = [
    {
        "id": 0,
        "name": "主持人",
        "username": "dhucstmaster",
        "logged": true,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 12,
        "name": "樊静宜",
        "username": "161310405",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 18,
        "name": "张洛彬",
        "username": "151340224",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 36,
        "name": "王亦凡",
        "username": "141340110",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 43,
        "name": "孙琳",
        "username": "141320105",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 83,
        "name": "汪立智",
        "username": "2161660",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 107,
        "name": "杨丽俊",
        "username": "2171753",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 110,
        "name": "许鹏健",
        "username": "2171774",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 117,
        "name": "马永东",
        "username": "2171793",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 135,
        "name": "陈瑶",
        "username": "161310701",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 138,
        "name": "乔帆",
        "username": "161310503",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 154,
        "name": "顾欣",
        "username": "2171783",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 161,
        "name": "龙勰",
        "username": "2171784",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": true
    },
    {
        "id": 0,
        "name": "主持人",
        "username": "dhucstmaster",
        "logged": true,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 1,
        "name": "刘欣怡",
        "username": "2171800",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 2,
        "name": "伍强生",
        "username": "151320108",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 3,
        "name": "杨博",
        "username": "151330122",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 4,
        "name": "任方成",
        "username": "151320116",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 5,
        "name": "王琦涵",
        "username": "151330121",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 6,
        "name": "毕磊",
        "username": "151320218",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 7,
        "name": "李曾贤",
        "username": "151330111",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 8,
        "name": "牛童",
        "username": "161310505",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 9,
        "name": "戴顺新",
        "username": "161310311",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 10,
        "name": "马希磊",
        "username": "161310414",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 11,
        "name": "曹茂鑫",
        "username": "151320222",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 13,
        "name": "杜优",
        "username": "2171832",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 14,
        "name": "文孔召",
        "username": "151310109",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 15,
        "name": "姜威",
        "username": "141310210",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 16,
        "name": "邓佳颖",
        "username": "151310203",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 17,
        "name": "刘雨杉",
        "username": "161310102",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 19,
        "name": "权钰清",
        "username": "151340203",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 20,
        "name": "高蕙兰",
        "username": "151340107",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 21,
        "name": "何荆娆",
        "username": "151340202",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 22,
        "name": "王宇",
        "username": "141310117",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 23,
        "name": "汪聪",
        "username": "141310127",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 24,
        "name": "杨瑾",
        "username": "141340207",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 25,
        "name": "李瞻文",
        "username": "141340120",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 26,
        "name": "陈云风",
        "username": "141340228",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 27,
        "name": "倪聪凝",
        "username": "141340206",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 28,
        "name": "姜力新",
        "username": "141310106",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 29,
        "name": "杨芳",
        "username": "141310103",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 30,
        "name": "隋新元",
        "username": "141310118",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 31,
        "name": "赵桓",
        "username": "141310202",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 32,
        "name": "褚仪明",
        "username": "141310220",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 33,
        "name": "徐悦",
        "username": "141340107",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 34,
        "name": "朱宸",
        "username": "141340224",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 35,
        "name": "常皓钰",
        "username": "141310209",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 37,
        "name": "赵越",
        "username": "141340111",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 38,
        "name": "沈逸斐",
        "username": "140750214",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 39,
        "name": "刘浩",
        "username": "141310211",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 40,
        "name": "袁天星",
        "username": "141320116",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 41,
        "name": "卢海琴",
        "username": "141330104",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 42,
        "name": "舒文婷",
        "username": "141330105",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 44,
        "name": "胡双利",
        "username": "141330129",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 45,
        "name": "张绍俊",
        "username": "141320120",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 46,
        "name": "刘言石",
        "username": "141320119",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 47,
        "name": "王怡宾",
        "username": "141320220",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 48,
        "name": "陈一洲",
        "username": "141320121",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 49,
        "name": "李鑫宇",
        "username": "141040116",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 50,
        "name": "冉月雯",
        "username": "141320201",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 51,
        "name": "雷涛",
        "username": "121320228",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 52,
        "name": "于纬华",
        "username": "2151553",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 53,
        "name": "张新昆",
        "username": "2151563",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 54,
        "name": "孙珊",
        "username": "2151551",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 55,
        "name": "南冰",
        "username": "2151541",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 56,
        "name": "张君宝",
        "username": "1149209",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 57,
        "name": "葛晨雨",
        "username": "2151544",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 58,
        "name": "丁文成",
        "username": "2151529",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 59,
        "name": "凌志扬",
        "username": "2151528",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 60,
        "name": "李瑶",
        "username": "2151552",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 61,
        "name": "陈婕",
        "username": "2151545",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 62,
        "name": "彭南",
        "username": "2151549",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 63,
        "name": "赵文锋",
        "username": "2151531",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 64,
        "name": "高志勇",
        "username": "2151530",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 65,
        "name": "谢嗣弘",
        "username": "2151564",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 66,
        "name": "杨青",
        "username": "2151576",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 67,
        "name": "张恒",
        "username": "2151577",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 68,
        "name": "赵益",
        "username": "2151568",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 69,
        "name": "罗元国",
        "username": "2151561",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 70,
        "name": "陆婷婷",
        "username": "2151575",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 71,
        "name": "王海建",
        "username": "2151565",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 72,
        "name": "张媛媛",
        "username": "2151574",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 73,
        "name": "张东辉",
        "username": "2151570",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 74,
        "name": "王杰",
        "username": "2151559",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 75,
        "name": "郝茜",
        "username": "2151571",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 76,
        "name": "项岚",
        "username": "2161654",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 77,
        "name": "秦胜楠",
        "username": "2161655",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 78,
        "name": "闻宇凡",
        "username": "2161632",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 79,
        "name": "顾一帆",
        "username": "2161639",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 80,
        "name": "王丽敏",
        "username": "2161650",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 81,
        "name": "吴展豪",
        "username": "2161640",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 82,
        "name": "王泽南",
        "username": "2161657",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 84,
        "name": "程炜东",
        "username": "2161658",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 85,
        "name": "李文齐",
        "username": "2161664",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 86,
        "name": "周欣欣",
        "username": "2161672",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 87,
        "name": "徐嘉敏",
        "username": "2161678",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 88,
        "name": "张圆",
        "username": "2161677",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 89,
        "name": "张凌嘉",
        "username": "2161637",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 90,
        "name": "闫潮",
        "username": "2161662",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 91,
        "name": "张玉娟",
        "username": "2161656",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 92,
        "name": "窦路路",
        "username": "2161722",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 93,
        "name": "沈大框",
        "username": "2161703",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 94,
        "name": "周婉君",
        "username": "2161723",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 95,
        "name": "李晶晶",
        "username": "2161699",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 96,
        "name": "朱光亚",
        "username": "2161690",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 97,
        "name": "李航",
        "username": "2161682",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 98,
        "name": "赵佳峰",
        "username": "2161689",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 99,
        "name": "张晶晶",
        "username": "2161719",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 100,
        "name": "王一盟",
        "username": "2161694",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 101,
        "name": "冷娜",
        "username": "2161724",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 102,
        "name": "吴文莉",
        "username": "2171752",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 103,
        "name": "原丽娜",
        "username": "2171750",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 104,
        "name": "张梦娜",
        "username": "2171759",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 105,
        "name": "郑俊浩",
        "username": "2171731",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 106,
        "name": "史春红",
        "username": "2171760",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 108,
        "name": "陈立功",
        "username": "2171734",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 109,
        "name": "贺宇",
        "username": "2171777",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 111,
        "name": "庞敏敏",
        "username": "2171780",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 112,
        "name": "谢书达",
        "username": "2171762",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 113,
        "name": "杨建明",
        "username": "2171771",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 114,
        "name": "段刘卿",
        "username": "2171789",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 115,
        "name": "贺紫珺",
        "username": "2171804",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 116,
        "name": "刘敏",
        "username": "2171805",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 118,
        "name": "赵英彬",
        "username": "2171791",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 119,
        "name": "商紫薇",
        "username": "2171831",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 120,
        "name": "王伟鹏",
        "username": "2171816",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 121,
        "name": "武治含",
        "username": "2171830",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 122,
        "name": "庄计龙",
        "username": "2171821",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 123,
        "name": "王文涛",
        "username": "2171820",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 124,
        "name": "马镇",
        "username": "2171814",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 125,
        "name": "姜健芃",
        "username": "2171812",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 126,
        "name": "罗超",
        "username": "2171786",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 127,
        "name": "杨梦玮",
        "username": "151140202",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 128,
        "name": "田若璇",
        "username": "151440101",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 129,
        "name": "唐韧之",
        "username": "150120122",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 130,
        "name": "段思绮",
        "username": "151340103",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 131,
        "name": "杨梦媛",
        "username": "151320206",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 132,
        "name": "刘雪",
        "username": "151340204",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 133,
        "name": "孔菲菲",
        "username": "151340102",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 134,
        "name": "梁雄飞",
        "username": "161310119",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 136,
        "name": "谢孟霞",
        "username": "161310403",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 137,
        "name": "李豫沛",
        "username": "161310416",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 139,
        "name": "张莉萍",
        "username": "161310706",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 140,
        "name": "李纪奇",
        "username": "161310718",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 141,
        "name": "朱经纬",
        "username": "161310318",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 142,
        "name": "董震恒",
        "username": "161310520",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 143,
        "name": "朱宇鑫",
        "username": "161310402",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 144,
        "name": "韩耀霖",
        "username": "161310707",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 145,
        "name": "王可心",
        "username": "171310503",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 146,
        "name": "徐学锋",
        "username": "171310211",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 147,
        "name": "卢泽宇",
        "username": "171310511",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 148,
        "name": "宋耘慧",
        "username": "171310106",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 149,
        "name": "高梓博",
        "username": "171310428",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 150,
        "name": "王欢",
        "username": "171310403",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 151,
        "name": "刘莉",
        "username": "171310301",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 152,
        "name": "黄嘉辰",
        "username": "171310624",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 153,
        "name": "胡星刚",
        "username": "2171772",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 155,
        "name": "孙震",
        "username": "2171797",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 156,
        "name": "肖波",
        "username": "2171826",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 157,
        "name": "牛鑫",
        "username": "2171818",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 158,
        "name": "张天",
        "username": "2171741",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 159,
        "name": "朱甜甜",
        "username": "2171749",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 160,
        "name": "曹珊",
        "username": "2171781",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 162,
        "name": "李倩",
        "username": "10105172",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 163,
        "name": "罗辛",
        "username": "10104806",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 164,
        "name": "袁润恬",
        "username": "171310609",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 165,
        "name": "杨逸舟",
        "username": "171310316",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 166,
        "name": "闫士林",
        "username": "171310614",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 167,
        "name": "杨彬",
        "username": "171310323",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 168,
        "name": "王承志",
        "username": "171310525",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 169,
        "name": "吴珊珊",
        "username": "171310602",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 170,
        "name": "任英杰",
        "username": "171310619",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 171,
        "name": "孙奇倩",
        "username": "171310205",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 172,
        "name": "黄铭鑫",
        "username": "171310611",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 173,
        "name": "黄晓金",
        "username": "171310601",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 174,
        "name": "马晨宇",
        "username": "171310105",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 175,
        "name": "刘斌辉",
        "username": "171310520",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 176,
        "name": "张晓阳",
        "username": "171310516",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 177,
        "name": "薛梦真",
        "username": "171310103",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 178,
        "name": "庞婷怡",
        "username": "171310102",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 179,
        "name": "冯雯鑫",
        "username": "171310108",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 180,
        "name": "陆东",
        "username": "171310510",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 181,
        "name": "聂胜阳",
        "username": "171310519",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 182,
        "name": "周欣宇",
        "username": "171310530",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 183,
        "name": "程高艺",
        "username": "171310424",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 184,
        "name": "孟煊英",
        "username": "171310523",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 185,
        "name": "余佳鹤",
        "username": "171310620",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 186,
        "name": "王晖",
        "username": "161310510",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 187,
        "name": "周轶杰",
        "username": "161140126",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 188,
        "name": "刘秋文",
        "username": "2171732",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 189,
        "name": "杨安平",
        "username": "2171742",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 190,
        "name": "韩明轩",
        "username": "161310409",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 191,
        "name": "熊锐",
        "username": "161310107",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 192,
        "name": "毛莹",
        "username": "2171758",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 193,
        "name": "黄科科",
        "username": "2171745",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 194,
        "name": "杨云",
        "username": "2171761",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 195,
        "name": "李宁",
        "username": "2171740",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    },
    {
        "id": 196,
        "name": "孟盈",
        "username": "2171748",
        "logged": false,
        "score": 0,
        "out": false,
        "isPlayer": false
    }
]

let a = [
  {
    score: 0,
  },
  {
    score: 3,
  },
  {
    score: 2,
  },
  {
    score: 1,
  },
  {
    score: 4,
  },
];

const res = a.sort((user1, user2) => user1.score < user2.score);
console.log('res', res);
