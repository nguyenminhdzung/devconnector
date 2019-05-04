export function onChange(e) {
  this.setState({ [e.target.name]: e.target.value });
}
