export class HTTPError extends Error {
  statusCode: number;

  constructor(response: Response) {
    super(response.statusText);
    this.statusCode = response.status;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
