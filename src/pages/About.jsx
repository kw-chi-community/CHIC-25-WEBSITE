import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/About.css";

const About = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <h1>동아리 소개</h1>
        <p>
          CHIC는 인간-컴퓨터 상호작용(HCI) 분야를 중심으로 활동하는 동아리로,
          전공 지식을 실전에 적용하고 인류에게 도움이 되는 소프트웨어를 만드는
          것을 목표로 합니다.
        </p>

        <section className="about-section">
          <h2>CHIC에 대해서</h2>
          <p>
            CHIC는 2021년 8월 광운대학교 소프트웨어중심대학 사업단의 주도로
            Student Technical Group(학생 전공동아리)로 만들어졌습니다. 2022년
            사업이 종료되었으나, 지도교수와 운영진의 열정으로 소모임의 형태를
            계속 유지하고 있습니다.
          </p>
        </section>

        <section className="about-section">
          <h2>이름의 유래</h2>
          <p>
            CHIC는 우아하다는 의미를 담고 있습니다. 인간-컴퓨터 상호작용 분야의
            가장 저명한 학술대회인{" "}
            <strong>
              ACM CHI Conference on Human Factors in Computing Systems
            </strong>
            에서 CHI를 가져왔습니다. 그리고 모두가 함께 하는 커뮤니티의 성격을
            강조하기 위해 <strong>Community</strong>의 C를 결합하였습니다.
          </p>
          <p>
            <strong>발음:</strong> CHI는 "카이"로 발음하기 때문에, "카이
            커뮤니티"로 불러도 되고, "시크" 또는 "쉬크" 동아리로 불러도 됩니다.
          </p>
        </section>

        <section className="about-section">
          <h2>목표 및 지향점</h2>
          <p>
            컴퓨터와 인간의 모든 접점에서, 기획, 설계, 개발을 수행하면서 전공의
            실전적 지식을 함양하고, 나아가 인류에게 도움이 되는 소프트웨어를
            만드는 것이 목표입니다.
          </p>
        </section>

        <section className="about-section">
          <h2>CHIC의 활동</h2>
          <p>
            <strong>스터디:</strong> 전공과 관련한 다양한 분야의 스터디를
            진행합니다. 팀원들과 협력하며 지식을 공유하고 성장할 수 있는 학습
            기회를 얻을 수 있습니다.
          </p>
        </section>

        <img
          src="/assets/about-image.jpg"
          alt="동아리 활동 사진"
          className="about-image"
        />
      </div>
    </>
  );
};

export default About;
