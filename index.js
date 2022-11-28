// ┄┄══════✽SOURCE CODE✽══════┄┄

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send(`${new Date()}`);
});

app.listen(3000, () => {
	console.log('DEv : Tex');
});

const Discord = require('discord.js');
require('discord-reply')
const client = new Discord.Client();
client.login("OTYwNTAwNjI4NjkyNTQ1NjQ3.Gtz16H.G84Ni7JgHGxFGrJKs5nlXo2ihY4C69A9G39JRI")
const probot = require('probot-tax')
const disbut = require('discord-buttons')
const Captcha = require('@haileybot/captcha-generator')

const config = require('./config.json')

const prefix = config.prefix;
const devs = config.devs;


// ┄┄══════✽DATABASE CODE✽══════┄┄

const Database = require('st.db')
const db = new Database('./Database/info.json')
const security = new Database('./Database/security')
const mutes = new Database('./Database/mutes')
const superusers = new Database('./Database/super-users')

// ┄┄══════✽READY CODE✽══════┄┄

client.on('ready', async message => {
  await client.user.setStatus('idle');
	await client.user.setActivity(`Onis $`, { type: 'PLAYING' , url: "https://www.twitch.tv/amrhany73" });
  await console.log(`Bot Logging With : ${client.user.tag}`);
  client.channels.cache.get("").send('0')
});


// ┄┄══════✽BOT COMMANDS✽══════┄┄

client.on("message", message => {
  if (message.content.startsWith(prefix + 'set-avatar')) {
    if (!devs.includes(message.author.id)) return message.channel.send('❌ | Only Owners Can Use This Command !')
    let args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send(`Example : ${prefix}set-avatar [Avatar Link]`)
    client.user.setAvatar(args)
   message.channel.send('✅ | Done Setting Avatar')
  }
})


client.on("message", message => {
  if (message.content.startsWith(prefix + 'set-name')) {
    if (!devs.includes(message.author.id)) return message.channel.send('❌ | Only Owners Can Use This Command !')
    let args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.channel.send(`Example : ${prefix}set-name [New Username]`)
    client.user.setUsername(args)
   message.channel.send(`✅ | Done Setting Username To : ${args}`)
  }
})


client.on("message", message => {
  if (message.content.startsWith(prefix + 'sell')) {
     if (message.channel.type === 'dm') return
    let args = message.content.split(" ").slice(1).join(" ")
    let channels = message.guild.channels.cache.filter(hh => hh.name.startsWith('〢੭・'))
    let everyone = message.guild.roles.cache.find(jj => jj.id === '1040555458089455707')
    if (args === 'off') {
      channels.forEach(ch => ch.updateOverwrite(everyone , {
        VIEW_CHANNEL: false
      }))

      message.lineReplyNoMention(`Done Hide This Channels :\n${channels.map(j => `- <#${j.id}>`).join("\n")}`)

      let gg = db.get(`SYSLOG_${message.guild.id}`)
      if (!gg) return ;
      let ch = client.channels.cache.get(`${gg}`)

      let embed = new Discord.MessageEmbed()
      .setTitle('ROOMS HIDE')
      .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
      .addField(`By :`, message.author , false)
      .addField(`Action :`, `Hide All Sell Rooms !`)
      .setFooter(`[!] To Show Rooms Use : ${prefix}Sell off`)
            .setThumbnail(`https://uxwing.com/wp-content/themes/uxwing/download/21-medical-science-lab/emergency.png`)

      ch.send(embed)
    }

    if (args === 'on') {
      channels.forEach(ch => ch.updateOverwrite(everyone , {
        VIEW_CHANNEL: true
      }))

      message.lineReplyNoMention(`Done Show This Channels :\n${channels.map(j => `- <#${j.id}>`).join("\n")}`)

      let gg = db.get(`SYSLOG_${message.guild.id}`)
      if (!gg) return ;
      let ch = client.channels.cache.get(`${gg}`)

      let embed = new Discord.MessageEmbed()
      .setTitle('ROOMS SHOW')
      .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
      .addField(`By :`, message.author , false)
      .addField(`Action :`, `Show All Sell Rooms !`)
      .setFooter(`[!] To Hide Rooms Use : ${prefix}Sell on`)
      .setThumbnail(`https://uxwing.com/wp-content/themes/uxwing/download/21-medical-science-lab/emergency.png`)

      ch.send(embed)
    }

    if (args === 'del') {
      
      channels.forEach(mm => {
       mm.send('DELETE[DELETE]')
      })

      message.channel.send(`Done Clear Messages For :\n${channels.map(j => `- <#${j.id}>`).join("\n")}`)

      let gg = db.get(`SYSLOG_${message.guild.id}`)
      if (!gg) return ;
      let ch = client.channels.cache.get(`${gg}`)

      let embed = new Discord.MessageEmbed()
      .setTitle('ROOMS CLEAR')
      .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
      .addField(`By :`, message.author , false)
      .addField(`Action :`, `Clear All Sell Rooms !`)
      .setFooter(message.guild.name , message.guild.iconURL({dynmaic: true}))
      .setTimestamp()
      .setThumbnail(`https://uxwing.com/wp-content/themes/uxwing/download/21-medical-science-lab/emergency.png`)

      ch.send(embed)
    }

  };

  if (message.content === 'DELETE[DELETE]') {
    if (message.channel.type === 'dm') return
    if (message.author.id !== client.user.id) return ;
    message.channel.messages.fetch().then(messages => {
      message.channel.bulkDelete(messages , {limit: 0})
    })
  }
});


client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'set-msglog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let cc = message.content.split(" ").slice(1).join(" ")
    let mm = new Discord.MessageEmbed()
    .setDescription(`Ex. : ${prefix}set-msglog [Log Room ID]`)
    .setColor("RED")
    if (!cc) return message.channel.send(mm) 
    db.set(`MSGLOG_${message.guild.id}`, cc)
    message.channel.send(`✅ | Messages Log Set To <#${cc}>`)
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'set-systemlog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let cc = message.content.split(" ").slice(1).join(" ")
    let mm = new Discord.MessageEmbed()
    .setDescription(`Ex. : ${prefix}set-systemlog [Log Room ID]`)
    .setColor("RED")
    if (!cc) return message.channel.send(mm) 
    db.set(`SYSLOG_${message.guild.id}`, cc)
    message.channel.send(`✅ | System Log Set To <#${cc}>`)
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'del-systemlog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let args = message.content.split(" ").slice(1).join(" ")
    db.delete(`SYSLOG_${message.guild.id}`)
    message.channel.send('System Log Deleted !')
  }
})


