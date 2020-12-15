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
	
		if (message.content.startsWith(prefix+"제품추가")) { 
            var adminidlist10 = setting["server"].admin;
if (sender.id != adminid && !message.member.roles.cache.some(r =>  r.name === setting["server"].role) && !adminidlist10.includes(sender.id)) {  
const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle('**권한이 없습니다.**')

message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
return;
}
            var nanne1 = message.content.substring(6);
            var nanne = nanne1.split(":");
            var hackname = nanne[0];
            var hackmuch = nanne[1]
            if(nanne.includes(" ") || !hackmuch) return makesimembed("``"+prefix+"제품추가 (제품이름):(가격)``순으로 입력하여 추가해주세요! \n띄어쓰기를 제품 이름에는 넣으실 수 없습니다.");
            if(!Number.isInteger(Number(hackmuch))) return makesimembed("올바른 가격을 입력해주세요.");
            if(!hack[nanne[0]] || hack[nanne[0]].deleted === "true") {
                hack[nanne[0]] = { 
                    code : [], amount: 0,dollar: Number(hackmuch),deleted:"false"
                };
                fs.writeFile("./data/hack.json", JSON.stringify(hack, null, 2), err => {
                    if (err) throw err;
                    makesimembed("제품이 정상적으로 추가되었습니다.");
                });
                if(!hacklist["list"]){
                	hacklist["list"] = {
                		list: []
                		}
				}
				
				hacklist["list"].list.push(nanne[0])
              /*hacklist["list"] = { 
                    list: hacklist["list"].list + " " + nanne[0]
                };*/
                fs.writeFile("./data/list.json", JSON.stringify(hacklist, null, 2), err => {
                    if (err) throw err;
         
                }); 
            }else{
                makesimembed("이미 존재하는 제품입니다!");
            }
        }

}

module.exports.help = {
    name: "제품추가"
}