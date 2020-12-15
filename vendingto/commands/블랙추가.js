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
	
		if(message.content.startsWith(prefix+"블랙추가")){
			var adminidlist10 = setting["server"].admin;
		if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
		var targetuser = message.mentions.users.first();
		if(!vending[targetuser.id]) return makesimembed("해당 유저는 가입되어있지 않습니다.");
		if(vending[targetuser.id].state !== "die" ){              
							makesimembed(targetuser.username+"님을 블랙리스트에 올렸습니다.")
							client.users.cache.get(targetuser.id).send("**# 안녕하세요. 자판기봇 관리자 ("+message.guild.owner.user.username+"#"+message.guild.owner.user.discriminator+") 입니다. \n오늘부로 "+targetuser.username+"님은 블랙리스트에 [ 올라 ] 자판기봇을 이용하실 수 [ 없습니다. ] 감사합니다 #**");
							
							vending[targetuser.id] = {
								
						state: "die",
						username: vending[targetuser.id].username
						};
						fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
							if (err) throw err;
							
						});
						if(!hacklist["userlist"]){
							hacklist["userlist"] = {
								list:[],
								id: []
							}
						}

						const idx1 = hacklist["userlist"].list.indexOf(vending[targetuser.id].username) 
						if (idx1 > -1) hacklist["userlist"].list.splice(idx1 ,1)
						const idx = hacklist["userlist"].id.indexOf(targetuser.id) 
						if (idx > -1) hacklist["userlist"].id.splice(idx ,1)
						if(charge[message.author.id]){
							if(charge[message.author.id].buycode){
							delete charge[charge[message.author.id].buycode]
						}
							charge[message.author.id].buycode = ""
							
							fs.writeFile("./data/charge.json", JSON.stringify(charge, null, 2), err => {
								if (err) throw err;
								});
						}

						/*
						hacklist["userlist"] = { 
							list: hacklist["userlist"].list + "@#~" + targetuser.username, id: hacklist["userlist"].id + " " + targetuser.id
						};
					 */
					hacklist["userlist"] = {
						list: hacklist["userlist"].list, id: hacklist["userlist"].id
					}

						fs.writeFile("./data/list.json", JSON.stringify(hacklist, null, 2), err => {
							if (err) throw err;
						   
						}); 
						
						}
		}

}

module.exports.help = {
    name: "블랙추가"
}