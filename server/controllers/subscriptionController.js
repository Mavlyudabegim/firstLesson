const subscriptionService = require('../services/subscriptionService');
async function subscription_details(req, res, next) {
  try {
    const subscriptionVal = await subscriptionService.getOneSubscription(
      req.params.subscriptionId
    );
    return res.status(200).json(subscriptionVal);
  } catch (error) {
    next(error);
  }
}
async function subscription_create(req, res, next) {
  try {
    const new_subscription = await subscriptionService.createSubscription(
      req.params.accountId,
      req.params.categoryId,
      req.body
    );
    return res.status(201).json(new_subscription);
  } catch (error) {
    next(error);
  }
}
async function subscription_edit(req, res, next) {
  try {
    const new_subscription = await subscriptionService.updateSubscription(
      req.params.subscriptionId,
      req.body
    );
    return res.status(200).json(new_subscription);
  } catch (error) {
    next(error);
  }
}
async function subscription_remove(req, res, next) {
  try {
    const deleted_subscription = await subscriptionService.deleteSubscription(
      req.params.subcsriptionId
    );
    return res.status(204).json(deleted_subscription);
  } catch (error) {
    next(error);
  }
}
async function subscriptions_details(req, res, next) {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions(
      req.params.accountId
    );
    return res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
}
async function monthly_payment(req, res, next) {
  try {
    const accountBalance = await subscriptionService.takeMoneyMonthly(
      req.params.subscriptionId
    );
    return res.status(200).json(accountBalance);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  subscription_create,
  subscription_details,
  subscription_edit,
  subscriptions_details,
  subscription_remove,
  monthly_payment,
};