client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'del-msglog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let args = message.content.split(" ").slice(1).join(" ")
    db.delete(`MSGLOG_${message.guild.id}`)
    message.channel.send('Messages Log Deleted !')
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'set-channelslog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let cc = message.content.split(" ").slice(1).join(" ")
    let mm = new Discord.MessageEmbed()
    .setDescription(`Ex. : ${prefix}set-channelslog [Log Room ID]`)
    .setColor("RED")
    if (!cc) return message.channel.send(mm) 
    db.set(`CHLOGS_${message.guild.id}`, cc)
    message.channel.send(`✅ | Channels Log Set To <#${cc}>`)
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'del-channelslog')) {
    if(!devs.includes(message.author.id)) return message.reply('❌ | Only Owners Can Use This Command !')
    let args = message.content.split(" ").slice(1).join(" ")
    db.delete(`CHLOGS_${message.guild.id}`)
    message.channel.send('Channels Log Deleted !')
  }
})


      

client.on("message", message => {
  if (message.channel.type === 'dm') {
    const developer = client.users.cache.find(y => y.id === '758689272504516659')
    if (message.author.bot) return
    if (message.content.length == 0) return
    let embed = new Discord.MessageEmbed()
    .setTitle('NEW MESSAGE IN DM')
    .setColor("RED")
    .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
    .setFooter(client.user.username , client.user.avatarURL({dynamic: true}))
    .setTimestamp()
    .addField(`Message :`, ` \`\`\`\n- ${message.content} \`\`\` `)
    developer.send(`**Message By : ${message.author}**\n**ID : ${message.author.id}**`,embed)
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content.startsWith(prefix + 'set-line')) {
    if (!devs.includes(message.author.id)) return message.channel.send("❌ | Only Owners Can Use This Command !")
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('**You Don\'t Have Permission : \`ADMINISTRATOR\`**')
    let args = message.content.split(" ").slice(1).join(" ")

    let s = new Discord.MessageEmbed()
      .setDescription(`❌ | **Usage : ${prefix}set-line [Line Link]**`)
      .setColor("RED")
    if (!args) return message.channel.send(s)
    
    let t = new Discord.MessageEmbed()
    .setDescription(`**❌ | This Line Has Already Setup !**`)
    .setColor("RED")
    if (args === db.get(`LINE_${message.guild.id}`)) return message.channel.send(t)
    
    db.set(`LINE_${message.guild.id}`, args)

    let r = new Discord.MessageEmbed()
    .setDescription(`✅ | Line Set Successfully`)
    .setColor("BLUE")

    message.channel.send(r)
  
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content === prefix + 'del-line') {
     if (!devs.includes(message.author.id)) return message.channel.send("❌ | Only Owners Can Use This Command !")
  if (!db.get(`LINE_${message.guild.id}`)) return message.channel.send("No line installed ! ")
  db.delete(`LINE_${message.guild.id}`) 
  message.channel.send('Line Successfully Deleted !')
    
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'avatar')) {
     if (message.channel.type === 'dm') return ;
    if (message.content == prefix + 'avatar') return
    var args = message.content.split(" ").slice(1).join(" ")
    if (args === 'server') return
    var user = message.mentions.users.first()
    if (!user) return message.channel.send('Cannot Find User')
    
    let avatar = user.avatarURL({size: 4096 , dynamic: true , format: "png"})
 
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.tag , user.avatarURL({dynamic: true}))
    .setImage(`${avatar}`)
    .setDescription(`**[Avatar Link](${avatar})**`)
    .setFooter(`Requested By : ${message.author.tag}` , message.author.avatarURL({dynamic: true}))
    message.channel.send(embed)
  }
})

