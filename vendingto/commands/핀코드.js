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

function isNumber(s) {
    s += ''; 
    s = s.replace(/^\s*|\s*$/g, ''); 
    if (s == '' || isNaN(s)) return false;
    return true;
  }

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
	
		if (message.content.startsWith(prefix+"핀코드")) {
            if (message.guild !== null) return;
            if(!vending[message.author.id]||vending[message.author.id].state === "die") return;
            if (vending[message.author.id].topay === "turesend") return makesimembed("이미 핀코드를 보낸 상태입니다.");
            if (vending[message.author.id].topaytype === "계좌") return;
            if (vending[message.author.id].topay === "false") return;
            var pincode = message.content.substring(5);
           var codearray = []
           var i = 0;
           var check = false;
           
           if(pincode.includes("/")){
           pincode.split("/").forEach(c => {
           	if(c.length <= 0) return;
           	codearray.push(c)
               i++
               // || Number(c.length) != 19 && Number(c.length) != 21
           	if(!c.includes("-")){
           		check = true
           	}else{
                async function f(){
                var hacking = 0;
                   c.split("-").forEach(sc => {
                       if(!Number.isInteger(Number(sc))) check = true;
                    hacking = hacking + Number(sc.length);
                   })
                     if(await hacking != 19 && await hacking != 21) check = true;
                }
                f();
               }
           })
           if(check == true) return makeembed("🚨올바르지 않은 형식입니다!🚨","``1234-1234-1234-123456``이런 형식으로 ``-``를 포함하여 문화상품권 핀번호를 보내주시기 바랍니다.\n혹은 문화상품권 핀번호가 16 혹은 18자리가 맞는지 확인하여 주시기 바랍니다.", 1);
    }else{
 	i++
 	codearray.push(pincode)
 	if(!pincode.includes("-")) return makeembed("🚨올바르지 않은 형식입니다!🚨","``1234-1234-1234-123456``이런 형식으로 ``-``를 포함하여 문화상품권 핀번호를 보내주시기 바랍니다.\n혹은 문화상품권 핀번호가 16 혹은 18자리가 맞는지 확인하여 주시기 바랍니다.", 1);
    else{
        async function f(){
                var hacking = 0;
                pincode.split("-").forEach(sc => {
                if(!Number.isInteger(Number(sc))) check = true;
                hacking = hacking + Number(sc.length);
                })
                if(await hacking != 19 && await hacking != 21) check = true;
            }
            f();
            if(check == true) return makeembed("🚨올바르지 않은 형식입니다!🚨","``1234-1234-1234-123456``이런 형식으로 ``-``를 포함하여 문화상품권 핀번호를 보내주시기 바랍니다.\n혹은 문화상품권 핀번호가 16 혹은 18자리가 맞는지 확인하여 주시기 바랍니다.", 1);
    }
}
 
 let messagecode = "";
 var any = true;
 
 codearray.forEach(c => {
 	if(any == true){
 	messagecode += c 
 	any = false
 	}else{
 		messagecode += "\n" + c 
 	}
 })
 
 const codelist = new Discord.MessageEmbed()            
        			.setColor("#303136") 
         .setTitle(`**핀코드 목록**`)
         .setDescription(`${messagecode}`)
         .setFooter(`신청한 핀코드 ${i}개`)
 
          const sibakaser = new Discord.MessageEmbed()            
        			.setColor("#303136") 
               .setDescription("보내실 핀코드가 맞으시면 ✅를 눌러주시고, 만약 코드가 틀렸다면 ❌를 눌러주세요.");
 message.channel.send(codelist).then(async msg1 =>  
{          message.channel.send(sibakaser).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
            	msg.delete();
				vending[message.author.id] = {
	 
                money: vending[message.author.id].money,
                topay: "turesend",
                topaytype: vending[message.author.id].topaytype,
                paymuch: vending[message.author.id].paymuch,
                state: "live",
                username: vending[message.author.id].username

            };
            fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
                if (err) throw err;
                 //client.users.cache.get(message.author.id).send
                 makeembed("성공적으로 요청되었습니다", "충전되기까지는 최대 8시간이 소요됩니다. 환불 문의는 관리자에게 문의주세요. ", 1)

          var chargecode = makecode2(10);
          if(!charge[message.author.id]){
            charge[message.author.id] = {
                manybuy: 0,
                muchbuy: 0
            }
        }

          charge[message.author.id].buycode = chargecode
          charge[chargecode] = {
            buyerid : message.author.id
        }
                    
                    fs.writeFile("./data/charge.json", JSON.stringify(charge, null, 2), err => {
                        if (err) throw err;
                        });       
               const dbwuwbbc = new Discord.MessageEmbed()
                                	.setColor("#303136")
                                .setTitle(`**✅ㅣ ${message.author.username}님의 ${Number(vending[message.author.id].paymuch).toLocaleString()}원 문화상품권 충전이 들어왔습니다.**`);
                                
                                const wmfhwhwb = new Discord.MessageEmbed()
                                	.setColor("#303136")
                                .setTitle(`**핀코드 목록**`)
                                .setDescription(`${messagecode}`)
         .setFooter(`신청한 핀코드 ${i}개`)
                                if(setting["webhook"]){
                                    if(!client.channels.cache.get(setting["webhook"].channelid)){
                                        msgadmin(dbwuwbbc);
                                        msgadmin(wmfhwhwb)
                                    }else{
                                    var check = false;
                                        client.channels.cache.get(setting["webhook"].channelid).fetchWebhooks()
                                        .then(hooks => {
                                                let found = hooks.find(h => h.name === client.user.username)
                                                if(!found){
                                                    check = true;
                                                }
                                            })
                                        .then(()=>{
                                            if(check == false){             
                                        const webhookClient = new Discord.WebhookClient(setting["webhook"].hookid, setting["webhook"].hooktoken)
                                                        webhookClient.send({            
                                                            username: client.user.username,             
                                                            avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),             
                                                            embeds: [dbwuwbbc],     
                                                            })
                                                            
                                                            webhookClient.send({            
                                                            username: client.user.username,             
                                                            avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),             
                                                            embeds: [wmfhwhwb],     
                                                            })
                                            }else{
                                                msgadmin(dbwuwbbc);
                                                msgadmin(wmfhwhwb)
                                            }
                                        }) 
                                    }    
                                    }  
                
                                        
                        const chageembed = new Discord.MessageEmbed()
                                .setColor("#303136")
                                .setTitle(message.author.username+'**님의 충전 고유 코드**')                              
                                .setDescription(chargecode)
                                .setFooter("복사가 가능합니다.");
                                if(setting["webhook"]){
                                    if(!client.channels.cache.get(setting["webhook"].channelid)){
                                        msgadmin(chageembed);
                                    }else{
                                    var check = false;
                                        client.channels.cache.get(setting["webhook"].channelid).fetchWebhooks()
                                        .then(hooks => {
                                                let found = hooks.find(h => h.name === client.user.username)
                                                if(!found){
                                                    check = true;
                                                }
                                            })
                                        .then(()=>{
                                            if(check == false){             
                                        const webhookClient = new Discord.WebhookClient(setting["webhook"].hookid, setting["webhook"].hooktoken)
                                                        webhookClient.send({            
                                                            username: client.user.username,             
                                                            avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),             
                                                            embeds: [chageembed],     
                                                            })
                                            }else{
                                                msgadmin(chageembed);
                                            }
                                        })  
                                    }   
                                    }  
                                                       
                    
            });
				
            } else if (emoji === "❌") {
            	msg1.delete();
                msg.delete();

                const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle(`**취소되었습니다.**`)
                message.channel.send(mesd11).then(m => m.delete({ timeout:3000}));
            }
                
        });
        });
        }

}

module.exports.help = {
    name: "핀코드"
}