const schedule = require('node-schedule');
const { handleConfirmDonation } = require('../handleFunctions');

const scheduleFollowUpJob = (userId, dateOfNextDonation) => {
    const followUpDate = new Date(dateOfNextDonation);
    followUpDate.setDate(followUpDate.getDate() + 1);

    const jobName = `followUp_${userId}`;
    console.log(`Scheduling follow-up job for user ${userId} at ${followUpDate}`);

    schedule.scheduleJob(jobName, followUpDate, async () => {
        await handleConfirmDonation(userId, dateOfNextDonation);
    });
};

module.exports = { scheduleFollowUpJob };
