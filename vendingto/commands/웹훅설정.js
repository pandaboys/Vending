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
		
		var adminidlist10 = setting["server"].admin;
		if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
	
if(!setting["webhook"]){
	
	if(!setting["server"]) return makesimembed("기초 서버설정하십시오.");
	if(!message.guild.roles.cache.find(role => role.name === setting["server"].role)) return makesimembed("관리자 역할이 없습니다. 다시 설정 부탁드립니다.");
	
	const mesd = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**채널을 생성하고 웹훅을 살정 중입니다...**")
			
		message.channel.send(mesd)
		.then(clear => {
			const adminrole = message.guild.roles.cache.find(role => role.name === setting["server"].role);
			message.guild.channels.create(`웹훅자동설정채널-이름변경가능`, { type: 'text', permissionOverwrites: [{
				id : message.guild.id,
				deny : 0x400,
			},
			{
				id: adminrole.id,
				allow : 0x400,
			},
			]})
			.then(ch => {
				ch.createWebhook(client.user.username, client.user.displayAvatarURL({format : "png", size : 256}))
				.then(webh => {
					setting["webhook"] = {
						hookid : webh.id,
						hooktoken : webh.token,
						channelid : ch.id
					}
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
								if (err) throw err;
								
								const mesd2 = new Discord.MessageEmbed() 
					.setColor("#303136")
					.setTitle("**설정 완료**")
										webh.send({
							 username: client.user.username,
							  avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),
							 embeds: [mesd2], 	
						});
								
							clear.edit(mesd2)
				
							});
				})
			})
		})

	
	
}else{

	var sexsibal = 0;

		if(!client.channels.cache.get(setting["webhook"].channelid)){
			const mesd = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**채널을 생성하고 웹훅을 살정 중입니다...**")
			
		message.channel.send(mesd)
			.then(clear => {

				const adminrole = message.guild.roles.cache.find(role => role.name === setting["server"].role);
		
		message.guild.channels.create(`웹훅자동설정채널-이름변경가능`, { type: 'text', permissionOverwrites: [{
		id : message.guild.id,
		deny : 0x400,
	},
	{
		id: adminrole.id,
		allow : 0x400,
	},
	]})
	.then(ch => {
		ch.createWebhook(client.user.username, client.user.displayAvatarURL({format : "png", size : 256}))
		.then(webh => {
			setting["webhook"] = {
				hookid : webh.id,
				hooktoken : webh.token,
				channelid : ch.id
			}
			fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
						
						const mesd2 = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**설정 완료**")
								webh.send({
			 		username: client.user.username,
				  	avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),
					 embeds: [mesd2], 	
				});
				clear.edit(mesd2)
		});
		})
	})

			})
		
		}else{
			client.channels.cache.get(setting["webhook"].channelid).fetchWebhooks()
			.then(hooks => {
					let found = hooks.find(h => h.name === client.user.username)
					if(!found){
						sexsibal++
					}
				})
	.then(()=>{
	if(sexsibal > 0){
		const mesd = new Discord.MessageEmbed() 
		.setColor("#303136")
		.setTitle("**채널을 생성하고 웹훅을 살정 중입니다...**")
			
		message.channel.send(mesd)
		.then(clear => {

			
		const ch = client.channels.cache.get(setting["webhook"].channelid)

		ch.createWebhook(client.user.username, client.user.displayAvatarURL({format : "png", size : 256}))
		.then(webh => {
			setting["webhook"] = {
				hookid : webh.id,
				hooktoken : webh.token,
				channelid : ch.id
			}
			fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
						
						const mesd2 = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**설정 완료**")
								webh.send({
			 		username: client.user.username,
				  	avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),
					 embeds: [mesd2], 	
				});
				clear.edit(mesd2)
		});
		})

		})

	
		
	}else{
		makesimembed("이미 설정되어있습니다.")
	}
		});
		}

}

}

module.exports.help = {
    name: "웹훅설정"
}