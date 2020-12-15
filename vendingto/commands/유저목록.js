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
        
        function producea(a, em){
	if(em.reactions) em.reactions.removeAll();
	var o = 1;		
	var messagelist = ""
var ehwg = source[a].forEach(shop => {
					messagelist += Number(a*10 + o) + " . " +shop + "\n"
								o++
});
				const listEmbed =  new Discord.MessageEmbed()
				.setColor("#303136")
				.setTitle('**유저 목록**')
		.setDescription("──────────────\n" + messagelist + "──────────────")
	
			em.edit(listEmbed);
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
					messagelist += Number(a*10 + o) + " . " +shop + "\n"
								o++
});
				const listEmbed =  new Discord.MessageEmbed()
				.setColor("#303136")
				.setTitle('**유저 목록**')
		.setDescription("──────────────\n" + messagelist + "──────────────")
		em.edit(listEmbed);
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
	
if(message.content.startsWith(prefix+"유저목록")){
	if(message.guild === null) return;
var adminidlist10 = setting["server"].admin;
var adminidlist10 = setting["server"].admin;
if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle('**권한이 없습니다.**')

message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
return;
}

var messagelist = "";


if(!hacklist["userlist"]) {
	hacklist["userlist"] = { 
				list: []
			};
}
var list1 = hacklist["userlist"].list;
var lis2 = hacklist["userlist"].id;
	var i = 0;
	
	if(list1.length <= 0){
		const listEmbed = new Discord.MessageEmbed()
			.setColor("#303136")
.setAuthor('유저 목록')
.setDescription('유저가 없습니다.');	
message.channel.send(listEmbed)
	}else{
				var e = 0;
				var ty = 0;
		var array = []
		var source = []
		var idlist = [];
		var hook = 0

		lis2.forEach(h => {
			if(h.length <= 0) return;
			idlist.push(h)
		})

		list1.forEach(shop => {
					if (shop === "") return;
					if(vending[idlist[ty]].state == "die"){
						ty++;
					}else{
					array.push(shop)
					ty++;
					}
				})
				
var lastnum = -1
var k,j,temparray,chunk = 10;
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

}

module.exports.help = {
    name: "유저목록"
}