client.on("message", message => {
  if (message.content === prefix + 'avatar') {
     if (message.channel.type === 'dm') return ;
    var user = message.author
    var args = message.content.split(" ")
    let avatar = user.avatarURL({size: 4096 , dynamic: true , format: "png"})
 
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.tag , user.avatarURL({dynamic: true}))
    .setImage(`${avatar}`)
    .setDescription(`**[Avatar Link](${avatar})**`)
    .setFooter(`Requested By : ${message.author.tag}` , message.author.avatarURL({dynamic: true}))
    message.channel.send(embed)
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'avatar')) {
    if (message.content === prefix + 'avatar') return
    
    var args = message.content.split(" ").slice(1).join(" ")
    if (args != 'server') return ;
    let avatar = message.guild.iconURL({size: 4096 , dynamic: true , format: "png"})
 
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name , message.guild.iconURL({dynamic: true}))
    .setImage(`${avatar}`)
    .setDescription(`**[Avatar Link](${avatar})**`)
    .setFooter(`Requested By : ${message.author.tag}` , message.author.avatarURL({dynamic: true}))
    message.channel.send(embed)
  }
})

client.on("guildMemberAdd", (member) => {
  if (!security.has(`ANTIBOTS_${member.guild.id}`)) return
  if (member.user.bot) {
    member.ban({reason: 'Antibots Is Enabled !'})
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'superuser')) {
     if (message.channel.type === 'dm') return ;
    if (!devs.includes(message.author.id)) return
    let user = message.mentions.users.first();
    let args = message.content.split(" ")
    .slice(1).join(" ")
    if (!args) return message.lineReplyNoMention('Mention A user')
    if (!user) return message.lineReplyNoMention('Cannot Find User !')
    let ge = superusers.get(`SUPERUSERS_${message.guild.id}`)
    
    if (!superusers.has(`SUPERUSERS_${message.guild.id}`)) {
      superusers.set(`SUPERUSERS_${message.guild.id}`, [])
    }

    if (ge.includes(user.id)) { 
      message.lineReplyNoMention('This User Is Already A superuser')
      return
    }

    superusers.push(`SUPERUSERS_${message.guild.id}`, user.id)
    message.lineReplyNoMention(`Successfully Make ${user} As A Superuser !`)
  }
})


client.on("message", message => {
  if (message.content.startsWith(prefix + 'remove-superuser')) {
     if (message.channel.type === 'dm') return ;
    if (!devs.includes(message.author.id)) return ;
    let se = message.mentions.users.first()
    let args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.lineReplyNoMention('Mention A user')
    if (!se) return message.lineReplyNoMention('Cannot Find User !')
    if (!superusers.get(`SUPERUSERS_${message.guild.id}`).includes(se.id)) return message.lineReplyNoMention('This user is not a superuser !')
    superusers.unpush(`SUPERUSERS_${message.guild.id}`, se.id)
    message.lineReplyNoMention(`Successfully Removed ${se} From Superusers !`)
  }
})

client.on("channelCreate", async (channel) => {
  const audit = (await channel.guild.fetchAuditLogs()).entries.first();
  if (!security.has(`ANTICHANNELS_${channel.guild.id}`)) return ;
  if (!superusers.has(`SUPERUSERS_${channel.guild.id}`)) {
    superusers.set(`SUPERUSERS_${channel.guild.id}`, [])
  }
  if (superusers.get(`SUPERUSERS_${channel.guild.id}`).includes(audit.executor.id)) return ;
  if (!channel.guild) return ;
  if (audit.action === 'CHANNEL_CREATE') {
   if (devs.includes(audit.executor.id)) return
   channel.delete()
   channel.guild.member(audit.executor.id).kick({reason: 'Creating Channels'})

   

  }
})

client.on("channelCreate", async (channel) => {
    let logdb = db.get(`CHLOGS_${channel.guild.id}`)
    let logch = client.channels.cache.get(`${logdb}`)
    if (!logdb) return ;
    if (!logch) return ;
    
    const audit = (await channel.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'CHANNEL_CREATE') {

    let embed = new Discord.MessageEmbed()
   .setTitle('🏠 CHANNEL CREATED')
   .setAuthor(audit.executor.tag , audit.executor.avatarURL({dynamic: true}))
   .setFooter(channel.guild.name , channel.guild.iconURL({dynamic: true}))
   .setTimestamp()
   .addField(`Channel Name :`, `\`\`\`\n- ${channel.name}\`\`\``, false)
   .addField(`Channel :`, `<#${channel.id}>`, true)
   .addField(`Created By :`, `<@${audit.executor.id}>`, true)

   logch.send(embed)
  }
})

client.on("channelDelete", async (channel) => {
  const audit = (await channel.guild.fetchAuditLogs()).entries.first();
  if (!security.has(`ANTICHANNELS_${channel.guild.id}`)) return ;
  if (!superusers.has(`SUPERUSERS_${channel.guild.id}`)) {
    superusers.set(`SUPERUSERS_${channel.guild.id}`, [])
  }
  if (superusers.get(`SUPERUSERS_${channel.guild.id}`).includes(audit.executor.id)) return ;
  if (!channel.guild) return ;
  if (audit.action === 'CHANNEL_DELETE') {
   if (devs.includes(audit.executor.id)) return
   channel.guild.member(audit.executor.id).kick({reason: 'Deleting Channels'})
  }
})


