module.exports = {
  description: "Delete an autoresponse group",
  options: [
    {
      type: "STRING",
      name: "group",
      description: "The autoresponse group name, you can find this under `/autoresponse list`",
      required: true
    }
  ]
};

const { CommandInteraction } = require("discord.js"), { TrainingModel, emojis } = require("../../../../database");

module.exports.execute = (interaction = new CommandInteraction, { group }) => TrainingModel.findOne({ name: group }, (_, model) => {
  if (model) return interaction.reply({ content: `${emojis.get("error")} This autoresponse group already exists.`, ephemeral: true });

  model = new TrainingModel({ name: group });
  model.save();

  return interaction.reply({ content: `${emojis.get("success")} The autoresponse group has been created.`, ephemeral: true });
});