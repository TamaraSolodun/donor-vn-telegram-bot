const schedule = require('node-schedule');
const Donor = require('../Models/Donor');
const bot = require('../bot');
const LogMessage = require('../Models/LogMessage');

const scheduleFollowUpJob = (userId, dateOfNextDonation) => {
    const followUpDate = new Date(dateOfNextDonation);
    followUpDate.setDate(followUpDate.getDate() + 1);

    const jobName = `followUp_${userId}`;
    console.log(`Scheduling follow-up job for user ${userId} at ${followUpDate}`);

    schedule.scheduleJob(jobName, followUpDate, async () => {
        try {
            console.log(`Executing follow-up job for user ${userId}`);
            const donor = await Donor.findOne({ userId: userId });

            if (donor) {
                const message = `Добрий день! Чи відвідали Ви центр служби крові ${dateOfNextDonation}?`;

                await bot.sendMessage(donor.userId, message, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Так', callback_data: `confirm:${dateOfNextDonation}` },
                                { text: 'Ні', callback_data: 'not_confirm' },
                            ],
                        ],
                    },
                });

                console.log(`Sent follow-up message to user ${donor.userId}.`);
                await LogMessage.create({
                    userId: userId,
                    success: true,
                    message: message,
                    messageType: 'confirmDonate',
                    messageProps: {
                      dateOfNextDonation,
                    },
                });
            } else {
                console.error(`Donor with userId ${userId} not found.`);
                await LogMessage.create({
                    userId: userId,
                    success: false,
                    message: message,
                    messageType: 'confirmDonate',
                    messageProps: {
                      dateOfNextDonation,
                    },
                });
            }
        } catch (error) {
            console.error('Error sending follow-up message:', error);
            await LogMessage.create({
                userId: userId,
                success: false,
                message: message,
                messageType: 'confirmDonate',
                messageProps: {
                  dateOfNextDonation,
                },
            });
        }
    });
};

module.exports = { scheduleFollowUpJob };
