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
	
		if (message.content.startsWith(prefix+"충전신청")) {
            if(message.guild === null) return;
        	
            var vending1 = message.content.substring(6);
            var nanne = vending1.split(" ");
            var paytype = nanne[0];
            var howmuch = nanne[1];

            if (!Number.isInteger(Number(howmuch))) return makeembed("충전 신청은 이렇게 해주세요!", "예시 (계좌) : ``"+prefix+"충전신청 계좌 10000``\n예시 (문상) : ``"+prefix+"충전신청 문상 10000``", "#B9F384");
                        if(Number(howmuch) > Number(maxmoney) || Number(howmuch) < Number(minmoney)) return makeembed("충전은 최대 "+ Number(maxmoney).toLocaleString() +"원, 최소 "+ Number(minmoney).toLocaleString() +"원 이상 가능해요!", "", 1);
                        if(Number(howmuch) % Number(setmoney) != 0) return makeembed(Number(setmoney).toLocaleString()+"원 단위로 충전신청이 가능합니다.", "", 1);
            if (!vending[message.author.id]) {
                makesimembed("가입부터 해주세요.")
            } else {
            	if(!vending[message.author.id]||vending[message.author.id].state === "die") return makeembed("접근하실 수 없습니다.", "가입하지 않았거나 차단된 사용자입니다.", 1);
                if (vending[message.author.id].topay === "ture" || vending[message.author.id].topay === "turesend") return makeembed("🚨 충전 신청 불가 🚨", "기존에 이미 충전신청을 하셨습니다.\n기존 신청이 수락되어야 정상적으로 추가 충전이 가능합니다!", 1)
                if (paytype === "문상") {
                    vending[message.author.id] = {
                    	 
                        money: vending[message.author.id].money,
                        topay: "ture",
                        topaytype: paytype,
                        paymuch: howmuch,
                        state: "live",
                username: vending[message.author.id].username

                    };
                    fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
                        if (err) throw err;
                        
                        const pincodeed = new Discord.MessageEmbed() 
                        .setColor("#303136")
            	 		.setTitle("**문화상품권 충전 방법입니다.**")
            	 		 	.setDescription("충전 요청하신 금액은 "+Number(howmuch).toLocaleString()+"원입니다.\n``"+prefix+"핀코드 (문상 핀번호)/(문상 핀번호)``로 보내세요.\n장난으로 핀코드를 보낼 시 블랙리스트가 될 수 있습니다.")
                                .setFooter("예시 : "+prefix+"핀코드 1234-1234-1234-1234/1234-1234-1234-123456")        
                              message.author.send(pincodeed);
       
                    makeembed("✅ㅣ신청 완료", "충전 신청이 정상적으로 전송되었습니다.\n``"+paytype+"``을(를) 통한 충전 방법을 DM으로 보냈습니다!", "3EAF0E");
                    
                    });                   
                } else if (paytype === "계좌") {
                    vending[message.author.id] = {
                    	 
                        money: vending[message.author.id].money,
                        topay: "ture",
                        topaytype: paytype,
                        paymuch: howmuch,
                state: "live",
                username: vending[message.author.id].username

                    };
                    fs.writeFile("./data/discordvending.json", JSON.stringify(vending, null, 2), err => {
                        if (err) throw err;
                        var coding = makecode(4);
                        
                            
             const exampleEmbed = new Discord.MessageEmbed()
                                	.setColor("#303136")
                                .setAuthor('입금 신청이 접수되었습니다!')
                                .setDescription('입금 계좌 : '+ setting["server"].acc +'\n입금자명 : ' + coding + '\n입금 금액 : ' + Number(howmuch).toLocaleString() + '원')

                                .setTimestamp();
                          const meWsd = new Discord.MessageEmbed() 
                        .setColor("#303136") 
            	 		.setTitle("**주의사항**")
            	 		 	.setDescription("정확한 금액과, 아래 나와있는 입금자명을 그대로 적으신뒤 돈을 입금해주세요! 이는 수동으로 체크하여 충전해드리는거기에 시간이 걸립니다."); 
            	 		 	 client.users.cache.get(message.author.id).send(meWsd)
                            client.users.cache.get(message.author.id).send(exampleEmbed);

                    var chargecode = makecode2(10);

                    if(!charge[message.author.id]){
                        charge[message.author.id] = {
                            manybuy: 0,
                            muchbuy: 0
                        }
                    }

                    charge[chargecode] = {
                        buyerid : message.author.id
                    }
                   charge[message.author.id].buycode = chargecode
                   //buyerid: message.author.id 
                    
                    
                    fs.writeFile("./data/charge.json", JSON.stringify(charge, null, 2), err => {
                        if (err) throw err;
                        });
                        
                        const meuwvf = new Discord.MessageEmbed()
                                .setColor("#303136")
                                .setTitle(`**${message.author.username}님의 ${Number(howmuch).toLocaleString()}원의 계좌 충전이 들어왔습니다. 입금명은 ${coding}입니다.**`)      
                                
                                if(setting["webhook"]){
                                    if(!client.channels.cache.get(setting["webhook"].channelid)){
                                    msgadmin(meuwvf);
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
                                                               embeds: [meuwvf],     
                                                            })
                                            }else{
                                                msgadmin(meuwvf);
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
                    makeembed("✅ㅣ신청 완료", "충전 신청이 정상적으로 전송되었습니다.\n``"+paytype+"``을(를) 통한 충전 방법을 DM으로 보냈습니다!", "3EAF0E");

                }
            }

        }

}

module.exports.help = {
	name: "충전신청"
}