import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BI Analyst</h4>
                <h5>Success Academy Charter Schools</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Built Power BI dashboards for school budget visibility, cut reporting time 30% by optimizing SQL workflows, and automated finance reports reducing manual labor 40%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Teaching Assistant (ML & Analytics)</h4>
                <h5>Stevens Institute of Technology</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Mentored 100+ students in Python, SQL, Power BI. Ran weekly labs on predictive modeling & EDA, and created demos to explain ML concepts clearly.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BI Analyst Intern</h4>
                <h5>Ashghal Qatar</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built 15+ Power BI dashboards for $500M projects, ran SQL-based cost savings analysis on 3+ years of data, and streamlined ETL pipeline in Python (40% faster).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Analyst</h4>
                <h5>Asheghar Digimentors</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Boosted e-comm revenue $400K through behavioral analytics, built conversion dashboards in Power BI, and led data-driven strategies across departments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;