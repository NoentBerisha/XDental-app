const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/events";

// returns a Promise
function transformToJsonOrTextPromise(response) {
  const contentLength = response.headers.get("Content-Length");
  const contentType = response.headers.get("Content-Type");
  if (
    contentLength !== "0" &&
    contentType &&
    contentType.includes("application/json")
  ) {
    return response.json();
  } else {
    return response.text();
  }
}

async function sendRequest(url, { method = "GET", body, headers = {} }) {
  const options = {
    method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
  };

  return fetch(url, options).then((res) => {
    const jsonOrTextPromise = transformToJsonOrTextPromise(res);

    if (res.ok) {
      return jsonOrTextPromise.then(body => ({ status: res.status, body }));
    } else {
      return jsonOrTextPromise.then(function (response) {
        const responseObject = {
          status: res.status,
          ok: false,
          message: typeof response === "string" ? response : response.message,
        };

        return Promise.reject(responseObject);
      });
    }
  });
}

export async function getEvent(id) {
  return sendRequest(`${BACKEND_URL}/${id}`, {
    method: "GET"
  }).then((response) => response);
}

export async function deleteEvent(id) {
  return sendRequest(`${BACKEND_URL}/${id}`, {
    method: "DELETE"
  }).then((response) => response);
}

export async function updateEvent(event) {
  return sendRequest(`${BACKEND_URL}/update`, {
    method: "PUT",
    body: event
  }).then((response) => response);
}

export async function getAllEvents() {
  return sendRequest(`${BACKEND_URL}/all`, {
    method: "GET"
  }).then((response) => response);
}

export async function createEvent(event) {
  return sendRequest(`${BACKEND_URL}/create`, {
    method: "POST",
    body: event
  }).then((response) => response);
}