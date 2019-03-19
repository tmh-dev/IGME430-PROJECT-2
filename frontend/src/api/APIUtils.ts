const sendAjax = (url: string, method: string, data: object) => {
    return fetch(url, {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}