client.on("channelDelete", async (channel) => {
    let logdb = db.get(`CHLOGS_${channel.guild.id}`)
    let logch = client.channels.cache.get(`${logdb}`)
    if (!logdb) return ;
    if (!logch) return ;
    
    const audit = (await channel.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'CHANNEL_DELETE') {

    let embed = new Discord.MessageEmbed()
   .setTitle('🏠 CHANNEL DELETED')
   .setAuthor(audit.executor.tag , audit.executor.avatarURL({dynamic: true}))
   .setFooter(channel.guild.name , channel.guild.iconURL({dynamic: true}))
   .setTimestamp()
   .addField(`Channel Name :`, `\`\`\`\n- ${channel.name}\`\`\``, false)
   .addField(`Deleted By :`, `<@${audit.executor.id}>`, true)

   logch.send(embed)
  }
})


client.on("message", message => {
  if (message.content === prefix + 'server') {
     if (message.channel.type === 'dm') return ;
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You Don\'t Have Permission : ` ADMINISTRATOR `')
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name , message.guild.iconURL({dynamic: true}))
    .addField(`🆔 Server ID :`, message.guild.id , true)
    .addField(`📆 Created On :`, `${message.guild.createdAt.toLocaleDateString()}` , true)
    .addField(`👑 Owner :` , `<@${message.guild.ownerID}>` , true)
    .addField(`👥 Members :`, `**${message.guild.memberCount}** Member\n**${message.guild.premiumSubscriptionCount}** Boost `, true)
    .addField(`💬 Channels :` , `**${message.guild.channels.cache.size}** Channel`, true)
    .addField(`🌍 Other :`, `**Region** : ${message.guild.region}`, true)
    .addField(`🔐 Roles ( ${message.guild.roles.cache.size} )` , `[!] To See Help Menu Type : **${prefix}help**`)
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setColor("BLACK")
    message.lineReplyNoMention(embed)
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'addrole')) {
     if (message.channel.type === 'dm') return ;
    if (!message.member.hasPermission('ADMINISTRATOR')) return 
    let m7md = message.content.split(" ").slice(1).join(" ")
    
    message.guild.roles.create({data : {
      name : `${m7md}`
    }})
    message.channel.send(` \`${m7md}\` Created Successfully`)
  }
})

client.on("message", message => {
  if (message.channel.type == 'dm') return
  if (message.content === 'خط') {
    if (!db.get(`LINE_${message.guild.id}`)) return message.channel.send("❌ | Line Need To Setup !!  ")
    message.channel.send(db.get(`LINE_${message.guild.id}`))
    message.delete()
  }
})

client.on("message", message => {
    if (message.content.startsWith(prefix + 'tax')) {
       if (message.channel.type === 'dm') return ;
        if (message.author.bot) return ;
        let args = message.content.split(" ").slice(1).join(" ")
        
        if (!args) return message.reply('Type A Number Calculate Tax').then(msg => {
            msg.delete( {timeout: 8000} )
        })
        if (args < 2) return message.channel.send('Type A Number > 1')
        let e = new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/832632580192075818/866722697178644530/752143616222167150.png')
        if (args.length > 8) return message.channel.send(e)
        if (!message.content.startsWith(prefix)) return ;
        let tax = probot.taxs(args)
        let taxv = tax-args
        let embed = new Discord.MessageEmbed()

        .setAuthor(message.author.tag , message.author.avatarURL({dynmaic: true}))
        .setTitle('TAX CALCULATOR')
        .setColor("BLUE")
        .addField(` \`المبلغ المراد دفعه\` `, args , false)
        .addField(` \`قيمه الضريبه\` `, taxv , false)
        .addField(` \`المبلغ شامل الضريبه\` `, tax , false)
        .setThumbnail('https://image.flaticon.com/icons/png/512/1308/1308479.png')
        .setFooter(message.guild.name , message.guild.iconURL({dynmaic: true}))
        .setTimestamp()

        message.channel.send(`<@${message.author.id}>`,embed)
    }
})


client.on('message', msg => {
	if (msg.content.startsWith(prefix + 'say')) {
	   if (msg.channel.type === 'dm') return ;
		if (msg.author.bot) return;
		if (!msg.member.hasPermission('ADMINISTRATOR'))
			return (
				msg.delete(),
				msg
					.reply(' **You Dont Have Permission : `Administrator`** ')
					.then(msg => {
						msg.delete({ timeout: 5000 });
					})
			);

		msg.channel.send(msg.content.slice(4));
		msg.delete();
	}
});


