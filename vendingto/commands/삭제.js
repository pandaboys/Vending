const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const {promptMessage} = require("../lib/functions.js");
const {getMember,formatDate} = require("../lib/functions.js");
const { adminid, prefix, status, Token, maxmoney, minmoney, setmoney } = require('../lib/set.json');


module.exports.run = async (client, message) => {
	
	if(!message.member.hasPermission('ADMINISTRATOR')) return;
	
	const amount = Number(message.content.substring(prefix.length + 3)) + 1
	
	if(isNaN(amount)) return;
	else if (amount <= 1 || amount > 100) return message.channel.send("1~99 사이의 숫자를 입력해주세요.");
	
	message.channel.bulkDelete(amount, true).then(()=>{
		setTimeout(function(){
			message.channel.send(amount+"개의 메세지를 삭제했습니다.").then(m=>{
				m.delete({timeout : 3000})
			})
		}, 2000)
	})
	
		}
module.exports.help = {
    name: "청소"
}