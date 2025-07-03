import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="para">
          <p>
            I build dashboards that make numbers talk (and trust me, they have opinions). I automate the boring stuff because life's too short for manual data entry, and turn messy datasets into crystal-clear insights that don't require a PhD to understand.
          </p>
          <p>
            Whether I'm optimizing city projects or investigating why coffee machine usage spikes every Tuesday at 2:47 PM, I love connecting data to real-world impact that actually helps people. Outside of work, I'm that person who somehow finds patterns in everything – hiking trails, pizza topping preferences, the way my neighbors walk their dogs. I can't help it; my brain just sees the world in spreadsheets now.
          </p>
          <p>
            Let's make numbers less scary and more powerful, one insight at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;