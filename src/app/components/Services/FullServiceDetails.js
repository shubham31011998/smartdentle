"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const FullServiceDetails = ({ servicesData }) => {
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

  // Set the selected service based on query params or default
  useEffect(() => {
      setSelectedService(servicesData);
  }, [servicesData]);

  if (!selectedService) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-content">
      {/* Service Details */}
      <section className="site_content service_details" ref={serviceContentRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 service-right-col">
              <div className="pbmit-service-feature-image">
                <img
                  src={selectedService.service_image}
                  alt={`${selectedService.service_name} Image`}
                  layout="responsive"
                  width={700}
                  height={475}
                  className="img-fluid w-100"
                />
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
          </div>
        </div>
      </section>
      {/* Service Details End */}
    </div>
  );
};

export default FullServiceDetails;
