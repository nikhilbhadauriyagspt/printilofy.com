import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Read our shipping and delivery options, timeframes, and policies."
      lastUpdated="February 11, 2026"
    >
      <p className="lead">
        This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <Link to="/terms-and-conditions">https://printilofy.com/terms-and-conditions</Link>.
      </p>
      <p>
        Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
      </p>

      <h2>What Are My Shipping Delivery Options?</h2>
      <p>
        We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
      </p>
      <div className="bg-gray-50 p-8 rounded-sm border border-[#e9e9e9] mt-6 not-prose">
        <h4 className="text-lg font-extrabold text-black mb-2 capitalize ">Free Shipping</h4>
        <p className="text-gray-500 font-bold m-0 italic">We offer free Standard shipping on all orders.</p>
      </div>

      <h2>Do You Deliver Internationally?</h2>
      <p>
        We do not offer international shipping.
      </p>

      <h2>What Happens If My Order Is Delayed?</h2>
      <p>
        If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
      </p>

      <h2>Questions About Returns?</h2>
      <p>
        If you have questions about returns, please review our Return Policy: <Link to="/return-policy">https://printilofy.com/return-policy</Link>.
      </p>

      <hr />
      <h2>How Can You Contact Us About This Policy?</h2>
      <p>If you have any further questions or comments, you may contact us by:</p>
      <div className="bg-gray-50 p-8 rounded-sm border border-[#e9e9e9] my-8 not-prose">
        <address className="not-italic text-gray-700 font-bold leading-relaxed space-y-3">
          <p className="flex items-center gap-3 text-[#1447E6] font-extrabold ">Email: info@printilofy.com</p>
          <p className="flex items-center gap-3">
            <span className="text-gray-400 font-bold capitalize text-[10px] tracking-widest">Online contact form:</span>
            <Link to="/contact" className="text-[#1447E6] font-extrabold ml-2 underline">Contact Us</Link>
          </p>
        </address>
      </div>
    </PolicyLayout>
  );
}
