import React, { Component } from 'react';
import { navigate } from 'gatsby';
import NewsletterSignup from '../components/newsletterSignup';
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
        <SEO title="Contact" description="I would love to hear from you, so please do get in touch." url={this.props.location.href} />
        <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
          <h1 className="text-center md:mb-12">Contact</h1>
          <div className="md:divide-x-2 md:flex">
            <div className="md:w-1/2 lg:pl-16 md:pr-6">
              <div className="">
                <p>Please don't hesitate to get in touch and I will get back to you as soon as I can.</p>
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

                  <div className="">
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
                      type="text"
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
                        className="w-full px-4 py-2 font-bold bg-gray-300 shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
                      />
                    </div>
                    <div className="sm:ml-2 sm:w-1/2">
                      <input
                        type="reset"
                        value="Reset"
                        className="w-full px-4 py-2 font-bold bg-gray-300 shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-6 md:pr-16">
              <hr className="md:hidden" />
              <NewsletterSignup path={this.props.path} />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Contact;
