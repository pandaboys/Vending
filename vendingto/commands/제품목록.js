const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const {
    promptMessage
} = require("../lib/functions.js");
const {
    getMember,
    formatDate
} = require("../lib/functions.js");
const {
    adminid,
    prefix,
    status,
    Token,
    maxmoney,
    minmoney,
    setmoney
} = require('../lib/set.json');

module.exports.run = async (client, message) => {



    let vending = JSON.parse(fs.readFileSync('./data/discordvending.json', 'utf8'));
    let hacklist = JSON.parse(fs.readFileSync('./data/list.json', 'utf8'));
    let hack = JSON.parse(fs.readFileSync('./data/hack.json', 'utf8'));
    let receipt = JSON.parse(fs.readFileSync('./data/receipt.json', 'utf8'));
    let setting = JSON.parse(fs.readFileSync('./data/setting.json', 'utf8'));
    let charge = JSON.parse(fs.readFileSync('./data/charge.json', 'utf8'));



    let sender = message.author;

    function makecode(length) {
        var result = '';
        var characters = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허기니디리미비시이지치키티피히그느드르므브스으즈츠크트프흐구누두루무부수우주추쿠투푸후고노도로모보소오조초코토포호교뇨됴료묘뵤쇼요죠쵸쿄툐표효겨녀뎌려며벼셔여져쳐켜텨펴혀갸냐댜랴먀샤뱌야쟈챠캬탸퍄햐배재대개새매내애래해캐태채패베제데게세메네에레헤케테체페밥밪받박밧밤반방발밯밬밭밫밮잡잦잗작잣잠잔장잘잫잨잩잧잪각갑갖갇갓감간강갈갛갘같갗갚';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function makecode2(length) {
        var result = '';
        var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwerfyuiopasdfghjklzxcbm₩!@#%&?^><';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function makesimembed(title) {
        const mesd = new Discord.MessageEmbed()
            .setColor("#303136")
            .setTitle("**" + title + "**")
        message.channel.send(mesd);
    }

    function msgadmin(description) {

        if (setting["server"].admin == null || setting["server"].admin === "") {
            client.users.cache.get(adminid).send(description);
            return;
        }

        client.users.cache.get(adminid).send(description)

        var admin1 = setting["server"].admin;

        admin1.split(" ").forEach(admin => {

            if (admin === "") return;
            client.users.cache.get(admin).send(description)

        })

    }

    function makeembed(title, des, color) {
        if (color == "1") {
            const mesd = new Discord.MessageEmbed()
                .setColor("#303136")
                .setTitle("**" + title + "**")
                .setDescription(des);

            message.channel.send(mesd);
        } else {
            const mesd = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("**" + title + "**")
                .setDescription(des);

            message.channel.send(mesd);
        }

    }

function producea(a, em){
	if(em.reactions) em.reactions.removeAll();
	var o = 1;		
	var messagelist = ""
var ehwg = source[a].forEach(shop => {
	var hackamount = Number(hack[shop].amount);
					if (hackamount == 0) {
						var amountemoji = "❌"
					} else if(Number(hackamount)!== 0 && Number(hackamount) <= 5){
						var amountemoji = "⚠️"
					}else {
						var amountemoji = "✅"
					}
					messagelist += Number(a*5 + o) + "." +shop +" - "+Number(hack[shop].dollar).toLocaleString()+"원\n[ 재고목록 : "+amountemoji+" ]\n──────────────\n"
								o++
});
				const listEmbed =  new Discord.MessageEmbed()
				.setColor("#303136")
				.setTitle('**제품 목록**')
		.setDescription("──────────────\n" + messagelist)
		.setFooter('❌-재고없음ㅣ⚠️-재고부족ㅣ✅-재고있음')
			em.edit(listEmbed);
			//◀️▶️❌
			
			em.react('❌')
			.then(()=> { if(a !== 0) em.react("◀️");})
			.then(()=>	{if(a !== lastnum) em.react("▶️");})

			const filter = (reaction, user) => {
				return ['◀️','▶️','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
			};
			
			 em.awaitReactions(filter, {
					max: 1, time : 60000, errors: ['time']
				})
				.then(collected => {
					const reaction = collected.first();
			
					if (reaction.emoji.name === '❌') {
						em.delete();
					} else if(reaction.emoji.name === '▶️'){
						if(a == lastnum) return;
						hook++
						produceb(hook, em)
					}else if(reaction.emoji.name === '◀️'){
						if(a == 0) return;
						hook = hook -1
   produceb(hook, em)
   
					}
				})
				.catch(collected => {
					em.delete();
				});
}

function produceb(a, em){
	if(em.reactions) em.reactions.removeAll();
	var o = 1;		
	var messagelist = ""
var ehwg = source[a].forEach(shop => {
	var hackamount = Number(hack[shop].amount);
					if (hackamount == 0) {
						var amountemoji = "❌"
					} else if(Number(hackamount)!== 0 && Number(hackamount) <= 5){
						var amountemoji = "⚠️"
					}else {
						var amountemoji = "✅"
					}
					messagelist += Number(a*5 + o) + "." +shop +" - "+Number(hack[shop].dollar).toLocaleString()+"원\n[ 재고목록 : "+amountemoji+" ]\n──────────────\n"
								o++
});
				const listEmbed =  new Discord.MessageEmbed()
				.setColor("#303136")
				.setTitle('**제품 목록**')
		.setDescription("──────────────\n" + messagelist)
			.setFooter('❌-재고없음ㅣ⚠️-재고부족ㅣ✅-재고있음')
			em.edit(listEmbed);
			//◀️▶️❌
			em.react('❌')
			.then(()=> { if(a !== 0) em.react("◀️");})
			.then(()=>	{if(a !== lastnum) em.react("▶️");})

			const filter = (reaction, user) => {
				return ['◀️','▶️','❌'].includes(reaction.emoji.name) && user.id === message.author.id;
			};
			
			 em.awaitReactions(filter, {
					max: 1, time : 60000, errors: ['time']
				})
				.then(collected => {
					const reaction = collected.first();
			
					if (reaction.emoji.name === '❌') {
						em.delete();
					} else if(reaction.emoji.name === '▶️'){
						if(a == lastnum) return;
						hook++
						producea(hook, em)
					}else if(reaction.emoji.name === '◀️'){
						if(a == 0) return;
						hook = hook -1
   producea(hook, em)
					}
				})
				.catch(collected => {
					em.delete();
				});
}

    if (message.content.substring(5) != "") return;
    if (!vending[message.author.id] || vending[message.author.id].state === "die") return makeembed("접근하실 수 없습니다.", "가입하지 않았거나 차단된 사용자입니다.", 1);
    var messagelist = "";
    if (!hacklist["list"]) {
        hacklist["list"] = {
            list: ""
        };
    }
    var list1 = hacklist["list"].list;
    //var list22 = list1.split(" ");


    
    if (list1 === "") {
        const listEmbed = new Discord.MessageEmbed()
            .setColor("#303136")
            .setTitle('**제품 목록**')
            .setDescription('제품이 없습니다.');
        message.channel.send(listEmbed)
    } else {

		var e = 0;
		var array = []
		var source = []
		var hook = 0

		list1
		.forEach(shop => {
					if (shop === "") return;
					array.push(shop)
					
				})
				
	var lastnum = -1
	var k,j,temparray,chunk = 5;
	for (k=0,j=array.length; k<j; k+=chunk) {
	source.push(array.slice(k,k+chunk))
    lastnum ++
}

			message.reply("").then(async function(em1) {

 	var bc = 0;
					var dc = 0;

producea(0, em1)		
			
		
		})

    }
}

module.exports.help = {
    name: "제품목록"
}