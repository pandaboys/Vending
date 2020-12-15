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
	
		if(message.content.startsWith(prefix+"서버설정")){
			if (message.guild == null) return;
			if(!setting["server"]){
					if (sender.id != adminid) { 
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
		}else {
				var adminidlist10 = setting["server"].admin;
		if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) { 
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
		}
			
		
		var check1 = message.content.substring(6);
		var check = check1.split(" ");
		if( check[0] != "채널" && check[0] !="역할" && check[0] !="계좌" && check[0] != "관리자추가" && check[0] != "관리자삭제" && check[0] != "구매자" && check[0] != "삭제") return makesimembed("존재하지 않는 설정입니다. 설정할 수 있는 건 오직 채널과 역할, 계좌, 삭제입니다.");	
		
		if(!setting["server"]){
				setting["server"] = {
						buychannelid: "", role: "", acc: "", admin: "", buyer: ""
					};
					
			}
		if(check[0] === "채널"){
		if(Number(check[1].length) != 18) return makesimembed("올바르지 않은 채널 ID입니다!");
		if(!client.channels.cache.get(check[1])) return makesimembed("찾을 수 없는 채널입니다.");
			var serverID = message.guild.id
			setting["server"] = {
						buychannelid: check[1], role: setting["server"].role, acc: setting["server"].acc, admin: setting["server"].admin, buyer: setting["server"].buyer
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		makesimembed(client.channels.cache.get(check[1]).name+"(이)가 구매로그 채널로 설정되었습니다!");
		}else if(check[0] === "역할"){
		if(!message.guild.roles.cache.find(role => role.name === message.content.substring(9))) return makesimembed("찾을 수 없는 역할 이름입니다.");
			var serverID = message.guild.id
			setting["server"] = {
						buychannelid: setting["server"].buychannelid, role: message.content.substring(9), acc: setting["server"].acc, admin: setting["server"].admin, buyer : setting["server"].buyer
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**"+message.content.substring(9)+"(이)가 관리 역할로 설정되었습니다!**")
		message.channel.send(mesd11).then(() =>{
		 warning = "false";
		 });
		
		}else if(check[0] === "계좌"){
			var accsave = message.content.substring(9);
			var serverID = message.guild.id
			setting["server"] = {
						buychannelid: setting["server"].buychannelid, role: setting["server"].role, acc: accsave, admin: setting["server"].admin, buyer: setting["server"].buyer
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**``"+accsave+"``(이)가 입금 계좌로 설정되었습니다!**")
		message.channel.send(mesd11).then(() =>{
		 warning = "false";
		 });
		}else if(check[0] === "관리자추가"){
			var admimsave = message.content.substring(12);
			var djwbfi = setting["server"].admin + " " + admimsave;
			var targetuser = message.mentions.members.first();
			if(!targetuser) return;
			if(admimsave.length >= 24) return makesimembed("관리자 아이디 설정은 한 번에 한개만 가능합니다.");
			admimsave = targetuser.user.id;
			var serverID = message.guild.id
			var qpfiwhey = setting["server"].admin
			if(qpfiwhey.includes(admimsave) || adminid === admimsave) return makesimembed("이미 존재하는 관리자자입니다.");
			setting["server"] = {
						buychannelid: setting["server"].buychannelid, role: setting["server"].role, acc: setting["server"].acc, admin: setting["server"].admin + " " + admimsave, buyer: setting["server"].buyer
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
							 //checkpoint
								 .setTitle("**"+targetuser.user.username+"(이)가 관리자에서 추가되었습니다!**");
		message.channel.send(mesd11)
		 var rolev = message.guild.roles.cache.find(role => role.name === setting["server"].role);
		  targetuser.roles.add(rolev);
		}else if(check[0] === "관리자삭제"){
			var nanne = message.content.substring(12);
				var targetuser = message.mentions.members.first();
			if(!targetuser) return;
			if(nanne.length >= 24) return makesimembed("관리자 아이디 설정은 한 번에 한개만 가능합니다.");
			nanne = targetuser.user.id;
			var anne = " " + nanne;
						var list23 = setting["server"].admin
						var list2 = list23.replace(anne, "");
		if(sender.id === nanne) return makesimembed("자기자신을 삭제하실 순 없습니다.");
		if(adminid === nanne) return makesimembed("총관리자를 삭제하실 순 없습니다.");
										  if(!list23.includes(nanne)) return makesimembed("존재하지 않는 관리자입니다.");
										  
			setting["server"] = {
						buychannelid: setting["server"].buychannelid, role: setting["server"].role, acc: setting["server"].acc, admin: list2, buyer: setting["server"].buyer
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**"+targetuser.user.username+"(이)가 관리자에서 삭제되었습니다!**");
		message.channel.send(mesd11)
		 var role = message.guild.roles.cache.find(role => role.name === setting["server"].role);
		  targetuser.roles.remove(role);
		  
		}else if(check[0] === "구매자"){
		if(!message.guild.roles.cache.find(role => role.name === message.content.substring(10))) return makesimembed("찾을 수 없는 역할 이름입니다.");
			var serverID = message.guild.id
			setting["server"] = {
						buychannelid: setting["server"].buychannelid, role: setting["server"].role , acc: setting["server"].acc, admin: setting["server"].admin, buyer : message.content.substring(10)
					};
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**"+message.content.substring(10)+"(이)가 구매자 역할로 설정되었습니다!**")
		message.channel.send(mesd11)
		
		}else if(check[0] === "삭제"){
						
						if(check[1] == "구매자"){
			setting["server"] = {
						buychannelid: setting["server"].buychannelid,
						 role: setting["server"].role ,
						  acc: setting["server"].acc,   
						  admin: setting["server"].admin,
						   buyer : ""
					};
					}else if(check[1] == "채널"){
						setting["server"] = {
						buychannelid: "",
						 role: setting["server"].role ,
						  acc: setting["server"].acc,   
						  admin: setting["server"].admin,
						   buyer : setting["server"].buyer
					};
					}else{
						makesimembed("삭제 가능한 것은 구매자 역할과 구매로그 채널입니다.");
						return;
					}
					
					fs.writeFile("./data/setting.json", JSON.stringify(setting, null, 2), err => {
						if (err) throw err;
		});
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle("**"+check[1]+"(이)가 삭제되었습니다!**")
		message.channel.send(mesd11)
		}
		}

}

module.exports.help = {
    name: "서버설정"
}