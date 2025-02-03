"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ServiceContent = ({ servicesData, clickedService }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const serviceContentRef = useRef(null);
  const router = useRouter();

  // Function to create a slug from a service title
  const createSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();

  useEffect(() => {
    if (servicesData && clickedService == undefined) { setSelectedService({service_name: 'services',
      service_description: 'Smile Cloud Family Dental offers a wide range of services designed to cater to all your dental needs, from routine check-ups to advanced treatments. Their general dentistry services include regular cleanings and check-ups to keep your teeth healthy, with preventive treatments like sealants and fillings to safeguard your smile. If you have damage or decay, their restorative dentistry options, such as crowns, bridges, and dental implants, will restore the strength and function of your teeth. For those looking to enhance their appearance, cosmetic dentistry treatments like teeth whitening, veneers, and Invisalign can give you the smile you have always dreamed of. If dental anxiety is a concern, sedation dentistry ensures you stay comfortable and relaxed throughout your treatment. Smile Cloud is also orthodontic, and they can treat patients of all ages using traditional braces or Invisalign. Pediatric dentistry is offered with an understanding of the special needs of children and to create a positive experience for them as they start to build healthy oral habits. For instances of sudden pain or injury, their emergency dentist service will be there to help them with immediate care. Root canal therapy can even save the severely damaged teeth. Whatever the case may be, Smile Cloud Family Dental has always been ready to give high-quality care with a compassionate approach for patients of all ages.',}) }
    else { setSelectedService(clickedService) }
  }, [servicesData]);

  if (!selectedService) {
    return <div>Loading...</div>;
  }

  // Navigate to the service's slug URL
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setLoading(true);
    setTimeout(() => {
      router.push(`/services/${createSlug(service.service_name)}`);
    }, 1000); 
  };

  const handleAllServicesClick = () => {
    setLoading(true); 
    setTimeout(() => {
      router.push("/services");
    }, 1000); 
  }

  return (
    <>
      {loading && <div className="loader"></div>}
      <div className="page-content">
        {/* Service Details */}
        <section className="site_content service_details" ref={serviceContentRef}>
          <div className="container">
            <div className="row">
              {!servicesData && <aside className="widget widget-all-blogs">
                <button
                  onClick={handleAllServicesClick}
                  className="pbmit-btn">
                  <span className="pbmit-button-content-wrapper">
                    <span className="pbmit-button-text" style={{ fontSize: "x-large" }}>←</span>
                  </span>
                </button>
              </aside>}
              <div className="col-lg-9 service-right-col">
                <div className="pbmit-service-feature-image">
                  {selectedService.service_name !== 'services' && <img
                    src={selectedService.service_image}
                    alt={`${selectedService.service_name} Image`}
                    layout="responsive"
                    width={700}
                    height={475}
                    className="img-fluid w-100"
                  />}
                </div>
                <div className="pbmit-entry-content">
                  <div className="pbmit-service_content">
                    <div className="pbmit-heading animation-style2">
                      <h3 className="pbmit-title mb-3">
                        {selectedService.service_name}
                      </h3>
                    </div>
                    <p
                      className="pbmit-firstletter"
                      dangerouslySetInnerHTML={{
                        __html: selectedService.service_description,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
              {servicesData && <div className="col-lg-3 service-left-col sidebar">
                <aside className="service-sidebar">
                  <aside className="widget post-list">
                    <h2 className="widget-title">Our Service</h2>
                    <div className="all-post-list">
                      <ul>
                        {servicesData?.map((service) => (
                          <li
                            key={service.id}
                            className={
                              selectedService?.id === service.id ? "post-active" : ""
                            }
                            onClick={() => handleServiceSelect(service)}
                          >
                            <a rel="canonical">
                              {service.service_name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </aside>
              </div>}
            </div>
          </div>
        </section>
        {/* Service Details End */}
      </div>
    </>

  );
};

export default ServiceContent;
