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

async function makesimembed(title) {
	const mesd = new Discord.MessageEmbed() 
			.setColor("#303136")
			.setTitle("**"+title+"**")
		return message.channel.send(mesd);
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
        
async function makeembed(title, des, color) {
	let mesd;
    if(color == "1"){
    mesd = new Discord.MessageEmbed() 
        		.setColor("#303136")
            	.setTitle("**"+title+"**")
				.setDescription(des);
    }else{
        	mesd = new Discord.MessageEmbed() 
            	.setColor(color)
            	.setTitle("**"+title+"**")
            	.setDescription(des);
        	}
            return await message.channel.send(mesd);
		}
		var reson = message.content.substring(prefix.length + 3)
		
		if(reson.length <= 0 ) reson = "없음"

		if(reson === "clear" && message.member.hasPermission(['MANAGE_CHANNELS']) && message.channel.name.includes("님_문의-")){
			makeembed("문의 종료 중...", "3초 후 채널이 삭제됩니다.",1)
			setTimeout(()=>{
				message.channel.delete();
			}, 3000)
			
			return;
		}

		let checkha = false
		
		message.guild.channels.cache.forEach(c=>{
			if(c.name.includes(sender.id)||c.name.includes(sender.tag.replace("#",""))) checkha = true;
		})

		if(checkha){
			makesimembed("이미 문의가 되어있습니다.").then(m=>{
				m.delete({timeout : 3000});
			})
		}else{
	
		await makeembed("방을 생성 중입니다...", `문의 내용 : ${reson}`, 1).then(async function(m1){

		
		let fetch_category;

		if(!message.guild.channels.cache.find(c => c.name === "문의" && c.type === "category")){
			fetch_category = await message.guild.channels.create(`문의`, { type: 'category'})
		}else{
			await message.guild.channels.cache.filter(c => c.type === "category").forEach(c => {
				if(c.name == "문의") return fetch_category = c
			})
		}
	
		message.guild.channels.create(`${sender.tag}님_문의-${sender.id}`, { type: 'text', permissionOverwrites: [{
			id : message.guild.id,
			deny : 0x400,
		},
		{
			id: message.author.id,
			allow : 0x400,
		},
		]})
		.then(c=>{
			c.setParent(fetch_category.id)
			const mesd = new Discord.MessageEmbed() 
        		.setColor("#303136")
            	.setTitle("**"+sender.tag+"님의 문의입니다.**")
				.setDescription(`문의 내용 : ${reson}`);
				
            c.send(mesd).then(c1=>{
				const mesd2 = new Discord.MessageEmbed() 
        		.setColor("#303136")
            	.setTitle("**문의 채널이 생성되었습니다.**")
				.setDescription(`채널 : <#${c.id}>`);
				m1.edit(mesd2).then(m3 =>{
					m3.delete({timeout : 3000})
					message.delete();
				})
			})
		})
		
	})
		}
}

module.exports.help = {
    name: "문의"
}