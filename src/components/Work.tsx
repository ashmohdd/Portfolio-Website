import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Customer Churn Prediction",
    category: "Machine Learning",
    description: "Classifies customers likely to leave using ML models",
    tools: "Python, Scikit-learn, Pandas, Matplotlib",
    image: "/images/customer-churn.png",
    link: "https://github.com/ashmohdd/Customer-Churn-Prediction"
  },
  {
    title: "FIFA 20 Player Clustering",
    category: "Data Science",
    description: "Grouped FIFA players using unsupervised learning for team scouting",
    tools: "Python, K-means, Data Visualization",
    image: "/images/img2.png",
    link: "https://github.com/ashmohdd/FIFA-20-Player-Clustering"
  },
  {
    title: "Crowdfunding Success Prediction",
    category: "NLP & ML",
    description: "NLP & logistic regression to predict Kickstarter success",
    tools: "Python, NLP, Logistic Regression, Text Analysis",
    image: "/images/img6.jpg",
    link: "https://github.com/ashmohdd/Crowdfunding-Success-Prediction"
  },
  {
    title: "Spotify 2023 Streaming Analysis",
    category: "Data Analytics",
    description: "Dashboard of danceability, energy & trends in top 2023 hits",
    tools: "Python, Pandas, Plotly, Data Visualization",
    image: "/images/img4.jpg",
    link: "https://github.com/ashmohdd/Analysis-of-the-Top-Spotify-Songs-in-2023-by-Streaming-Numbers"
  },
  {
    title: "Blood Donor Prediction",
    category: "Healthcare ML",
    description: "Healthcare ML model to identify likely blood donors",
    tools: "Python, Machine Learning, Healthcare Analytics",
    image: "/images/img5.jpg",
    link: "https://github.com/ashmohdd/Blood-Donor-Prediction-"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and Technologies</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
                  {project.description}
                </p>
              </div>
              <WorkImage 
                image={project.image} 
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;