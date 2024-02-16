import Wrapper from "../assets/stylingWrappers/Landing";
import Logo from "../components/Logo";

function Landing() {
  return (
    <Wrapper>
      <section className="welcome">
        <h3 className="title">
          <span>Welcome to</span>
          <Logo />
        </h3>
        <p>
          We're delighted to have you here. Feel free to explore our services
          and manage your finances conveniently. If you have any questions or
          need assistance, don't hesitate to reach out to our support team.
          Thank you for choosing us for your banking needs!
        </p>
        <p className="auth-message">Sign in to manage your accounts.</p>
        <p className="auth-message">
          Don't have an account? Register to open one!
        </p>
        <div className="btn-group">
          <button className="btn">register</button>
          <button className="btn">sign in</button>
        </div>
      </section>
    </Wrapper>
  );
}

export default Landing;
