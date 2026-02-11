import { useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredName, setEnteredName] = useState();
  const [enteredMessage, setEnteredMessage] = useState();

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("")
      setEnteredName("")
      setEnteredMessage("")
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let nofitication;

  if (requestStatus === "pending") {
    nofitication = {
      status: "pending",
      title: "Sending message",
      message: "Your message is on it's way.",
    };
  }

  if (requestStatus === "success") {
    nofitication = {
      status: "success",
      title: "Successfully sent",
      message: "Your message was successfully.",
    };
  }

  if (requestStatus === "error") {
    nofitication = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Your Name</label>
            <input
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="email">Your Message</label>
          <textarea
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
            rows="5"
            id="message"
            required
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {nofitication && (
        <Notification
          title={nofitication.title}
          message={nofitication.title}
          status={nofitication.status}
        />
      )}
    </section>
  );
}

export default ContactForm;
