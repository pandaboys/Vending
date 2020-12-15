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
	
		if(message.content.startsWith(prefix+"전체공지")){
			var adminidlist10 = setting["server"].admin;
		if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
		
		var text = message.content.substring(6);
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor("#303136")
				//.setTitle('KR Kaser Shop')
					.setAuthor(message.guild.owner.user.username+"#"+message.guild.owner.user.discriminator
				, message.guild.owner.user.displayAvatarURL(),'', true)
				.setTitle(message.guild.name+'에서 메세지가 전송되었습니다.')
				.setDescription('@everyone\n'+text, true)
				.setTimestamp();
				message.channel.bulkDelete(1, true);
				
				const promptEmbed = new Discord.MessageEmbed()
					.setColor("GREEN")
					.setAuthor(`정말로 디엠을 보내겠습니까? 30초 이내로 선택해주세요.`)
					.setDescription(`내용 : `+text)
				
				message.channel.send(promptEmbed).then(async msg => {
					// Await the reactions and the reaction collector
					const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
		
					// The verification stuffs
					if (emoji === "✅") {
						message.channel.bulkDelete(1, true);
						
						var i = 0;
						
						
			
			
						await message.guild.members.cache.filter(m => !m.user.bot).forEach(member => {
							setTimeout(async function(){
								await i++
								 await member.send(exampleEmbed).catch(()=>{
							 	setTimeout(async function(){
							 							 	await message.channel.send(member.user.username+"님이 봇을 차단하셨습니다.")
							 							 	},100)
															  })
								if(i == message.guild.members.cache.filter(m=>!m.user.bot).length){
									const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**성공적으로 메세지를 보냈습니다.**")
								 .setDescription(i*0.1+"초가 걸림.")
						
						 message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
								}
							 },100)
							 })
							 
							 
						
					} else if (emoji === "❌") {
						message.channel.bulkDelete(1, true);
		
						const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle(`**취소되었습니다.**`)
						message.channel.send(mesd11).then(m => m.delete({ timeout: 3000, reason: '' }));
					}
				});
				
		}

}

module.exports.help = {
    name: "전체공지"
}