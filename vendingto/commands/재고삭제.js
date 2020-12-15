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
	
		if(message.content.startsWith(prefix+"재고삭제")){
			if(message.guild === null) return;
			var adminidlist10 = setting["server"].admin;
		if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
		const mesd11 = new Discord.MessageEmbed() 
							.setColor("#303136")
								 .setTitle('**권한이 없습니다.**')
		
		message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
		return;
		}
			var qwerty = message.content.substring(6);
			var qwerty2 = qwerty.split(" ");
			var whathack = qwerty2[0];
			var hackcode = qwerty2[1];
			if(!hack[whathack]||hack[whathack].deleted === "true") return makesimembed("존재하지 않는 제품입니다."); 
			
			var codelist = hack[whathack].code;
			var list22 = codelist
			var jj = 0;
			for (var i = 0; i < Number(list22.length); i++){
			if(list22[i] === hackcode) {
						var jj = 1;
						var ss = list22[i];
				break;
			}else if(list22[i] != hackcode){
				var jj = 0;
				var ss = list22[i];
			}
		}

		if( jj == 1 ){
			//var hackcode11 = " " + hackcode;
			//var codelist11 = hack[whathack].code;
			//var lastcode11 = codelist11.replace(hackcode11 , "");
			const idx = hack[whathack].code.indexOf(hackcode) 
			if (idx > -1) hack[whathack].code.splice(idx ,1)
			const arrayff = hack[whathack].code
			hack[whathack] = { 
							code : arrayff, amount : hack[whathack].amount - 1,dollar: hack[whathack].dollar, deleted:"false"
						};
						fs.writeFile("./data/hack.json", JSON.stringify(hack, null, 2), err => {
							if (err) throw err;
							makesimembed("재고가 정상적으로 삭제되었습니다.");
						});
		}else{
			makesimembed("존재하지 않는 재고입니다.");
		}
		}

}

module.exports.help = {
    name: "재고삭제"
}