client.on("message", message => {
  if (message.content === prefix + 'ping') {
     if (message.channel.type === 'dm') return ;
    message.channel.send('Pinging..').then(yy => {
      setTimeout(u => {
        let ping = yy.createdTimestamp - message.createdTimestamp
        yy.edit(`${ping}ms`)
      }, 800)
    })
    
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'muteip')) {
     if (message.channel.type === 'dm') return ;
    let mrole = message.guild.roles.cache.find(h => h.name === 'Muteip')
    if (!mrole) {
      message.guild.roles.create({data: {
        name: 'Muteip'
      }})
      return message.lineReplyNoMention('Muteip Role Has Been Created Try Mute This User Again !')
    }

    if (message.author.bot) return
    if (!message.member.hasPermission('ADMINISTRATOR')) return
    let user = message.mentions.users.first()
    let member = message.mentions.members.first()
    let args = message.content.split(" ").slice(1).join(" ")

    if (!args) return message.lineReplyNoMention('Mention User')

    if (!user) return message.lineReplyNoMention('User Not Found')

    if (user.id == message.author.id) return message.lineReplyNoMention(`${message.author} You Can't Mute Yourself ! `)

    if (message.guild.member(user.id).hasPermission('ADMINISTRATOR') && message.author.id !== '472420453823021059') return message.lineReplyNoMention('You Can\'t Mute Admins')

   if (user.bot) return message.lineReplyNoMention('You Can\'t Mute Bot')

   if (!mutes.has(`MUTEIP_${message.guild.id}`)) {
     mutes.set(`MUTEIP_${message.guild.id}`, [])
   }

   if (mutes.get(`MUTEIP_${message.guild.id}`).includes(user.id)) return message.lineReplyNoMention(`${user} Already Muted !!`)
    mutes.push(`MUTEIP_${message.guild.id}`, user.id)
    member.roles.add(mrole)
    message.lineReplyNoMention(`🤐 ${user} Muted Ip From Text`)
  }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'unmuteip')) {
     if (message.channel.type === 'dm') return ;
    let mrole = message.guild.roles.cache.find(h => h.name === 'Muteip')

    if (message.author.bot) return

    if (!message.member.hasPermission('ADMINISTRATOR')) return

    let user = message.mentions.users.first()
    let member = message.mentions.members.first()
    let args = message.content.split(" ").slice(1).join(" ")
    if (!args) return message.lineReplyNoMention('Mention User')
    if (!user) return message.lineReplyNoMention('User Not Found')
    if (user.id == message.author.id) return message.lineReplyNoMention(`${message.author} You Can't UnMute Yourself !`)
    

     if (!mutes.has(`MUTEIP_${message.guild.id}`)) {
     mutes.set(`MUTEIP_${message.guild.id}`, [])
   }

  if (!mutes.get(`MUTEIP_${message.guild.id}`).includes(user.id)) return message.lineReplyNoMention('This User Is not Muted By IP')

    mutes.unpush(`MUTEIP_${message.guild.id}`, user.id)
    member.roles.remove(mrole)
    message.lineReplyNoMention(`✅ ${user} Unmuted Ip`)
  }
})

client.on("message", message => {
  if (message.channel.type === 'dm') return ;
  let gg = mutes.get(`MUTEIP_${message.guild.id}`)
  if (!mutes.has(`MUTEIP_${message.guild.id}`)) {
    mutes.set(`MUTEIP_${message.guild.id}`, [])
    return 
  }
  
  if (!gg.includes(message.author.id)) return ; 
  if (message.author.bot) return ;
  message.delete()
  
})

 client.on("message", message => {
    if (message.content.startsWith(prefix + 'find')) {
      if (!message.member.hasPermission('ADMINISTRATOR')) return ;
       let j = message.content.split(" ")
         if (!j[1]) return message.reply('Mention Role or role name or role id')
         let role = message.guild.roles.cache.find(d => d.id === j[1]) || message.guild.roles.cache.find(l => l.name.includes(j.slice(1).join(" "))) || message.mentions.roles.first()
         if (!role) return message.reply('Cannot Find Role')
         let g = message.guild.roles.cache.get(role.id).members.map(f => `<@!${f.id}> ( ${f.id} )`).join("\n")
         let iv = `${role.createdAt.getDay()}/${role.createdAt.getMonth()}/${role.createdAt.getFullYear()}`
      message.channel.send(`\n**Role : \`${role.name}\`\nCreated At : \`${iv}\`\n-\nThere Is \`${message.guild.roles.cache.get(role.id).members.size}\` Have This Role** \n-\n\n${g}`, {split: true} )
    }
  })

  client.on("message", message => {
   if (message.content.startsWith(prefix + 'set-voice')){
     if (!devs.includes(message.author.id)) return
     let args = message.content.split(" ") 
     let channel = message.guild.channels.cache.find(u => u.name === args.slice(1).join(' '))
     if (!args[1]) return message.lineReplyNoMention(' Type  Name Of Channel')
     if (!channel) return message.lineReplyNoMention('Cannot Find Channel')
     db.set(`VOICECH_${message.guild.id}`, channel.id)
     message.lineReplyNoMention(`${channel} Is An Auto voice Connecting`)
   }
   if (message.content === prefix + 'del-voice') {
     if (!devs.includes(message.author.id)) 
     if (!db.has(`VOICECH_${message.guild.id}`)) return message.lineReplyNoMention('No Voice Channel has Setup !')
     let g = db.get(`VOICECH_${message.guild.id}`)
    let i =  client.channels.cache.get(`${g}`)
    i.leave()
     db.delete(`VOICECH_${message.guild.id}`)
     message.channel.send(`Voice Channel Has Been Deleted`)
     
   }
 })
 
 client.on("message", message => {
   if (message.content === prefix + 'connect') {
     if (!message.member.hasPermission('ADMINISTRATOR')) return ;
     let ch = db.get(`VOICECH_${message.guild.id}`)
     let u = client.channels.cache.get(`${ch}`)
     if (!ch) return message.lineReplyNoMention('Channel Is not Setup')
     if (!u) return message.lineReplyNoMention('Cannot Find Channel Setup Room Again !')
     u.join()
     message.lineReplyNoMention(`Connected To ${u}`)
     
   }
 })
 
 client.on("ready", () => {
   let guild = client.guilds.cache.get('1040555458089455707')
   if (!guild) return ;
   let u = "1045215716141445127"
   let jk = db.get(`VOICECH_${guild.id}`)
   if (!jk) return ;
   let h = client.channels.cache.get(`${jk}`)
   if (!h) return ; 
   h.join()
   console.log(`Joined : ${h.name}`)
 }) 


