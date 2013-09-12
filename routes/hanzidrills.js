var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('hanzidrilldb', server);

db.open(function(err, db) {
if(!err) {
console.log("Connected to 'hanzidrilldb' database");
db.collection('hanzidrilllists', {strict:true}, function(err, collection) {
if (err) {
console.log("The 'hanzidrilllists' collection doesn't exist. Creating it with sample data...");
populateDB();
}
});
}
});

exports.findById = function(req, res) {
var id = req.params.id;
console.log('Retrieving hanzidrill: ' + id);
db.collection('hanzidrilllists', function(err, collection) {
collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
res.send(item);
});
});
};

exports.findAll = function(req, res) {
db.collection('hanzidrilllists', function(err, collection) {
collection.find().toArray(function(err, items) {
res.send(items);
});
});
};

exports.addHanziDrill = function(req, res) {
var hanzidrill = req.body;
console.log('Adding hanzidrill: ' + JSON.stringify(hanzidrill));
db.collection('hanzidrilllists', function(err, collection) {
collection.insert(hanzidrill, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred'});
} else {
console.log('Success: ' + JSON.stringify(result[0]));
res.send(result[0]);
}
});
});
}

exports.updateHanziDrill = function(req, res) {
var id = req.params.id;
var hanzidrill = req.body;
delete hanzidrill._id;
console.log('Updating hanzidrill: ' + id);
console.log(JSON.stringify(hanzidrill));
db.collection('hanzidrilllists', function(err, collection) {
collection.update({'_id':new BSON.ObjectID(id)}, hanzidrill, {safe:true}, function(err, result) {
if (err) {
console.log('Error updating hanzidrill: ' + err);
res.send({'error':'An error has occurred'});
} else {
console.log('' + result + ' document(s) updated');
res.send(hanzidrill);
}
});
});
}

exports.deleteHanziDrill = function(req, res) {
var id = req.params.id;
console.log('Deleting hanzidrill: ' + id);
db.collection('hanzidrilllists', function(err, collection) {
collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred - ' + err});
} else {
console.log('' + result + ' document(s) deleted');
res.send(req.body);
}
});
});
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

