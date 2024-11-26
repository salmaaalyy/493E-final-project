export default function LoginPage() {
  return (
    <div>
      <section>
        <h1>Login</h1>

        <div>
          <form id="userForm">
            <label htmlFor="userInput">
              <h2>Email:</h2>
            </label>
            <input
              type="text"
              id="userInput"
              name="userInput"
              placeholder=""
              required
            />
          </form>
        </div>

        <div>
          <form id="userForm">
            <label htmlFor="userInput">
              <h2>Password:</h2>
            </label>
            <input
              type="text"
              id="userInput"
              name="userInput"
              placeholder=""
              required
            />
          </form>
        </div>
        <a href="">Forget / Edit Password</a>

        <br />
        <div className="center">
          <button id="login-button">
            <h3>LOG IN</h3>
          </button>
        </div>
      </section>
    </div>
  );
}
