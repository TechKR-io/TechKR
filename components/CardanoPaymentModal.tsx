"use client";

import { useState } from "react";
import { Loader2, ShieldCheck, Wallet } from "lucide-react";
import toast from "react-hot-toast";

export default function CardanoPaymentModal({
  amount,
  onComplete,
}: {
  amount: number;
  onComplete: (txHash: string) => void;
}) {
  const [step, setStep] = useState<
    "idle" | "connecting" | "signing" | "success"
  >("idle");

  const simulatePayment = async () => {
    setStep("connecting");
    await new Promise((r) => setTimeout(r, 1500)); // Simulate wallet connection

    setStep("signing");
    await new Promise((r) => setTimeout(r, 2000)); // Simulate Aiken script execution

    const mockTxHash =
      "addr_vh" + Math.random().toString(16).slice(2, 10) + "...testnet";
    setStep("success");
    toast.success("Funds locked in Cardano Escrow!");

    setTimeout(() => onComplete(mockTxHash), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
        {step === "idle" && (
          <>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wallet className="text-[#1800AD]" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Secure Escrow Payment</h2>
            <p className="text-gray-500 mb-8">
              You are about to lock{" "}
              <span className="font-bold text-black">{amount} ADA</span> into
              the TechKR Smart Contract.
            </p>
            <button
              onClick={simulatePayment}
              className="w-full py-4 bg-[#1800AD] text-white rounded-xl font-bold hover:bg-blue-800 transition"
            >
              Connect Wallet & Pay
            </button>
          </>
        )}

        {(step === "connecting" || step === "signing") && (
          <div className="py-10">
            <Loader2
              className="animate-spin text-blue-600 mx-auto mb-6"
              size={50}
            />
            <h2 className="text-xl font-bold">
              {step === "connecting"
                ? "Connecting Nami Wallet..."
                : "Executing Aiken Script..."}
            </h2>
            <p className="text-gray-500 mt-2">
              Please do not close this window
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="py-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Secured
            </h2>
            <p className="text-gray-500 mt-2">
              Funds are now locked on the Cardano Blockchain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
