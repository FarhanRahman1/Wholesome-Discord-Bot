const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "hangman",
    description: "Hangman game",
    async execute(client, interaction) {
        if (interaction.options._hoistedOptions.length != 0) {
            const sentence = interaction.options._hoistedOptions[0].value.toLowerCase();
            let letters = [...sentence];
            let found = new Array(letters.length)
            letters.forEach((letter, index) => {
                if (letter != " ") found[index] = "__  __";
            })
            const initialEmbed = new MessageEmbed()
                .setTitle("Hangman")
                .setColor("RANDOM")
                .addField(found.join(" "), "\u200B");
            // interaction.channel.send({ embeds: [initialEmbed] });
            let points = {};
            const filter = m => m.content.length == 1 && m.content != " " && !m.author.bot;
            const collector = interaction.channel.createMessageCollector({ filter, time: 30 * 1000 });
            collector.on('collect', m => {
                let isCorrect = false;
                if (!points[m.member.user.username]) points[m.member.user.username] = 0;
                letters.some((letter, index) => {
                    if (letter == m.content.toLowerCase() && letter != found[index].substring(2, 3)) {
                        found[index] = "__" + letter + "__";
                        points[m.member.user.username] += 1;
                        isCorrect = true;
                        return true
                    } else return false
                })
                let msg = "";
                for (let [key, value] of Object.entries(points)) {
                    msg = msg + key + " : " + String(value) + "\n"
                }
                const newEmbed = new MessageEmbed()
                    .setTitle(isCorrect ? `${m.member.user.username} scored a point!` : `Uh oh ${m.member.user.username} that wasn't correct`)
                    .setColor(isCorrect ? "#00FF00" : "#FF0000")
                    .addField(found.join(" "), "\u200B")
                    .addField("Points:", msg)
                interaction.channel.send({ embeds: [newEmbed] })
            });
            collector.on('end', collected => {
                let winner = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b);
                let p = Object.values(points)
                if (p.every((val, i, arr) => val === arr[0])) winner = undefined;
                const winEmbed = new MessageEmbed()
                    .setTitle(winner ? `Congratulations ${winner}, You won!` : `It's a draw! GG`)
                interaction.channel.send({ embeds: [winEmbed] })
            });
            return initialEmbed
        } else {
            let word = client.hangwords[Math.floor(Math.random() * 2466)]
            var stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ kill me already
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ lmao ded
|  /|\\
|  / \\
|
\`\`\`
`];
            let letters = [...word];
            letters.pop();
            let found = new Array(letters.length).fill("__  __")
            const initialEmbed = new MessageEmbed()
                .setTitle("Hangman")
                .setColor("#00FF00")
                .addField(found.join(" "), stages[0])
            // interaction.channel.send({ embeds: [initialEmbed] });
            let stageCount = 0;;
            let foundL = 0;
            const filter = m => !m.author.bot;
            const collector = interaction.channel.createMessageCollector({ filter, time: 5 * 60 * 1000 });
            collector.on('collect', m => {
                let isCorrect = false;
                letters.some((letter, index) => {
                    if (letter == m.content.toLowerCase() && letter != found[index].substring(2, 3)) {
                        found[index] = "__" + letter + "__";
                        foundL++;
                        isCorrect = true;
                        return true
                    } else return false
                })
                if (!isCorrect) stageCount++;
                const newEmbed = new MessageEmbed()
                    .setTitle(isCorrect ? `${m.member.user.username}, good guess!` : `Uh oh ${m.member.user.username} that wasn't correct`)
                    .setColor(isCorrect ? "#00FF00" : "#FF0000")
                    .addField(found.join(" "), stages[stageCount])
                interaction.channel.send({ embeds: [newEmbed] })
                if (stageCount == 6 || foundL == letters.length) collector.stop(stageCount == 6 ? "Haha you lose!" : "You won!")
            });
            collector.on('end', (collected,reason) => {
                const winEmbed = new MessageEmbed()
                    .setTitle(reason)
                    .setColor(stageCount==6?"#FF0000":"#00FF00")
                    .addField("__"+letters.join("__ __")+"__",stages[stageCount])
                interaction.channel.send({ embeds: [winEmbed] })
            });
            return initialEmbed
        }
    }
}