export function notifications(window) {
    'use strict';

    // Subscribe / unsubscribe button for push notifications
    var pushElement = document.querySelector('.push');
    var pushImgElement = document.querySelector('.push__image');

    // Check if push notifications are supported
    function isPushSupported() {
        // Has the user allowed to send push notifications
        if (Notification.permission === 'denied') {
            alert('You have blocked push notifications');
            return;
        }

        // Whether push notifications are supported by the user's browser
        if (!('PushManager' in window)) {
            alert('Sorry, push notifications are not supported by your browser.');
            return;
        }

    // If the service-worker is registered, 
    // check if the user is subscribed to push notifications
    navigator.serviceWorker.ready
        .then(function (registration) {
            registration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    changePushStatus(true);
                }
                else {
                    changePushStatus(false);
                }
            })
            .catch(function (error) {
                console.error('An error occured: ', error);
            });
        });
    }

    // Prompt the user to subscribe to push notifications
    function subscribePush() {
        navigator.serviceWorker.ready.then(function(registration) {
            if (!registration.pushManager) {
                alert('push notifications are not supported by your browser.');
                return false;
            }

            // We doing subscribe
            registration.pushManager.subscribe({
            userVisibleOnly: true // Always show notifications
            })
            .then(function (subscription) {
            alert('Successfully subscribed.');
            console.info('Subscribed to push notifications.');
            console.log(subscription);
            changePushStatus(true);
            })
            .catch(function (error) {
            changePushStatus(false);
            console.error('Error subscribing to push notifications:', error);
            });
        })
    }

    // Unsubscribe from push notifications
    function unsubscribePush() {
        navigator.serviceWorker.ready
        .then(function(registration) {
            registration.pushManager.getSubscription()
            .then(function (subscription) {
            // If there is no subscription, then exit
            if(!subscription) {
                alert('Unable to unsubscribe from push notifications.');
                return;
            }

            // Directly unsubscribe
            subscription.unsubscribe()
                .then(function () {
                    alert('Unsubscribed successfully.');
                    console.info('Push notifications canceled.');
                    console.log(subscription);
                    changePushStatus(false);
                })
                .catch(function (error) {
                    console.error(error);
                });
            })
            .catch(function (error) {
                console.error('Didn\'t get to unsubscribe from push notifications.');
            });
        })
    }

    // Change status (signed / unsigned)
    function changePushStatus(status) {
        pushElement.dataset.checked = status;
        pushElement.checked = status;
        if (status) {
            pushElement.classList.add('active');
            pushImgElement.src = '../images/notifications_off.png';
        }
        else {
            pushElement.classList.remove('active');
            pushImgElement.src = '../images/notifications_on.png';
        }
    }

    // Handle clicking on the subscribe / unsubscribe button
    pushElement.addEventListener('click', function () {
    var isSubscribed = (pushElement.dataset.checked === 'true');
    if (isSubscribed) {
        unsubscribePush();
    }
    else {
        subscribePush();
    }
    });

    isPushSupported();
};
