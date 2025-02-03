"use client";
import React from 'react';

const FaqStatic = () => {
	const faqs = [
		{
			no: 1,
			question: "What services does your dental clinic offer?",
			answer: "Our clinic provides a range of services, including <a href='https://smilecloudfamilydental.com/services/general-dentistry' target='_blank'>general dentistry</a >, <a href='https://smilecloudfamilydental.com/services/cosmetic-dentistry' target='_blank'>cosmetic treatments</a >, <a href='https://smilecloudfamilydental.com/services/cosmetic-dentistry' target='_blank'>dental surgeries</a>, and emergency care for all ages."
		},
		{
			no: 2,
			question: "How Do I Get Emergency Dental Care?",
			answer: "Simply call our clinic for immediate assistance, and we’ll prioritize your dental appointment to address urgent concerns."
		},
		{
			no: 3,
			question: "Do you provide dental services for children?",
			answer: "Yes, our family care dental services cater to patients of all ages, including children."
		},
		{
			no: 4,
			question: "Do you accept new patients at your dental clinic?",
			answer: "Absolutely! We welcome new patients and make it easy to schedule your first visit."
		},
		{
			no: 5,
			question: "How Much Does a Dental Checkup & Cleaning Cost in Dallas, TX?",
			answer: "Our affordable pricing ensures high-quality dental care for all. Contact us for specific details about our checkup and cleaning services."
		},
		{
			no: 6,
			question: "Do you offer pain-free dental treatments?",
			answer: "Yes, our experienced dental surgeons use advanced techniques to provide comfortable, pain-free dental treatments."
		},
		{
			no: 7,
			question: "Are dental treatments covered by insurance?",
			answer: "Most dental treatments are covered by insurance. Our brilliant team will assist you with processing your claims to make the experience hassle-free."
		},
		{
			no: 8,
			question: "Do you offer teeth whitening or other cosmetic treatments?",
			answer: "Yes, we provide cosmetic dental treatments, including professional teeth whitening, to give you the perfect smile."
		}
	];
	
	return (
		<section className="section-lgb">
			<div className="container">
				<div className="pbmit-heading-subheading">
					<h4 className="pbmit-subtitle">FAQ</h4>
				</div>
				<div className="accordion" id="accordionExample2">
					{faqs.map((item) => (
						<div key={item.no} className="accordion-item">
							<h2 className="accordion-header" id={`heading${item.no}`}>
								<button 
									className="accordion-button" 
									type="button" 
									data-bs-toggle="collapse" 
									data-bs-target={`#collapse${item.no}`} 
									aria-expanded="false" 
									aria-controls={`collapse${item.no}`}>
									<span className="pbmit-accordion-icon pbmit-accordion-icon-right">
										<span className="pbmit-accordion-icon-closed">
											<i className="fa fa-angle-up"></i>
										</span>
										<span className="pbmit-accordion-icon-opened">
											<i className="fa fa-angle-down"></i>
										</span>
									</span>
									<span className="pbmit-accordion-title" style={{color: '#fff'}}>
										<span className="pbmit-global-color" style={{color: '#fff'}}>{item.no < 10 ? `0${item.no}` : item.no}.</span>
										{item.question}
									</span>
								</button>
							</h2>
							<div 
								id={`collapse${item.no}`} 
								className="accordion-collapse" 
								aria-labelledby={`heading${item.no}`} 
								data-bs-parent="#accordionExample2">
								<div className="accordion-body" dangerouslySetInnerHTML={{ __html: item.answer }} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FaqStatic;
