// Show host machine info using hedgefetch

const { exec } = require('child_process');
const Discord = require('discord.js');

module.exports = {
    name: 'hedgefetch',
    command: 'hedgefetch',
    category: 'Information',
    usage: '`apple!hedgefetch`',
    cooldown: 5,
    description: 'Hedgefetch?',
    async execute(message, args) {
        const m_embed = new Discord.MessageEmbed().setDescription(`Running \`hedgefetch\`...`);
        const m = await message.channel.send({ embeds: [m_embed] });
        exec(`chmod +x ${global.script_path}/nvram/hedgefetch.sh && ${global.script_path}/nvram/hedgefetch.sh`, (err, stdout, stderr) => {
            if (err) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`hedgefetch`, global.bot.user.displayAvatarURL())
                    .setDescription(`**Command exited with error:** \n \`${err}\``)
                    .setTimestamp();
                m.edit({ embeds: [embed] });
                return;
            }

            var error = (stderr) ? stderr : "No Error";
            var output = (stdout) ? stdout : "No Output"

            if (output.length > 1990) output = output.substring(0, 1990) + '...';
            if (error.length > 1990) error = error.substring(0, 1990) + '...';

            const embed = new Discord.MessageEmbed().setDescription(`\`\`\`${output}\`\`\``);
            m.edit({ embeds: [embed] });
        });
    },
};

