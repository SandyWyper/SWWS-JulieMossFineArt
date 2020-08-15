import React, { Component } from 'react';
import { navigate } from 'gatsby';

import SEO from '../components/seo';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': form.getAttribute('name'), ...this.state }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <SEO title="Contact" description="I would love to hear from you, so please do get in touch." />
        <section className="">
          <div className="">
            <div className="">
              <div className="">
                <h4>Get in touch!</h4>
                <h5>I'll get back to you as soon as I can.</h5>
              </div>
              <div className="">
                <form
                  className="w-full max-w-xl mx-auto"
                  method="post"
                  name="Julie-Moss-Contact"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                  action="/thankyou/"
                >
                  <input type="hidden" name="bot-field" value="Julie-Moss-Contact" />

                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label className="block pr-4 mb-1 md:text-right md:mb-0" htmlFor="name">
                        Name
                      </label>
                    </div>
                    <div className="md:w-3/4">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none focus:outline-none contact-field"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label htmlFor="email" className="block pr-4 mb-1 md:text-right md:mb-0">
                        Email
                      </label>
                    </div>
                    <div className="md:w-3/4">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-custom-turq focus:outline-none contact-field focus:border-custom-blue"
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label className="block pr-4 mb-1 md:text-right md:mb-0" htmlFor="message">
                        Message
                      </label>
                    </div>
                    <div className="md:w-3/4">
                      <textarea
                        name="message"
                        id="message"
                        rows="4"
                        className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-custom-turq focus:outline-none contact-field focus:border-custom-blue"
                        onChange={this.handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4" />
                    <div className="mb-4 md:mb-0 md:mr-2 md:w-2/4">
                      <input
                        type="submit"
                        value="Send Message"
                        className="w-full px-4 py-2 font-bold rounded shadow-lg cursor-pointer text-custom-gray background-primary hover:opacity-75 focus:shadow-outline focus:outline-none"
                      />
                    </div>
                    <div className="md:ml-2 md:w-1/4">
                      <input
                        type="reset"
                        value="Reset"
                        className="w-full px-4 py-2 font-bold rounded shadow-md cursor-pointer text-contrast background-contrast hover:opacity-75 focus:shadow-outline focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Contact;
