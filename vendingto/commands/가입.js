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
	
		if (message.content === prefix+"가입") {
        	if(message.guild === null) return;
        	
            if (!vending[message.author.id]) {
                vending[message.author.id] = {
                	 
                    money: 0,  
                    topay: "false",
                topaytype: "0",
                paymuch: "0",
                state: "live",
                username: message.author.username 
                
                };
                fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
                    if (err) throw err;
                    
                });
                if(!hacklist["userlist"]){
                	
                hacklist["userlist"] = { 
                    list: [], id: []
                                };
                }

                hacklist["userlist"].list.push(sender.username)
                hacklist["userlist"].id.push(sender.id)

                /*hacklist["userlist"] = { 
                    list: hacklist["userlist"].list+"@#~"+sender.username, id:hacklist["userlist"].id+" "+sender.id
                };*/
                fs.writeFile("./data/list.json", JSON.stringify(hacklist, null, 2), err => {
                    if (err) throw err;
         makeembed("🎉 환영합니다! 🎉", "성공적으로 가입이 완료되었습니다!\n즐거운 하루 보내세요~^^", 1)
                }); 
            } else {
               if(!vending[message.author.id]||vending[message.author.id].state === "die") return makeembed("접근하실 수 없습니다.", "가입하지 않았거나 차단된 사용자입니다.", 1);
               makeembed("❌ Warning ❌", sender.username+"님은 이미 가입되어있습니다!", 1) 
            }
        }

}

module.exports.help = {
    name: "가입"
}