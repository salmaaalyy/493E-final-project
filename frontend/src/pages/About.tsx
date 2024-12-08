import "../styles/common.css";

export default function AboutPage() {
  return (
    <div>
      <div className="mission">
        <h1>Mission</h1>
        <p>
          EasyEats is an accessibility rating system for restaurants, similar to
          the price/dollar sign ratings on platforms like Yelp and Google Maps.
          This system will serve as a valuable reference for people with
          disabilities to find enjoyable dining experiences and encourage
          restaurants to improve their accessibility standards.
        </p>
      </div>
      <div className="team">
        <h1>Team</h1>
        <p>
          University of Washington, Computer Science & Engineering,
          <br />
          Advanced Special Topics: Accessibility
          <br />
          Instructor: Jennifer Mankoff
        </p>
        <div className="team-member">
          <h2>Xinyi Zhao</h2>
          <p>
            Xinyi Zhao is an interaction designer, currently studying Human
            Computer Interaction at the University of Washington.
          </p>
          <a href="https://www.linkedin.com" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h2>Salma Aly</h2>
          <p>Salma is a senior studying Computer Science at the University of Washington. </p>
          <a href="https://www.linkedin.com/in/salmaaly47/" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h2>Tri V Nguyen</h2>
          <p>Tri is a student at the University of Washington.</p>
          <a href="https://www.linkedin.com" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h2>Carla Acosta</h2>
          <p>Carla is a student at the University of Washington.</p>
          <a href="https://www.linkedin.com" className="linkedin-link">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
