import React, { Component } from 'react';
import { navigate } from 'gatsby';
import Footer from '../components/footer';
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
        <SEO title="Contact" description="I would love to hear from you, so please do get in touch." />
        <section className="max-w-5xl px-4 pt-24 mx-auto mb-24">
          <div className="mb-12 lg:pl-16">
            <h4>Get in touch!</h4>
            <h6>I'll get back to you as soon as I can.</h6>
          </div>
          <div className="divide-x-2 md:flex">
            <div className="md:w-1/2 lg:pl-16 md:pr-6">
              <div className="">
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
                        className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none focus:outline-none"
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
                      className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-custom-turq focus:outline-none focus:border-custom-blue"
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
                      className="w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-custom-turq focus:outline-none contact-field focus:border-custom-blue"
                      onChange={this.handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4" />
                    <div className="mb-4 md:mb-0 md:mr-2 md:w-2/4">
                      <input
                        type="submit"
                        value="Send Message"
                        className="w-full px-4 py-2 font-bold shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
                      />
                    </div>
                    <div className="md:ml-2 md:w-1/4">
                      <input
                        type="reset"
                        value="Reset"
                        className="w-full px-4 py-2 font-bold shadow cursor-pointer hover:opacity-75 focus:outline-none focus:bg-gray-900 focus:text-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-6">
              <hr className="md:hidden" />
              <NewsletterSignup />
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Contact;
