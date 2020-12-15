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
	
		if(message.content.startsWith(prefix+"초기화")){
        	if(sender.id != adminid){
        		const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle('**오직 총관리자만 초기화가 가능합니다.**')

message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
return;
        	}
        			message.channel.bulkDelete(1, true);
		
		const promptEmbed = new Discord.MessageEmbed()
            .setColor("#303136")
            .setAuthor("데이터를 초기화하면 백업되있던 파일에 없던 내용들은 사라집니다.\n정말로 초기화하겠습니까?");
           	message.channel.send(promptEmbed).then(async msg => {
            
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                message.channel.bulkDelete(1, true);
                
                var bwkf = "{}";
                var done = 0;
                fs.writeFile("./data/discordvending.json", bwkf, err => {
                    if (err) throw err;
                    done = done + 1;                  
                });
                
                fs.writeFile("./data/list.json", bwkf, err => {
                    if (err) throw err;
                    done = done + 1;                                     
                });
                
                fs.writeFile("./data/hack.json", bwkf, err => {
                    if (err) throw err;
                    
                    done = done + 1;                                     
                });
                fs.writeFile("./data/receipt.json", bwkf, err => {
                    if (err) throw err;
   
                    done = done + 1;                                
                });
                fs.writeFile("./data/charge.json", bwkf, err => {
                    if (err) throw err;
 
                    done = done + 1;                                
                });
  fs.writeFile("./data/setting.json", bwkf, err => {
                  if (err) throw err;
                  done = done + 1;               
                  
                   	if(done == 6) { 
                   const mesd1 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle("**모든 파일이 초기화이 완료되었습니다.**");
            	 		message.channel.send(mesd1)
               }else{
               var errdone = 6 - done
               	const mesd1 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle(errdone + "개의 파일이 초기화되지 않았습니다.\n모든 파일들이 정상적으로 있는지 확인해주시기 바랍니다!");
            	 		message.channel.send(mesd1)
               }
                       
                       
              })           

				
            } else if (emoji === "❌") {
                message.channel.bulkDelete(1, true);
               
                
                const mesd11 = new Discord.MessageEmbed() 
        			.setColor("#303136")
            	 		.setTitle('**취소되었습니다.**')

message.channel.send(mesd11).then(message => message.delete({ timeout: 3000, reason: '' }));
return;

}
           
        });
			
        }

}

module.exports.help = {
	name: "초기화"
}