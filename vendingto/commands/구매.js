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
	
		if(message.content.startsWith(prefix+"구매")){
        	if(message.guild == null) return;
        	
        	if (!vending[message.author.id]) return makesimembed("가입부터 해주세요.");
        	if(!vending[message.author.id]||vending[message.author.id].state === "die") return makeembed("접근하실 수 없습니다.", "가입하지 않았거나 차단된 사용자입니다.", 1);
        	var nanne1 = message.content.substring(4);
        	var nanne = nanne1.split(" ")
            var whathack = nanne[0];
            var howmanyyoubuy = 0;
            if(nanne[1]){
                if(nanne[1].length > 0){
            if(!Number.isInteger(Number(nanne[1]))) return makesimembed("``"+prefix+"구매 (상품명) (갯수)``순으로 입력해주세요.");
                }
            howmanyyoubuy = Number(nanne[1]);
            }else{
                howmanyyoubuy = 1;
            }
        if(!hack[nanne[0]] || hack[nanne[0]].deleted === "true") return makesimembed("존재하지 않는 상품입니다!");
        if(hack[nanne[0]].amount == 0 || Number(howmanyyoubuy) > Number(hack[nanne[0]].amount)) return makesimembed("재고가 부족합니다!");
          if(Number(vending[sender.id].money) < Number(hack[nanne[0]].dollar)*Number(howmanyyoubuy)) return makesimembed("보유금액이 부족합니다.");
          var code5 = "";
          var code1 = hack[whathack].code;
          
          
          var i = 0;
        var cutting = 0;
        let arrayfucking = []
        hack[whathack].code.forEach(p=>{
            arrayfucking.push(p)
        })

          hack[whathack].code.forEach(codee => {
            if(codee.length <= 0) return;
            i++
            if(i <= Number(howmanyyoubuy)){
                code5 += codee + "\n"
                const idx = arrayfucking.indexOf(codee) 
                if (idx > -1) arrayfucking.splice(idx ,1)
                //cutting = cutting + 1 + codee.length
            }
          })

          

          var errorba = Number(hack[whathack].amount) - howmanyyoubuy
        
                hack[whathack] = { 
                    code : arrayfucking, amount : errorba, dollar: hack[whathack].dollar, deleted:"false"
                };
                fs.writeFile("./data/hack.json", JSON.stringify(hack, null, 2), err => {
                    if (err) throw err;
                });
               var vendingmoneychange = Number(vending[message.author.id].money) - Number(hack[whathack].dollar)*Number(howmanyyoubuy);
                vending[message.author.id] = {
                	 
                        money: vendingmoneychange,
                        topay: vending[message.author.id].topay,
                        topaytype: vending[message.author.id].topaytype,
                        paymuch: vending[message.author.id].paymuch,
                state: "live",
                username: message.author.username

                    };

                    var list1 = hacklist["userlist"].list;


            list1.splice(list1.indexOf(vending[message.author.id].username),1,message.author.username);

            fs.writeFile("./data/list.json", JSON.stringify(hacklist,null,2), err => {
                if (err) throw err;
            });
                    fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
                        if (err) throw err;
                        });
                       var receiptcode = makecode2(18);
           const sibal111 = new Discord.MessageEmbed()
                .setColor('#303136')
                .setTitle(`본 메세지는 영수증입니다.\n**구매 해 주셔서 감사합니다!**`)
              .addField('**> 구매하신 제품**', nanne[0], true)
         
             .addField('**> 갯수**', `${howmanyyoubuy}개`,true)
        
             .addField('**> 잔여 금액**',`${Number(vendingmoneychange).toLocaleString()}원`, true)
             
             .addField('**> 차감 금액**',`${Number(Number(hack[whathack].dollar)*Number(howmanyyoubuy)).toLocaleString()}원`, true)
            // .addField('**> 발급된 코드**',`${code5}`, true)
             .setDescription("영수증 코드 : "+receiptcode)
             //.attachFiles(['../vendingto/image/buy.png']) 	
             //.setImage('attachment://buy.png')              
                .setTimestamp();
            makesimembed("DM으로 상품을 보냈습니다!")

            const buyembed = new Discord.MessageEmbed()
            .setColor('#303136')
            .setAuthor("코드 발급입니다.")
            .setTitle(`**${nanne[0]}**`)
            .setDescription(code5)
            .setImage("https://imgur.com/a/YNyQVqI")


            client.users.cache.get(sender.id).send(sibal111);
            await client.users.cache.get(sender.id).send(buyembed)      
        
        
receipt[receiptcode] = {
                   description: `구매자 : ${sender.username}\n`+`상품 : ${nanne[0]}\n발급 받은 코드 : `+code5+`\n잔여 금액 : ${Number(vendingmoneychange).toLocaleString()}원\n차감 금액 : ${Number(Number(hack[whathack].dollar)*Number(howmanyyoubuy)).toLocaleString()}`     
                    };
                    
                    fs.writeFile("./data/receipt.json", JSON.stringify(receipt, null, 2), err => {
                        if (err) throw err;
                        });
                        
                        if(!charge[sender.id]){
                        	charge[sender.id] = {
                   manybuy: 0, muchbuy: 0
                    };
                        }
                        
 charge[sender.id] = {
               manybuy : charge[sender.id].manybuy + 1, muchbuy: charge[sender.id].muchbuy + Number(Number(hack[whathack].dollar)*Number(howmanyyoubuy))
                    };
                    
                    fs.writeFile("./data/charge.json", JSON.stringify(charge, null, 2), err => {
                        if (err) throw err;
                        });
 
if(setting["server"].buychannelid && client.channels.cache.get(setting["server"].buychannelid)) {

const butlog = new Discord.MessageEmbed() 

        			.setColor("#303136")

.setTitle(`**${sender.username}님,`+" "+nanne[0]+" "+`제품 ${howmanyyoubuy}개 구매 감사합니다!**`)
.setTimestamp();

client.channels.cache.get(setting["server"].buychannelid).send(butlog)
 }
 if(message.guild.roles.cache.find(role => role.name === setting["server"].buyer)){
 	let role = message.guild.roles.cache.find(role => role.name === setting["server"].buyer); 
 	message.member.roles.add(role);
     }
     if(setting["webhook"]){
        if(!client.channels.cache.get(setting["webhook"].channelid)) return;
            
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
            if(errorba <= 10){
        if(errorba <= 5){
                               const mesd2 = new Discord.MessageEmbed() 
                   .setColor("#303136")
                   .setTitle(`**${nanne[0]}제품의 남은 재고 갯수가 5개 이하입니다.**`)
                               
                               webhookClient.send({             username: client.user.username,             avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),             embeds: [mesd2],     })
                               return;
                               }
                               const mesd2 = new Discord.MessageEmbed() 
                   .setColor("#303136")
                   .setTitle(`**${nanne[0]}제품의 남은 재고 갯수가 10개 이하입니다.**`)
                               
                               webhookClient.send({             username: client.user.username,             avatarURL: client.user.displayAvatarURL({format : "png", size : 256}),             embeds: [mesd2],     })
                }
                
                }
            })     
        }
        }

}

module.exports.help = {
    name: "구매"
}