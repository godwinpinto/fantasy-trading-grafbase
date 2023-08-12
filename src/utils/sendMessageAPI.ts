import axios from 'axios';


export const sendMessageAPI = async (data: any,channel:string,event:string) => {
    const payload = {
        data: JSON.stringify(data),
        channel: channel,
        event: event
    };


    // Generate the required headers for Pusher API request
    const headers = {
        'Content-Type': 'application/json',
    };

    // Construct the URL for triggering the event
    const url = '/api/send_message';

    // Send the HTTP request to Pusher API
    axios.post(url, payload, { headers })
        .then((response: any) => {
            console.log('Event sent successfully:', response.data);
        })
        .catch((error: any) => {
            console.error('Error sending event:', error);
        });
}