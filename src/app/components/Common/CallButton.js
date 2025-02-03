import Link from "next/link";
import React from "react";

const CallButton = () => {
  return (
    <>
      <section className="call-buton">
        <Link className="cc-calto-action-ripple" href="tel:+1 (972) 972 4999">
          <i className="fa fa-phone"></i>
        </Link>
      </section>
    </>
  );
};

export default CallButton;
