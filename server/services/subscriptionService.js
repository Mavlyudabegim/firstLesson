const Subscription = require('../models/subscription');
const Account = require('../models/accounts');
const ApiError = require('../exceptions/api-error');
async function getOneSubscription(subscriptionId) {
  const incomeVal = await Subscription.findById(subscriptionId);
  return incomeVal;
}
async function createSubscription(accountId, categoryId, newSubscription) {
  const subscription_data = { accountId, categoryId, ...newSubscription };
  const account = await Account.findById(accountId);
  if (!account) {
    throw ApiError.BadRequest('Account was not found');
  }
  const subscription = await Subscription.create(subscription_data);
  return subscription;
}
async function updateSubscription(subscriptionId, updatedSubscription) {
  const newSubscription = await Subscription.findByIdAndUpdate(
    subscriptionId,
    updatedSubscription
  );
  return newSubscription;
}
async function deleteSubscription(subscriptionId) {
  const deletedSubscription = await Subscription.findOneAndDelete(
    subscriptionId
  );
  return deletedSubscription;
}
async function getAllSubscriptions(accountId) {
  const subscriptions = await Subscription.find({ accountId });
  return subscriptions;
}
async function takeMoneyMonthly(subscriptionId) {
  const currentDate = new Date('2022-03-01T15:48:23.711Z');

  const subscriptionData = await Subscription.findById(subscriptionId);
  const account = await Account.findById(subscriptionData.accountId);
  if (
    currentDate.getTime() < subscriptionData.lastDayOfPayment.getTime() &&
    currentDate.getDate() === 1
  ) {
    account.balance -= subscriptionData.subscriptionAmount;
  }
  await account.save();
  return account.balance;
}
module.exports = {
  getAllSubscriptions,
  getOneSubscription,
  deleteSubscription,
  createSubscription,
  updateSubscription,
  takeMoneyMonthly,
};
