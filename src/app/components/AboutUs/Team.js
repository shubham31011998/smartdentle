import axios from "axios";
import React from "react";


const Team = async () => {

  try {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) {
      throw new Error("Server URL is not defined");
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    };

    const response = await axios.get(`${url}/smile-dental/image_gallery`, options);

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    var officeImages = response.data;
  } catch (error) {
    console.error(error);
  }
  const officeImagesStatic = [
    { id: 1, image: "/images/about/img/img1.jpg", image_alt_text: "Image 1" },
    { id: 2, image: "/images/about/img/eee.jpg", image_alt_text: "Image 2" },
    { id: 3, image: "/images/about/img/img3.jpg", image_alt_text: "Image 3" },
    { id: 3, image: "/images/about/img/img4.jpg", image_alt_text: "Image 4" },
    { id: 3, image: "/images/about/img/img5.jpg", image_alt_text: "Image 5" },
    { id: 3, image: "/images/about/img/img6.jpg", image_alt_text: "Image 6" },
    { id: 3, image: "/images/about/img/img7.jpg", image_alt_text: "Image 7" },
    { id: 3, image: "/images/about/img/img8.jpg", image_alt_text: "Image 8" },
    // Add more images as needed
  ];

  return (
    <>
      <section className="section-lgx">
        <div className="container">
          <div className="pbmit-heading-subheading text-center">
            <h4 className="pbmit-subtitle">Our Clinic</h4>
            <h2 className="pbmit-title">
              Smilecloud Family Dental Office
            </h2>
          </div>
          <div className="row pbmit-element-posts-wrapper">
            {officeImagesStatic.map((project) => (
              <article key={project.id} className="pbmit-portfolio-style-1 col-md-6">
                <div className="pbminfotech-post-content">
                  <div className="pbmit-featured-img-wrapper">
                    <div className="pbmit-featured-wrapper">
                      <img
                        style={{ width: "600px", height: "400px" }}
                        src={project.image}
                        alt={project.image_alt_text}
                      />
                    </div>
                  </div>

                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