var hanzidrills = [{'name':'Arian','missedchars':{},'listname':'my first list','listcontents':['整职抢区裂夕柴样校秦页邋熨莲瓶控彻微宪而淹玉染溅迹讽各获榜蒂呼愚制秘捉救调逮摩鬼扣屁射磨输锚厅衡方裁哇篱拐八谅易日崇春接扑确疯苏民嗽过元腕牧致锤姐脸罢找柏避宀胁智哎菊场玩粗旨淘烈灿巡闯伯内马拯漂女敬飞信兼拒扮嫩脾肿豆正枯科谷慰翅礻洁珈修荡树钅随窝监块宜侨某赋丹瑜铛鼠镇留值权艘慌县胜竹厘齐散挤供昆紫币脆夏郎关慧晴腿扯四看导顺婊刺腐第遢军错圣移采眼眉夹艺削瘦追嫁握州落膀炸狱管贷饭汁础亮廊借隔辑横献冷割搬混冯撒酒走恩盘已战嗓击罗数逃签物怜辖位勿阔堂使蓝逸诊贺岛涨珍咬枚托石再服惧恐蹲画思匙坚表拨垃诸货降世交脖娃毁图颠社泡怕搅酷攻任判辅梭汇格猕规轰士腥腔姿便距汰沈病姻处络捧律试迁坝炒死柠韦天伊伍纯含辶瓷庄宙窄译袭平帽令哈税分肆途店蛋辐矮臣记入去妒蝎选冻朋劫支帮抽纳高眷涉盟历参渐默奇活达容摘扁肝拧答节屈暂搞忧赫禁吕见却霜书章员症姓国睛唔俄拥账视皱徒摊造榨袁擅宠媳父合版髦尴估曷目辛真搭邓销道众千火来讯白帚醒灭瀑讲衣沫免窟岁宫宽螃按衬睦喉颖代稳蕉媚丐绑陌时喝新低嘛篮衫莫绍己股搏茶诺诚海滋裙厂欺冰蛇饮香啪國奋绪窗扶皮奥劝乎岳软楂上药盗欧疗妙寄雅饺性讠均娇旺乳断硕瞧奈特红瓜融竟七街司良不趁居伐帅鸡脚唯够丛离序坞办祖热爬李潜稣掏示订剩最炭悔婚龟蝴豪始行汉务偷旅售妇戈业雾屎刷贪更啊凑乌薪隶歉歧颜床毒绝驾枝塌快取猴间俊越遵报势籍给湿迎鱼抱炖缭食质刂鉴忙祈录钱市钣右阁察耀抹责惹批楚源极牛烛幸朴束因勺氵央仙娶傣磅实北履机护蒙持炼向墨崭骤据尚尼逼淑辉讶二卖澡矩瑞英审枕遗慕脑绕启炎闷潮欲糊此赚备仁查赔铃偶继通振率替剥户偿予催商噢碍殊增立液尸荷近森较练捕沙甲丈犹莎倾劳娜碗域招静威杰连甜杜筹草候肠截偕寺允佩陕鲁磁季辱迅差欢拳先康课巴温砸泰鼻捏黄彼侠耽编餐抛皆或围励拉仿纤掉罪夺堪安蒋在赏祝效腰熬迈撞蜷享身警樟啥多初搜昧舍丁摇吐打馒杀辫疲哄阶誓升策藏颇恼请功福踢妥饱泪桶武吞盒肤耶潭播应盖廉绿续忽矿定考待蚤署缩览咦诉沃梦拔德兴爸荔峡曾刀烧萝金基藕端趴嚏浏底悲螺咸穿墓副歹把徐观的木袖凉浅庭克弃放璃霸旋许缘胸惨为鞠辆淡芽兵型埃济精聪挪堆披轮纸蛙逻剑现泼钞糕构引盼努舞惑乡抬访叠雄酱味论扇魂证猛像吗丑休韩羽涂触独似席宿以喂若派羡隆晓宗列殖级掀夜柱学睡太梅罩组召亡帐背邻败戚曹爽式糟卢艮循野省乃尬隐惩凝魏苹碟感馆广帝骗照辩鲜字勒球困唱咖码绣痛薄插氏骨口歪云匀绳浓旁铺伴哀您憾矛被飘睬侦榄意认捐譬牵径怪饿赂遣负充绊眠吸哪显推檬猪丽突傍受鞋张滑胖蹦教米傅河跑弹从敢境嘘识坛依雷蒸短变强绩浪起嫌戒蔬钩玲螂音盈吹恒般三台艳松但仪橄爱额岷里人该卷装艹腹盯研植屏乙单换丸毯标送苔巾魅匆嗯佣乞狼泊动弄萨钢杯族殳吨砍撤蟹才噜姆缝稀付拍激析淋乔闻九自雨训授仔睁厚占沟王呀讼写施昌蹈贸带纪华碎矶嗦惭素地粹吓津会庞得碧挑吃舰菇忍霍槽狡猾盆竞奶烂美氛纷朝宣粒将浆发沛艾危捡利满虎府督挺阳懒摆叛其促索遇跳阿浮凯院约倦斗瓦谁景疫同恢早血溜边健兽退污荣青贼咨又耻侯漆番暹我晚灯曲紧虑祥哥匕尿呃硬拜沉泄胡尝劲冠残疼设赵厦养工到午壶乓色投谊洋例燕月超损伙芳营算粮侮澳前仓壮辈虽置守摔归切烦馋劣晕奴电步踏拾晶资侧寞怀腾农买寒羊陪你菲篷楼舌咱押主醋卧會申度创噩遥饣烟褐提伤港蟑圾亚当文严慢折魔听椅那需坡券江积六耳妆傻惜扬俗冒雇遭奔些违亲俏荒毫尘态房赶剪堡逐愈蜂丧划左跃敲兑塞爪返辜伪呢厌材每重乐锻泛面豕幼挣艰中震么虹旬笔朗解迷烫好沮用硅亿凶描东椒净也鸟衷防瘾庙完款恶贬运寂债客首郑佛仲喷歇刘保外她私汤决明晃袜件穷裹丰详弱啤爷非童肌属兔影门城殿雪扎孜耍治拟脂党皂棵概幅牙状缸久后甩坐厕存耕尺宴唇镜彩刑宅叹篝敦轻跌琐驶一辞恋系裤并滩兄洛箭消谨池筑扩觉细屉且翻蠢趣伸拎映异征膏吾剂邪朱尽恳抄润险个旗否村煮昨喔擦敏纲适几娱子模蝶有期京卡稿透寸荤胶爆骑嘉链陡除阻架郊风航古吧茄孔妨幻旱埋要皇总终果串开誉双配宾勤毛限指常玻漫浊卜悉肩革跨浴绸渡孝恨册万沿逗兹茸游炮怡局眨躬井花奏称溶计拆织根词缴况吵罚相洲邀传讨登卓胃凭甘嘿浸栋胎废线由惯及望菜雕暴妻故着念桔憨乱转痴寿争酸慈抗住宵加稽疑樱蜡典曰项壁赢扔还厶滚秀聚寻厨评纹企假渔斤泥乒室档斯靠苍只力凡川就失丝踩翰延光反舒泳哭富尾哨肥吉厉伏巨馨何仅惊段橡郭倒邦乘朵弗汗瑟辨谑洞这屿止秩湖衰扫咳唉叔痒贴比绘肚玛艇网荐叫综灵谓谢名酬沾塘践界碰袍筒对蘑俩布检奉忠西吴等油赛至圈清敌兰刮葡杆扭彳诞惟下和糙莉宋委赌水舅橙黑阝部偏车翼联仇滤板牺苗趋技叉捷梳互骄递声封臃读财句彬铜哦箱购媒贿锅必呵闲预癌歌齿冲亠载嘴半甥速倡猜者暑既大谎心耗挡母君出颗柔牲做迟述术锐结乏它蓄际夸案胳零义措补炉露套固钻累忆南友御贡临经圳牦甚峰饪曼怨挎洪们挂桑帖头恰孩百漱幕年著然键杨苦穆希他赖歼响漏呈滴儿包湾胆蛀无排长成诗家宁稍桥角释塔测狗膝深斜拦椰摸改役旧桌丢扰猎饼躺铅叙询知钓挥忘欣与优虚坏次秋化志附旦宏唤蔓叶鹰罐篇笼量阅漠牌喊粘领膊破抚啦坦言俱莺橱董所繁渴秒括燥漓针乖类迫伦料悠纠命直探孕政泉塑协谦娘梯银晋唐站习轿作执拖烹印畜博舟掌神哲息两即题事婆填馅鞭臂腊鼓堵十路尖浇陈全帕斥介茉袋礁求纵佳遍别焦卫法抵暗集星核柜宇收波菌品廷添桂谋洗愧迪狮寓摄密妹顽队空谐屋怎黎很倍趟闪愤垂龄共顿攒谱瞬培说龙往邮建笑专驱拼泽祸辣师蜜麻仗俭虾肉毕洒官略老产鸣医未慎宝礼姨五议庆尤气棕今撕夫回臭饵拌嫉抑墙史阵届凤畅脱悟酉挖逛亏没勃须则远座圆熟铁弯团惠悄奢价诀程群钥亦操欠干玄胞频喜钉情盛谈舱害晒栏刚剧斑撑之统赴遮姥号糖阴赞枪育周刊流呆手汽棉体符租孟刻愿陷霉骂公什愁闭于嫂珠钟形侈麦贯顶具进傲准班告急锋浑小杂笆可饰少妈盾疾援益豫狩杉减注想狂伞揭话虫涌侵停匹狠哑粽器陆肃亻晨葱本帘厢皖忄善躲懂戏吻跟牢冖囗孙灰怖翩犯问粉暖祷助鸭窿奖嚼熊演契纽昏柿票男幽柳腻驻蒜缺林脏锁祭梨勇烙了踪土展诱冬简聘患象巧殷贵种让淇尊山弥址仆淳姑验棋煤仍环原裔田孤贝莱烤弟尔普究生岩能择愉戴理伟萄棒层凌误举脉闹余嗨压贫靶笨岸岗缓顾怒梁羞岂盐掩醉赤貌园竖猫聊拿库障永琴蚕恭抖末是啡仰复逊侄筷另难船瞎燃份桃片维亭陶耐艸担储范抓如械费呐肯承点彭删足灾语拽都条']}];

db.collection('hanzidrilllists', function(err, collection) {
collection.insert(hanzidrills, {safe:true}, function(err, result) {});
});

};
