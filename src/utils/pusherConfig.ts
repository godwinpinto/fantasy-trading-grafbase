import Pusher from 'pusher-js';

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  // Add other options if needed
});

export default {
    
  install: (app:any) => {
    console.log('Pusher plugin installed'); 
    app.config.globalProperties.$pusher = pusher;
    app.provide('pusher', pusher);
  }
};
