export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  get_ids() {
    try {
      return fetch(`${this._url}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          action: "get_ids",
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 500) {
        }
        return Promise.reject(res.status);
      });
    } catch (error) {
      // logging ?
    }
  }

  get_items(data) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "get_items",
        params: { ids: data },
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 500) {
      }
      return Promise.reject(res.status);
    });
  }

  filter(params) {
    return fetch(`${this._url}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        action: "filter",
        params: params,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 500) {
      }
      return Promise.reject(res.status);
    });
  }
}