client.on("message", message => {
  if (message.channel.type === 'dm') return
    if (message.content.startsWith(prefix + 'jsnskssknsnsjjsj929345163728420884929345163728420884929345163728420884929345163728420884929345163728420884bbsjnnjjsjshsjsujs')) {
      if (!message.member.hasPermission('MANAGE_ROLES')) return ;
        if (message.author.bot || !message.content.startsWith(prefix)) return ;
        const user = message.mentions.users.first();user
        let args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.reply('⚠️ | Please Mention User').then(msg => {
            msg.delete({timeout: 8000})
        })
        if (!user) return message.reply('❌ | User Not Found !').then(msg => {
            msg.delete({timeout: 8000})
        })
        if (user.id === message.author.id) return message.reply('❌ | You Cant Spin To Yourself !').then(msg => {
            msg.delete({timeout: 8000})
        })
        if (user.bot) return message.reply('❌ | Bots Not Allowed').then(msg => {
            msg.delete({timeout: 8000})
        })
        let rewards = ["1","2","3","4","5","6","7","8","9","10"]

        let aa = rewards[Math.floor(Math.random() * rewards.length)]
        
        let embed = new Discord.MessageEmbed()
        
        .setColor("BLUE")
        .setAuthor(user.tag , user.avatarURL({dynamic: true}))
        .addField(`You Won :`, `${aa}` , false)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/2048px-Video-Game-Controller-Icon-IDV-green.svg.png')
        .setFooter(message.guild.name , message.guild.iconURL({dynmaic: true}))
        .setTimestamp()

        message.lineReplyNoMention(`<@${user.id}>`, embed)
    }
})

client.on("message", message => {
    if (message.content.startsWith(prefix + 'room')) {
      if (!message.member.hasPermission('MANAGE_ROLES')) return ;
       if (message.channel.type === 'dm') return
        let args = message.content.split(" ")
        let user = message.mentions.users.first() || message.guild.members.cache.find(me => me.id === args[1])
        if (!args[1]) return message.lineReplyNoMention('Mention User !')
        if (!user) return message.lineReplyNoMention('Cannot Find User !')
        if (!args[2]) return message.lineReplyNoMention('Type A Time For Private Room !')
        let everyone = message.guild.roles.cache.find(jj => jj.name === '@everyone')
        let La = message.guild.roles.cache.find(h => h.id === '1045215413639852102')
        let category = message.guild.channels.cache.find(ca=> ca.id === '1045215479599472723')
        let chname = `〢੭・${user.username}`
        let a = args[2].split("")
        let pop = a.pop()
        let time = a.join("")
        if (isNaN(time)) return message.lineReplyNoMention('Ex. : 2d , 2s , 2m , 2h')

        if (message.content.split(" ")[2].endsWith('s')) {
            let v = time * 1000
            time = +v
        } else if (message.content.split(" ")[2].endsWith('m')) {
            let v = time * 60000
            time = +v
        } else if (message.content.split(" ")[2].endsWith('h')) {
            let v = time * 3600000
            time = +v
        } else  if (message.content.split(" ")[2].endsWith('d')) {
            let v = time * 86400000
            time = +v
        } else {
            message.lineReplyNoMention('Ex. : 2d , 2s , 2m , 2h')
            return
        }

        
        message.guild.channels.create(chname , {type : "text"}).then(ch => {
            ch.setParent(category)
            ch.createOverwrite(La , {
                VIEW_CHANNEL : true,
                SEND_MESSAGES: false
         });
            ch.updateOverwrite(user.id , {
                SEND_MESSAGES: true
            });
            
            ch.createOverwrite(everyone , {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: false
            })

            setTimeout(m => {
                ch.delete()
            }, time)

            let embed1 = new Discord.MessageEmbed()
            .setTitle('PRIVATE ROOM HAS BEEN CREATED')
            .setColor("EBAD42")
            .addField(`Room Name :`, `<#${ch.id}>` , false)
            .addField(`Created By :`, `<@${message.author.id}>` , false)
            .addField(`Room Owner :` , `<@${user.id}>` , false)
            .addField(`Time :` , args[2] , false)
            .setTimestamp()
            ch.send(embed1)


            //message.channel.send(`Private Room Created Successfully : <#${ch.id}>`)
            message.react('✅')

            let embed = new Discord.MessageEmbed()
            .setTitle('ROOM CREATED')
            .setAuthor(message.author.tag , message.author.avatarURL({dynamic: true}))
            .addField(`Room :`, `<#${ch.id}>`, false)
            .addField(`By :`, message.author , true)
            .addField(`For :`, user , true)
            .setFooter(message.guild.name , message.guild.iconURL({dynmaic: true}))
            .setTimestamp()
            
            let d = db.get(`SYSLOG_${message.guild.id}`)
            if (!d) return

            let j = client.channels.cache.get(`${d}`)
            if (!j) return ;
            j.send(embed)

            
        })


    }

    if (message.content.startsWith(prefix + 'renameroom')) {
       if (message.channel.type === 'dm') return
        let args = message.content.split(" ").slice(1).join(" ")
        if (!message.channel.name.startsWith('〢੭・')) return message.lineReplyNoMention('It Not A Priavte Room !')
        if (!args) return message.lineReplyNoMention('Enter A New Room Name !')

        message.channel.setName(`〢ะ・${args}`)
        message.channel.send(`Changed Private Room Name To \`${args}\``)
        message.react('✅')
    }
})

