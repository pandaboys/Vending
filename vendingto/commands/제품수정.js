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
	
		if (message.content.startsWith(prefix+"제품수정")) { 
            var adminidlist10 = setting["server"].admin;
if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle('**권한이 없습니다.**')

message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
return;
}
			if(message.content.substring(prefix.length + 5).split(" ")[0].length <= 0 ) return makesimembed("제품수정을 원하시면 " + prefix + "제품수정 (가격 or 이름) (바꿀려는 제품) (바뀌는 이름 or 가격) 순으로 입력하세요");
			const producewhat = message.content.substring(prefix.length + 5).split(" ")[0]
			if(producewhat !== "가격" && producewhat !== "이름") return makesimembed("제품수정을 원하시면 " + prefix + "제품수정 (가격 or 이름) (바꿀려는 제품) (바뀌는 이름 or 가격) 순으로 입력하세요");
			const producename = message.content.substring(prefix.length + 5).split(" ")[1]
			const change = message.content.substring(prefix.length + 5).split(" ")[2]

			if(!hack[producename] || hack[producename].deleted === "true") {
				makesimembed("해당 제품은 삭제되었거나 존재하지 않습니다.")
				return;
			}

			if(producewhat === "가격" && !Number.isInteger(Number(change))) return makesimembed(change + "올바른 가격을 입력해주세요.");
			if(producewhat === "가격"){
				const orignal = hack[producename].dollar

				hack[producename] = { 
					code : hack[producename].code, amount: hack[producename].amount,dollar: Number(change) ,deleted: hack[producename].delete
				};
				fs.writeFile("./data/hack.json", JSON.stringify(hack,null,2), err => {
                    if (err) throw err;
                });
				makesimembed(`${producename} 제품의 가격이 ${Number(change).toLocaleString()}원으로 수정되었습니다. 기존 가격은 ${Number(orignal).toLocaleString()}원입니다.`)
			}else if(producewhat === "이름"){

				if(hack[change]) return makesimembed("이미 존재하는 제품입니다.")

				const idx = hacklist["list"].list.indexOf(producename) 
				if (idx > -1) hacklist["list"].list.splice(idx ,1)
				hacklist["list"].list.push(change)

				//hacklist["list"] = { 
                 //   list: hacklist["list"].list.replace(" " + producename, " " + change)
                //};

				hack[change] = { 
					code : hack[producename].code, amount: hack[producename].amount,dollar: hack[producename].dollar ,deleted: "false"
				};
				setTimeout(function(){
					delete hack[producename]
				},50)
				setTimeout(function(){
					fs.writeFile("./data/list.json", JSON.stringify(hacklist, null, 2), err => {
						if (err) throw err;
			 
					}); 
				fs.writeFile("./data/hack.json", JSON.stringify(hack,null,2), err => {
					if (err) throw err;
					makesimembed(`${producename} 제품의 이름이 ${change}(으)로 수정되었습니다.`)
				});
				},50)
				
			}

          
        }

}

module.exports.help = {
    name: "제품수정"
}