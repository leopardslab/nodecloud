/*This is an auto generated class, please do not change.*/
/**
 * Class to create a NotificationDataPlaneClient object
 * @category Oracle Cloud
 */
class Oracle_NotificationService {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._sdkclassName = this._oci.NotificationDataPlaneClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createSubscription function of NotificationDataPlaneClient
	 * @param {CreateSubscriptionRequest} createSubscriptionRequest - Data required for createSubscription
	 * @returns {Promise<createSubscriptionResponse>}
	 */
	subscribe(createSubscriptionRequest) {
		return new Promise((resolve, reject) => {
			this._notificationDataPlaneClient
				.createSubscription(createSubscriptionRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteSubscription function of NotificationDataPlaneClient
	 * @param {DeleteSubscriptionRequest} deleteSubscriptionRequest - Data required for deleteSubscription
	 * @returns {Promise<deleteSubscriptionResponse>}
	 */
	unsubscribe(deleteSubscriptionRequest) {
		return new Promise((resolve, reject) => {
			this._notificationDataPlaneClient
				.deleteSubscription(deleteSubscriptionRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listSubscriptions function of NotificationDataPlaneClient
	 * @param {ListSubscriptionsRequest} listSubscriptionsRequest - Data required for listSubscriptions
	 * @returns {Promise<listSubscriptionsResponse>}
	 */
	listSubscriptions(listSubscriptionsRequest) {
		return new Promise((resolve, reject) => {
			this._notificationDataPlaneClient
				.listSubscriptions(listSubscriptionsRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the publishMessage function of NotificationDataPlaneClient
	 * @param {PublishMessageRequest} publishMessageRequest - Data required for publishMessage
	 * @returns {Promise<publishMessageResponse>}
	 */
	publish(publishMessageRequest) {
		return new Promise((resolve, reject) => {
			this._notificationDataPlaneClient
				.publishMessage(publishMessageRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_NotificationService;
