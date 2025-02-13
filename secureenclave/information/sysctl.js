// Show host machine info 

const Discord = require('discord.js');
const sysctl = require('systeminformation');

module.exports = {
    name: 'sysctl',
    command: 'sysctl',
    category: 'Information',
    usage: '`apple!sysctl`',
    cooldown: 5,
    description: 'Shows the host machine info.',
    async execute(message, args) {
        // Memory
        sysctl.mem(function (data) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Memory Information:`)
                .addField(`Total`, formatBytes(data.total), true)
                .addField(`Free`, formatBytes(data.free), true)
                .addField(`Used`, formatBytes(data.used), true)
                .addField(`Active`, formatBytes(data.active), true)
                .addField(`Total swap`, formatBytes(data.swaptotal), true)
                .addField(`Used swap`, formatBytes(data.swapused), true)
                .setColor(randomColor())
            message.channel.send({ embeds: [embed] });
        });
        // CPU
        sysctl.cpu(function (data) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`CPU Information:`)
                .addField(`Manufacturer`, data.manufacturer, true)
                .addField(`Brand`, data.brand, true)
                .addField(`Speed`, data.speed + 'GHz', true)
                .setColor(randomColor())
            message.channel.send({ embeds: [embed] });
        });
        // OS
        sysctl.osInfo(function (data) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`OS Information:`)
                .addField(`Platform`, data.platform[0].toUpperCase() + data.platform.substring(1), true)
                .addField(`Distro`, data.distro, true)
                .addField(`Release`, data.release, true)
                .addField(`Kernel`, data.kernel, true)
                .addField(`Arch`, data.arch, true)
                .setColor(randomColor())
            message.channel.send({ embeds: [embed] });
        });
    },
};
