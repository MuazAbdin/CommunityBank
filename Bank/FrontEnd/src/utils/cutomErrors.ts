export class HTTPError extends Error {
  status: number;
  statusText: string;
  data?: string;

  constructor(response: Response) {
    super(response.statusText);
    this.status = response.status;
    this.statusText = response.statusText;
    // this.data = response.data ?? "";

    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}
