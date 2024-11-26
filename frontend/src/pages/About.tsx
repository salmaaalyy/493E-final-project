import "../styles/common.css";

export default function AboutPage() {
  return (
    <div>
      <div className="mission">
        <h2>Mission</h2>
        <p>
          EasyEats is an accessibility rating system for restaurants, similar to
          the price/dollar sign ratings on platforms like Yelp and Google Maps.
          This system will serve as a valuable reference for people with
          disabilities to find enjoyable dining experiences and encourage
          restaurants to improve their accessibility standards.
        </p>
      </div>
      <div className="team">
        <h2>Team</h2>
        <p>
          University of Washington, Computer Science & Engineering,
          <br />
          Advanced Special Topics: Accessibility
          <br />
          Instructor: Jennifer Mankoff
        </p>
        <div className="team-member">
          <h3>Xinyi Zhao</h3>
          <p>
            Xinyi Zhao is an interaction designer, currently studying Human
            Computer Interaction at the University of Washington.
          </p>
          <a href="#" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h3>Salma Aly</h3>
          <p>Intro, background</p>
          <a href="#" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h3>Tri V Nguyen</h3>
          <p>Intro, background</p>
          <a href="#" className="linkedin-link">
            LinkedIn
          </a>
        </div>
        <div className="team-member">
          <h3>Carla Acosta</h3>
          <p>Intro, background</p>
          <a href="#" className="linkedin-link">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
