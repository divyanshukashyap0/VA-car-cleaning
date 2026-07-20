import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Crown, Clock, Car, Settings, ShieldCheck, Star } from "lucide-react";
import { ActiveSubscription } from "../../services/dbService";
import { motion } from "motion/react";

interface SubscriberDashboardProps {
  subscription: ActiveSubscription;
}

export default function SubscriberDashboard({ subscription }: SubscriberDashboardProps) {
  return (
    <section className="py-24 bg-[#070C16] text-white relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-primary/10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#F4B400]/20 border border-[#F4B400]/50 text-[#F4B400] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(244,180,0,0.3)]">
              <Crown size={14} className="fill-[#F4B400]" />
              VaCar Premium Member
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-white">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              You are currently enjoying our hassle-free monthly detailing subscription. Here are your active plan details.
            </p>
          </div>

          <div className="bg-[#0B1220] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-all duration-700" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* Left Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#F4B400] font-heading font-extrabold text-2xl">
                    {subscription.serviceName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck size={12} /> ACTIVE
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      Valid until {subscription.expiryDate}
                    </span>
                  </div>
                  <div className="mt-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                    <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Plan Benefits Include</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#F4B400] rounded-full"></div> Daily cloth wipe</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#F4B400] rounded-full"></div> 1 full wash per week</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                    <Clock size={18} className="text-primary mb-1" />
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Remaining</span>
                    <span className="text-xl font-heading font-black text-white">{subscription.daysRemaining} Days</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1">
                    <Car size={18} className="text-[#F4B400] mb-1" />
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Vehicle</span>
                    <span className="text-sm font-heading font-black text-white truncate" title={subscription.vehicleDetails}>{subscription.vehicleDetails}</span>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col justify-center space-y-4 md:border-l md:border-white/10 md:pl-8">
                <div className="text-sm text-gray-300 font-semibold mb-2">
                  Need another wash this week? Request a revisit from your crew!
                </div>
                
                <Link to={`/book?service=${subscription.serviceId}&revisit=true`}>
                  <button className="w-full bg-[#F4B400] hover:bg-[#ffe258] text-dark font-heading font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                    <Star size={18} className="fill-dark" />
                    Request Revisit Wash
                  </button>
                </Link>
                
                <p className="text-[10px] text-gray-500 font-bold text-center">
                  Your request will be prioritized for our active subscription members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
