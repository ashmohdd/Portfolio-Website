import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-me">
          <h3 className="title">About Me</h3>
          <div className="about-content">
            <p className="para">
              I build dashboards that make numbers talk (and trust me, they have opinions), automate the boring stuff because life's too short for manual data entry, and turn messy datasets into crystal-clear business insights that don't require a PhD to understand.
            </p>
            <p className="para">
              Whether it's optimizing city projects or figuring out why the coffee machine usage spikes every Tuesday at 2:47 PM, I love connecting data to real-world impact that actually helps people.
            </p>
            <p className="para">
              Outside of work, I'm outdoorsy, endlessly curious, and always learning random new things that allegedly have nothing to do with data (spoiler alert: they somehow always circle back to it – I might start learning pottery and end up analyzing clay moisture content patterns, it's a gift really).
            </p>
            <p className="para highlight">
              Let's make numbers less scary and more powerful, one insight at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;