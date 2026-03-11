import React from 'react';
import PolicyLayout from '../layouts/PolicyLayout';

export default function ReturnPolicy() {
  return (
    <PolicyLayout
      title="Return Policy"
      subtitle="Read our return and refund policy for your purchases."
      lastUpdated="February 11, 2026"
    >
      <h2>Returns</h2>
      <p>
        All returns must be postmarked within <strong>seven (7) days</strong> of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
      </p>

      <h2>Return Process</h2>
      <p>
        To return an item, please email customer service at <a href="mailto:info@printilofy.com">info@printilofy.com</a> to obtain an Return Merchandise Authorization (RMA) number.
      </p>
      <div className="bg-gray-50 p-8 rounded-sm border border-[#e9e9e9] mt-6 not-prose">
        <p className="font-medium text-gray-500 mb-4 italic">After receiving an RMA number, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:</p>
        <address className="not-italic text-black font-bold leading-relaxed capitalize ">
          Printilofy LLC<br />

          MM, 1614 Gervais St, <br />
          Columbia, SC 29201, USA<br />
          United States
        </address>
        <p className="mt-6 text-[#1447E6] font-extrabold capitalize text-xs tracking-widest">
          Return shipping charges will be paid or reimbursed by us.
        </p>
      </div>

      <h2>Refunds</h2>
      <p>
        After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least <strong>seven (7) days</strong> from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.
      </p>

      <h2>Exceptions</h2>
      <p>
        For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
      </p>

      <hr />
      <h2>Questions</h2>
      <p>If you have any questions concerning our return policy, please contact us at:</p>
      <div className="bg-gray-50 p-8 rounded-sm border border-[#e9e9e9] my-8 not-prose">
        <address className="not-italic text-gray-700 font-bold leading-relaxed space-y-3">
          <p className="flex items-center gap-3 text-[#1447E6] font-extrabold ">info@printilofy.com</p>
          <p className="text-[10px] text-gray-400 font-bold capitalize tracking-[0.2em]">Contact support for immediate assistance</p>
        </address>
      </div>
    </PolicyLayout>
  );
}