client.on("message", message => {
    if (message.content.startsWith(prefix + 'delroom')) {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('**❌ | You Dont Have Permission : `MANAGE_CHANNELS`**')
        if (!message.channel.name.startsWith('〢੭・')) return message.reply('**❌ | Its Not A Private Room**')
        let embed = new Discord.MessageEmbed()
        .setTitle('ARE YOU SURE ?')
        .setDescription(`Are You Sure To Delete : <#${message.channel.id}>`)
        .addField(`YES OR NO`, `✅ | Yes\n\n❎ | No` , false)
        .setFooter(message.author.username , message.author.avatarURL({dynamic: true}))
        .setTimestamp()
        message.delete()
        message.channel.send(embed).then(async msg => {
            const emojis = ["✅" , "❎"]

            for (let i = 0; i < emojis.length; i++) {
                await msg.react(emojis[i])
            }

            const filter = (reaction , user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id;

            const collector = msg.createReactionCollector(filter , { time: 15000 })

            collector.on("collect" , ({ emoji , users }) => {

                const index = emojis.indexOf(emoji.name);
                
                if (index === 0) {
                    message.channel.delete()

                    let em = new Discord.MessageEmbed()
                    .setTitle('PRIVATE ROOM DELETED')
                    .setColor('RED')
                    .addField(`Room Name :`, `${message.channel.name}`)
                    .addField(`By :` , `<@${message.author.id}>` ,true)
                    .setFooter(message.guild.name , message.guild.iconURL({dynamic: true}))
                    .setTimestamp()
        
                    client.channels.cache.get('1045215687662108673').send(em)

                } else if (index === 1) {
                    msg.delete()
                    message.reply('**❌ | Cancelled**').then(m => {
                        m.delete({timeout: 5000})
                    })
                }
            })
        })

    }
})

client.on("message", message => {
  if (message.content.startsWith(prefix + 'add-room')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return ;
    let args = message.content.split(" ")
    
    let channel = message.mentions.channels.first() || message.guild.channels.cache.find(j => j.id === args[1])
    
    if (!args[1]) return message.lineReplyNoMention('Mentions Room Or Id')
    
    if (!channel) return message.lineReplyNoMention('Cannot Find This Channel !')
    
    if (!db.has(`AUTOLINE_${message.guild.id}`)) {
      db.set(`AUTOLINE_${message.guild.id}`, [])
    }
    
    if (db.get(`AUTOLINE_${message.guild.id}`).includes(channel.id)) return message.lineReplyNoMention('This Channel Is Already In Auto Line System !')
    
    db.push(`AUTOLINE_${message.guild.id}`, channel.id)
    
    message.lineReplyNoMention(`Done Added ${channel} To Auto Line System !`)
  }
}) 



client.on("message", message => {
  if (message.content.startsWith(prefix + 'Rule')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return ;
    let args = message.content.split(" ")
    
    let channel = message.mentions.channels.first() || message.guild.channels.cache.find(j => j.id === args[1])
    
    if (!args[1]) return message.lineReplyNoMention('Mentions Room Or Id')
    
    if (!channel) return message.lineReplyNoMention('Cannot Find This Channel !')
    
    if (!db.has(`AUTOLINE_${message.guild.id}`)) {
      db.set(`AUTOLINE_${message.guild.id}`, [])
    }
    
    if (db.get(`AUTOLINE_${message.guild.id}`).includes(channel.id)) return message.lineReplyNoMention('This Channel Is Already In Auto Line System !')
    
    db.push(`AUTOLINE_${message.guild.id}`, channel.id)
    
    message.lineReplyNoMention(`**ممنوع تنشر الا كل نصف ساعه نشرت قبل النصف ساعه تنتهي بتاخذ تحذير***`)
  }
}) 





client.on("message", message => {
  if (message.content.startsWith(prefix + 'remove-room')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return ;
    let args = message.content.split(" ")
    
    let channel = message.mentions.channels.first() || message.guild.channels.cache.find(j => j.id === args[1])
    
    if (!args[1]) return message.lineReplyNoMention('Mentions Room Or Id')
    
    if (!channel) return message.lineReplyNoMention('Cannot Find This Channel !')
    
    if (!db.has(`AUTOLINE_${message.guild.id}`)) {
      db.set(`AUTOLINE_${message.guild.id}`, [])
    }
    
    if (!db.get(`AUTOLINE_${message.guild.id}`).includes(channel.id)) return message.lineReplyNoMention('This Channel Isnt In Auto Line System !')
    
    db.unpush(`AUTOLINE_${message.guild.id}`, channel.id)
    
    message.lineReplyNoMention(`Done Removed ${channel} From Auto Line System !`)
  }
}) 

client.on("message", message => {
  if (!db.has(`AUTOLINE_${message.guild.id}`)) {
    db.set(`AUTOLINE_${message.guild.id}`, [])
    return 
  }
  if (db.get(`AUTOLINE_${message.guild.id}`).includes(message.channel.id)) {
    if (message.author.bot) return ;
    let h = db.get(`LINE_${message.guild.id}`)
    if (!h) return ;
    message.channel.send(h)
  }
})

client.on("message", message => {
  if (message.content === prefix + 'lrooms') {
    let g = db.get(`AUTOLINE_${message.guild.id}`)
    message.channel.send(g)
  }
}) 

client.on("message", message => {
  if (message.content === prefix + "delete-rooms") {
    if (!message.member.hasPermission('ADMINISTRATOR')) return 
    db.set(`AUTOLINE_${message.guild.id}`, [])
    message.lineReplyNoMention("Deleted All Rooms From Auto Line System !")
  }
})


////////////مسح

client.on("message", async message => {
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    if (command == "clear"  || command == "مسح" || command == "م") {
        message.delete({ timeout: 0 })
        if (!message.channel.guild) return message.reply(`** This Command For Servers Only**`);
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** You don't have perms :x:**`);
        if (!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`> ** I don't have perms :x:**`);
        let args = message.content.split(" ").slice(1)
        let messagecount = parseInt(args);
        if (args > 100) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`\`\`\`js
i cant delete more than 100 messages 
\`\`\``)
        ).then(messages => messages.delete({ timeout: 5000 }))
        if (!messagecount) messagecount = '100';
        message.channel.messages.fetch({ limit: 100 }).then(messages => message.channel.bulkDelete(messagecount)).then(msgs => {
            message.channel.send(
                new Discord.MessageEmbed()
                .setDescription(`\`\`\`js
${msgs.size} messages cleared
\`\`\``)
            ).then(messages =>
                messages.delete({ timeout: 5000 }));
        })
    }
});




