const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const {promptMessage} = require("../lib/functions.js");
const {getMember,formatDate} = require("../lib/functions.js");
const { adminid, prefix, status, Token, maxmoney, minmoney, setmoney } = require('../lib/set.json');

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
			.setTitle("**"+title+"**")
		message.channel.send(mesd);
}

function msgadmin(description){
      	 
	if(setting["server"].admin == null ||setting["server"].admin === ""){
			client.users.cache.get(adminid).send(description);
		return;
	}
	
	client.users.cache.get(adminid).send(description)
	
	var admin1 = setting["server"] .admin;

admin1.split(" ").forEach( admin => {
	
	if(admin === "") return;
	client.users.cache.get(admin).send(description)
	
})

}
        
function makeembed(title, des, color) {
    if(color == "1"){
    const mesd = new Discord.MessageEmbed() 
        		.setColor("#303136")
            	.setTitle("**"+title+"**")
				.setDescription(des);
				
            message.channel.send(mesd);
    }else{
        	const mesd = new Discord.MessageEmbed() 
            	.setColor(color)
            	.setTitle("**"+title+"**")
            	.setDescription(des);
            	 		 	
            message.channel.send(mesd);
        	}
            
        }
	
		if (message.content.startsWith(prefix+"유저정보")) {
			if(message.guild === null) return;
			if(!vending[message.author.id]||vending[message.author.id].state === "die") return makeembed("접근하실 수 없습니다.", "가입하지 않았거나 차단된 사용자입니다.", 1);
			
			if(message.mentions.users.first()){
					var adminidlist10 = setting["server"].admin;
			if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
			const mesd11 = new Discord.MessageEmbed() 
								.setColor("#303136")
									 .setTitle('**권한이 없습니다.**')
			
			message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
			return;
			}
				var targetuser = message.mentions.users.first();
				if(!vending[targetuser.id]||vending[targetuser.id].state === "die") return makeembed("가입하지 않았거나 차단된 사용자입니다.", "", 1);
				if (vending[targetuser.id].topay === "ture" || vending[targetuser.id].topay === "turesend") {
							var sibal123 = "있음"
						} else {
							var sibal123 = "없음"
						}
						
						if(!charge[targetuser.id]){
							charge[targetuser.id] = {
								manybuy: 0, muchbuy: 0
							}
						}
						const sibal111 = new Discord.MessageEmbed()
								.setColor("#303136")
							.setAuthor(`${targetuser.username}님의 정보`)
							.setThumbnail(targetuser.avatarURL)
							.setDescription("보유 금액 : " + Number(vending[targetuser.id].money).toLocaleString() + "원\n최근 요청 : " + sibal123 + "\n요청 금액 : " + Number(vending[targetuser.id].paymuch).toLocaleString() + "원" +"\n총 구매 횟수 : " + charge[targetuser.id].manybuy + "\n총 구매 금액 : " + Number(charge[targetuser.id].muchbuy).toLocaleString() + "원")
							.setTimestamp();
						makesimembed("DM으로 정보를 보냈습니다!")
						client.users.cache.get(sender.id).send(sibal111);
						return;
			}
						if (message.content.substring(5) !== "") return;
						if (!vending[message.author.id]) return makesimembed("가입부터 해주세요.");
			
						if (vending[sender.id].topay === "ture" || vending[sender.id].topay === "turesend") {
							var sibal123 = "있음"
						} else {
							var sibal123 = "없음"
						}
						
						if(!charge[sender.id]){
							charge[sender.id] = {
								manybuy: 0, muchbuy: 0
							}
						}
						
						const sibal111 = new Discord.MessageEmbed()
								.setColor("#303136")
							.setAuthor(`${sender.username}님의 정보`)
							.setThumbnail(sender.avatarURL)
							.setDescription("보유 금액 : " + Number(vending[sender.id].money).toLocaleString() + "원\n최근 요청 : " + sibal123 + "\n요청 금액 : " + Number(vending[sender.id].paymuch).toLocaleString() + "원" + "\n총 구매 횟수 : " + charge[sender.id].manybuy + "\n총 구매 금액 : " + Number(charge[sender.id].muchbuy).toLocaleString() + "원")
							.setTimestamp();
						makesimembed("DM으로 정보를 보냈습니다!")
						client.users.cache.get(sender.id).send(sibal111);
					}

}

module.exports.help = {
    name: "유저정보"
}