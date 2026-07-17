// Service Worker for Multi-Device Background Push Notifications
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Receive push notification messages
self.addEventListener("push", (event) => {
  let data = { title: "VA Car Detailing", body: "You have a new update!" };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || "New update from VA Car Detailing",
    icon: data.icon || "/va logo-DCJxvIQ4.png",
    badge: data.badge || "/va logo-DCJxvIQ4.png",
    data: {
      url: data.deepLink || "/notifications"
    },
    vibrate: [100, 50, 100],
    requireInteraction: data.priority === "high" || data.priority === "critical"
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "VA Car Detailing", options)
  );
});

// Listen for postMessage from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const options = {
      body: event.data.body,
      icon: event.data.iconUrl || "/va logo-DCJxvIQ4.png",
      badge: "/va logo-DCJxvIQ4.png",
      data: { url: event.data.deepLink || "/notifications" },
      vibrate: [100, 50, 100]
    };
    self.registration.showNotification(event.data.title, options);
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/notifications";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