client.on('message', message => {
if (message.content.startsWith(prefix + "sell on")) {
  message.delete()
if (!message.channel.guild) return;
var roomid = "1045215609413189702";
var room = client.channels.cache.get(roomid);
  if (!room) return undefined;
let sug = message.content.split(" ").slice(1).join(" ");
var embed = new Discord.MessageEmbed()
 .setColor("36393F")
 .setThumbnail(`https://cdn.discordapp.com/emojis/837520064050888784.png?v=1`)
 .setAuthor("Onis $", `https://media.discordapp.net/attachments/947519380412067840/948097034148282418/20220227_115032.png`)
.addField(" **إن الله وملائكنه يصلون علي النبي يا ايها الذين آمنوا صلوا عليه وسلموا تسليما**", " الــنشر مــفتوح", false)
 .setFooter(`Selling Rooms Was Opened`)
 .setTimestamp();
  message.react("✅")
  room.send(embed).then(c => {
  c.react('✅').then(() =>
  c.react('❌'))
  })
 }
});


client.on('message', message => {
if (message.content.startsWith(prefix + "sell off")) {
  message.delete()
if (!message.channel.guild) return;
var roomid = "1045215609413189702";
var room = client.channels.cache.get(roomid);
  if (!room) return undefined;
let sug = message.content.split(" ").slice(1).join(" ");
var embed = new Discord.MessageEmbed()
 .setColor("36393F")
 .setThumbnail(`https://cdn.discordapp.com/emojis/837520064050888784.png?v=1`)
 .setAuthor("Onis $", `https://media.discordapp.net/attachments/947519380412067840/948097034148282418/20220227_115032.png`)
.addField("** الــنشر مــفتوح**", false)
 .setFooter(`Selling Rooms Was Opened`)
 .setTimestamp();
  message.react("✅")
  room.send(embed).then(c => {
  c.react('✅').then(() =>
  c.react('❌'))
  })
 }
});