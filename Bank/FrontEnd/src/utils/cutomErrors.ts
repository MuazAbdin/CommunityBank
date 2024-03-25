export class HTTPError extends Error {
  status: number;
  statusText: string;

  constructor(response: Response) {
    super(response.statusText);
    this.status = response.status;
    this.statusText = response.statusText;

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
