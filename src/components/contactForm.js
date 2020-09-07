import React, { Component } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }

  // const isEmailValid = emailIsValid('sandywyper@gmailcom');
  handleSubmit = (e) => {
    e.preventDefault();
    if (!emailIsValid(this.state.email)) {
      alert('invalid email, please check for typing mistakes.');
      return;
    }
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': form.getAttribute('name'), ...this.state }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .then(() => {
        if (this.props.menuToggle !== undefined) {
          this.props.menuToggle();
        }
        return;
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <p>{this.props.prompt}</p>
        <form
          className="w-full max-w-xl"
          method="post"
          name="Julie-Moss-Contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
          action="/thankyou/"
        >
          <input type="hidden" name="bot-field" value="Julie-Moss-Contact" />

          <div>
            <div className="w-full mb-6">
              <label className="mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 leading-tight border-2 appearance-none focus:outline-none focus:border-gray-600"
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full mb-6">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 leading-tight border-2 appearance-none focus:outline-none focus:border-gray-600 focus:border-custom-blue"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="w-full mb-6">
            <label className="mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              className="w-full px-4 py-2 leading-tight border-2 appearance-none focus:outline-none focus:border-gray-600"
              onChange={this.handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-6 sm:flex md:items-center">
            <div className="mb-4 sm:mb-0 sm:mr-2 sm:w-1/2">
              <input
                type="submit"
                value="Send Message"
                className="w-full px-4 py-2 font-normal bg-gray-300 shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
              />
            </div>
            <div className="sm:ml-2 sm:w-1/2">
              <input
                type="reset"
                value="Reset"
                className="w-full px-4 py-2 font-normal bg-gray-300 shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  menuToggle: PropTypes.func,
  prompt: PropTypes.string,
};

export default ContactForm;
