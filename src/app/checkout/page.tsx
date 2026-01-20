"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronUp, ChevronDown, CreditCard, Plus, Info } from "lucide-react";
import { useTicketingStore, priceMap } from "@/store/useTicketingStore";
import { useTimerStore } from "@/store/useTimerStore";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [insuranceSelected, setInsuranceSelected] = useState<string | null>(null);

  // Get store data
  const { seats, cart, event, clearCart } = useTicketingStore((state) => ({
    seats: state.seats,
    cart: state.cart,
    event: state.event,
    clearCart: state.clearCart
  }));

  // Calculate totals matching the screenshot logic
  // Using mock values where store might be empty
  const quantity = seats.quantity || 1; // Fallback for view
  const ticketPrice = priceMap[seats.tier] || 246.00; // Mock or real
  const serviceFee = 47.36;
  const orderProcessingFee = 2.95;

  const total = (ticketPrice * quantity) + (serviceFee * quantity) + orderProcessingFee;

  const stopTimer = useTimerStore((state) => state.stopTimer);
  const handlePlaceOrder = () => {
    if (!insuranceSelected) {
      alert("Please select a valid option for Ticket Insurance.");
      return;
    }
    if (!termsAccepted) return;
    stopTimer();
    sessionStorage.setItem("training_end_time", Date.now().toString());

    router.push("/checkout/success");
  };

  return (
    <div className="min-h-screen bg-[#f2f2f4] font-sans text-[#1f262d]">
      {/* Header */}
      <header className="bg-[#026cdf] text-white h-[60px] flex items-center px-4 md:px-8 shadow-md">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between">
          <span className="text-2xl font-bold italic tracking-tighter">ticketmaster</span>
          <span className="font-semibold text-sm">Checkout</span>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-4">

          {/* Delivery Section (Completed) */}
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2">
                Delivery
                <div className="bg-green-600 rounded-full p-0.5">
                  <Check className="w-3 h-3 text-white" strokeWidth={4} />
                </div>
              </h2>
            </div>
            <div className="pl-0">
              <p className="font-bold text-sm mb-1">Mobile Entry - Free</p>
              <p className="text-xs text-gray-500 mb-2">Tickets Available by Sun Feb 25, 2024</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                These mobile tickets will be transferred directly to you from a trusted seller. We'll email you instructions on how to accept them on the original ticket provider's mobile app.
              </p>
            </div>
          </div>

          {/* Payment Section (Active) */}
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Payment</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-end leading-none mr-1">
                    <span className="text-[8px] text-gray-500 font-bold tracking-wide uppercase">Official Card of</span>
                    <span className="text-[10px] font-bold italic tracking-tighter text-[#026cdf]">ticketmaster</span>
                  </div>
                  <div className="bg-[#006fcf] text-white text-[8px] font-bold px-1.5 py-1 rounded-[2px] select-none shadow-sm">AMEX</div>
                </div>
                <button className="text-sm font-bold text-[#026cdf] hover:underline ml-2">Change</button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-sm mb-4">Use Credit / Debit Card</h3>

              {/* Add New Card Button */}
              {/* Saved Card Display */}
              <label className="flex items-start gap-3 cursor-pointer mb-3 group">
                <input
                  type="radio"
                  name="paymentMethod"
                  defaultChecked
                  className="mt-1.5 w-4 h-4 text-[#026cdf] border-gray-300 focus:ring-[#026cdf] accent-[#026cdf]"
                />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-7 bg-[#006fcf] rounded-[3px] flex items-center justify-center shrink-0 shadow-sm border border-[#005fb0]">
                    <span className="text-white text-[5px] font-bold tracking-wider leading-none text-center">AMERICAN<br />EXPRESS</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1f262d] leading-none mb-1.5">American Express - 1234</p>
                    <p className="text-xs text-gray-500 font-medium">Jane Adams | Exp. 03/21</p>
                  </div>
                </div>
              </label>

              {/* Security Code Input */}
              <div className="flex items-center gap-3 max-w-[200px] ml-7 pl-4">
                <div className="relative w-full">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Security Code</label>
                  <div className="relative w-24">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="123"
                      className="w-full pl-3 pr-2 py-2 border border-gray-300 rounded-[3px] text-sm focus:ring-1 focus:ring-[#026cdf] focus:border-[#026cdf] outline-none transition-shadow"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-7 h-4 border border-gray-200 rounded-[2px] bg-gray-50 flex items-center justify-center">
                        <span className="text-[6px] text-gray-400 font-bold">CVV</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-900">Or Pay With</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <p className="text-[10px] text-gray-500 mb-4">
              By using a digital wallet and continuing past this page, you have read and are accepting the <span className="text-[#026cdf] hover:underline cursor-pointer">Terms of Use</span>.
            </p>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#ffc439] hover:bg-[#f4bb36] h-10 rounded-[4px] flex items-center justify-center">
                <span className="font-bold italic text-[#003087]">PayPal</span>
              </button>
              <button className="flex-1 bg-[#ffb3c7] hover:bg-[#fceef2] h-10 rounded-[4px] flex items-center justify-center">
                <span className="font-bold text-black">Klarna.</span>
              </button>
              <button className="flex-1 bg-[#3d95ce] hover:bg-[#3587bc] h-10 rounded-[4px] flex items-center justify-center">
                <span className="font-bold italic text-white text-lg">venmo</span>
              </button>
            </div>
          </div>

          {/* Ticket Insurance Section */}
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Ticket Insurance <span className="text-sm font-normal text-[#d10000]">(Selection Required)</span></h2>

            <p className="text-sm font-bold mb-4">
              Get reimbursed up to 100% including taxes, parking, fees or other event-related items in your order with Event Ticket Insurance for only $22.22.
            </p>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              If you can't attend this event for a number of covered reasons like covered illness, airline delays, traffic accidents, weather emergencies, if you are required to work and more, you can be reimbursed for your ticket purchase. You'll also receive access to a 24-hour hotline that can give you driving suggestions, provide parking information, make group arrangements, and much more.
            </p>

            <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
              Recommended/offered/sold by Allianz Global Assistance. Underwriter: Jefferson Insurance Company. Plan incl. insurance & assistance services. Terms & exclusions (incl. for pre-existing conditions) apply. <span className="text-[#026cdf] hover:underline cursor-pointer">Plan & Pricing details</span>, <span className="text-[#026cdf] hover:underline cursor-pointer">disclosures</span>, <span className="text-[#026cdf] hover:underline cursor-pointer">Coverage Alerts</span>. By clicking yes, you authorize Ticketmaster to send your name, address, and credit card information to AGA Service Company, who will charge your card on the terms described above.
            </p>

            <p className="text-xs text-gray-600 mb-6 italic">
              104,161 people protected their tickets in the last 7 days
            </p>

            <div className="space-y-3">
              <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-sm hover:bg-gray-50 border-gray-200 transition-colors ${insuranceSelected === 'yes' ? 'border-[#026cdf] bg-[#f2f7ff]' : ''}`}>
                <input
                  type="radio"
                  name="insurance"
                  checked={insuranceSelected === 'yes'}
                  onChange={() => setInsuranceSelected('yes')}
                  className="mt-0.5 w-5 h-5 text-[#026cdf] border-gray-300 focus:ring-[#026cdf] accent-[#026cdf]"
                />
                <span className="text-sm font-medium">
                  YES, protect my ticket purchase to BTS WORLD TOUR 'ARIRANG' IN TORONTO. (Highly Recommended)
                </span>
              </label>

              <label className={`flex items-start gap-3 cursor-pointer p-3 border rounded-sm hover:bg-gray-50 border-gray-200 transition-colors ${insuranceSelected === 'no' ? 'border-[#026cdf] bg-[#f2f7ff]' : ''}`}>
                <input
                  type="radio"
                  name="insurance"
                  checked={insuranceSelected === 'no'}
                  onChange={() => setInsuranceSelected('no')}
                  className="mt-0.5 w-5 h-5 text-[#026cdf] border-gray-300 focus:ring-[#026cdf] accent-[#026cdf]"
                />
                <span className="text-sm font-medium">
                  No, do not protect my ticket purchase. I understand this may put my CA${total.toFixed(2)} at risk.
                </span>
              </label>
            </div>
          </div>

        </div>


        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="space-y-4">

          {/* Order Summary Card */}
          <div className="bg-white p-5 rounded-sm shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold">Total</h2>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">CA${total.toFixed(2)}</span>
                <ChevronUp className="w-5 h-5 text-[#026cdf]" />
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-dashed border-gray-200">
                <h3 className="font-bold mb-2">Tickets</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Resale Ticket: CA${ticketPrice.toFixed(2)} x {quantity}<Info className="inline w-3 h-3 ml-1 text-gray-400" /></span>
                  <span>CA${(ticketPrice * quantity).toFixed(2)}</span>
                </div>
              </div>

              <div className="pb-4 border-b border-dashed border-gray-200">
                <h3 className="font-bold mb-2">Notes From Seller</h3>
                <p className="text-gray-600 text-xs">Flash</p>
              </div>

              <div className="pb-6">
                <h3 className="font-bold mb-2">Fees</h3>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Service Fee: CA${serviceFee} x {quantity}<Info className="inline w-3 h-3 ml-1 text-gray-400" /></span>
                  <span>CA${(serviceFee * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Order Processing Fee<Info className="inline w-3 h-3 ml-1 text-gray-400" /></span>
                  <span>CA${orderProcessingFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <button className="text-[#026cdf] text-xs font-bold hover:underline" onClick={() => { clearCart(); router.push("/event/123/seats"); }}>
                  Cancel Order
                </button>
              </div>

              <div className="mb-4">
                <p className="font-bold text-xs mb-3">*All Sales Final - No Refunds</p>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#026cdf] focus:ring-[#026cdf]"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="text-xs font-bold text-[#026cdf]">
                    I have read and agree to the current <span className="underline">Terms of Use</span>.
                  </span>
                </label>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!termsAccepted || !insuranceSelected}
                className={`w-full py-3 rounded-[2px] font-bold text-white transition-colors ${termsAccepted && insuranceSelected ? 'bg-[#1f8c2e] hover:bg-[#197524]' : 'bg-[#1f8c2e]/50 cursor-not-allowed'}`}
              >
                Place Order
              </button>
              <p className="text-[10px] text-gray-400 mt-2">*Exceptions may apply, see our Terms of Use.</p>
            </div>
          </div>

          {/* Event Info Card */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-[120px] bg-black relative">
              {/* Placeholder for the user-provided image context logic, hardcoded for now based on request */}
              <img src="/BTS.jpg" className="w-full h-full object-cover opacity-80" alt="Concert" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 leading-tight">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h3>
              <p className="text-xs text-gray-500 mb-3">Thu • Jan 22, 2026 • 7:00 pm</p>
              <p className="text-xs text-gray-500 mb-3">Rogers Centre, Toronto, ON</p>
              <p className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-2">
                1 Ticket - Sec {seats.selectedSeats[0]?.section || "W101"}, Row {seats.selectedSeats[0]?.row || "7"}, Seats {seats.selectedSeats.map(s => s.number).join(", ") || "1"}
              </p>
            </div>
          </div>

        </div>
      </main>
    </div >
  );
}
