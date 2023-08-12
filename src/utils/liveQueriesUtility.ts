import ReconnectingEventSource from "reconnecting-eventsource";


export const subscribeToLiveQueries = (query: any, variables: JSON, token: string, onMessage: Function, onError: Function) => {
    const url = new URL(import.meta.env.VITE_GRAFBASE_API_URL);

    const params = new URLSearchParams({
        authorization: `Bearer ${token}`,
        'x-api-key': '',
        query: query,
        variables: JSON.stringify(variables)
    });

    url.search = params.toString();

    const eventSource = new ReconnectingEventSource(url, {
    });


    eventSource.onmessage = (message: MessageEvent) => {
        onMessage(message);
    }
    eventSource.onopen = (event: Event) => {
        console.error(event);
//        onError(event);
    }
    eventSource.onerror = (event: Event) => {
        console.error(event);
        onError(event);
    }
    return eventSource; // Return the eventSource instance
}
