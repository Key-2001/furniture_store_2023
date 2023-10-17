import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { SendMailDiscountService } from "../../services/DiscountService";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
const Contact = () => {
  //! Props

  //! State
  const [email, setEmail] = useState("");
  const mutateSendMail = useMutation({
    mutationFn: () => SendMailDiscountService(email),
  });
  //! Function
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await mutateSendMail.mutateAsync();
        const { success, message } = response;
        if (!success) {
          throw new Error(message);
        }
        toast.success(message);
      } catch (error) {
        console.log("error", error);
        toast.error(error.message);
      }
    },
    [email]
  );
  //! Render
  return (
    <section className="contact">
      <div className="section-center">
        <h3>join our newsletter and get 20% off </h3>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            sint unde quaerat ratione soluta veniam provident adipisci cumque
            eveniet tempore?
          </p>
          <form className="contact-form" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              className="form-input"
              value={email}
              placeholder="Enter your email ..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {mutateSendMail?.isLoading ? (
                <PulseLoader size={12} color="#decbc0" />
              ) : (
                "subscribe"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
